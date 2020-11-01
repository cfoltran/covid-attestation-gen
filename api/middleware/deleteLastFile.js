import fs from 'fs'

export const deleteLastFile = (req, res, next) => {
  const { hash } = req.body
  const dir = `./my-downloads/${hash}`
  fs.mkdirSync(dir, { recursive: true })
  const fileNames = fs.readdirSync(dir)
  fileNames.map((item) => {
    fs.unlinkSync(`${dir}/${item}`)
  })
  next()
}
