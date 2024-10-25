import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()
const hostname = '127.0.0.1'
const port = 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})