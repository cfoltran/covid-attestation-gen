import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { certificate } from './controllers/certificate'
import { deleteFolderUuid } from './controllers/deleteFolderUuid'
import { deleteLastFile } from './middleware/deleteLastFile'

// Create express instance
const app = express()

// Require API routes
app.use(bodyParser.json({ limit: '10mb', extended: false }))
app.use(cors())
app.use(helmet())

// Import API Routes
// app.use(apiRouter)

// Export express app
module.exports = app

app.delete('/deleteFolderUuid/:hash', (req, res) => deleteFolderUuid(req, res))
app.post('/certificate', (deleteLastFile), async (req, res) => await certificate(req, res))

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
