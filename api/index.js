import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import puppeteer from 'puppeteer'

// uncomment for route
// import { apiRouter } from './routes/index'

// Create express instance
const app = express()

// Require API routes
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(cors())
app.use(helmet())

// Import API Routes
// app.use(apiRouter)

// Export express app
module.exports = app

app.post('/certificate', async (req, res) => await certificate(req, res))

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

const certificate = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://media.interieur.gouv.fr/deplacement-covid-19')
    await page.type('#field-firstname', `${req.body.firstname}`)
    await page.type('#field-lastname', `${req.body.lastname}`)
    await page.type('#field-birthday-label', `${req.body.birthdate}`)
    await page.type('#field-placeofbirth', `${req.body.birthplace}`)
    await page.type('#field-address-label', `${req.body.address}`)
    await page.type('#field-city-label', `${req.body.city}`)
    await page.type('#field-zipcode-label', `${req.body.zipcode}`)
    await page.type('#field-heuresortie', `${req.body.hour}`)
    await page.click(`input[value=${req.body.reason}]`)
    await page.click('button[id=generate-btn]')
    await page.waitForFunction('document.querySelectorAll("a").length > 8')
    const pdfLink = await page.evaluate(() => {
      const links = document.querySelectorAll('a')
      return links[8].href.split('blob:')[1]
    })
    res.status(200).json({ link: pdfLink })
  } catch (error) {
    res.status(200).json({ error })
    return null
  }
}
