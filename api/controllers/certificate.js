import fs from 'fs'
import puppeteer from 'puppeteer'

export const certificate = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      birthdate,
      birthplace,
      address,
      city,
      zipcode,
      hour,
      reason,
      hash
    } = req.body
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--lang=fr-FR,fr']
    })
    const dir = `./my-downloads/${hash}`
    const page = await browser.newPage()

    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://media.interieur.gouv.fr/deplacement-covid-19')
    await page.type('#field-firstname', `${firstname}`)
    await page.type('#field-lastname', `${lastname}`)
    await page.type('#field-birthday-label', `${birthdate}`)
    await page.type('#field-placeofbirth', `${birthplace}`)
    await page.type('#field-address-label', `${address}`)
    await page.type('#field-city-label', `${city}`)
    await page.type('#field-zipcode-label', `${zipcode}`)
    await page.type('#field-heuresortie', `${hour}`)
    await page.click(`input[value=${reason}]`)
    await page.click('button[id=generate-btn]')
    await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: dir })
    await page.waitForFunction('document.querySelectorAll("a").length > 8')
    const pdfLink = await page.evaluate(() => {
      const links = document.querySelectorAll('a')
      return links[8].href
    })
    await page.waitFor(1000)
    const fileNames = fs.readdirSync(dir)
    const fileData = fs.readFileSync(`${dir}/${fileNames[0]}`, 'base64')
    res.status(200).json({ link: pdfLink, fileData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
    return null
  }
}
