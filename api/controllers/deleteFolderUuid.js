import fs from 'fs'

export const deleteFolderUuid = (req, res) => {
  try {
    const {
      hash
    } = req.params
    const dir = `./my-downloads/${hash}`
    fs.rmdirSync(dir, { recursive: true }, (err) => { console.error(err) })
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
    return null
  }
}
