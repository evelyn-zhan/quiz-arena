import express from 'express'
import mysql2 from 'mysql2'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()
const hostname = '127.0.0.1'
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static('public'))

const db = mysql2.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '',
    database: 'quiz_arena'
})

db.connect((err) => {
    if(err) {
        console.log('Database is not connected')
        console.log(err)
    } else {
        console.log('Database is connected')
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/categories', (req, res) => {
    let sql = "SELECT * FROM category ORDER BY id DESC;";
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.get('/quiz', (req, res) => {
    res.sendFile(__dirname + '/public/quiz.html')
})

app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/public/result.html')
})

app.get('/my-stats', (req, res) => {
    res.sendFile(__dirname + '/public/stats.html')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})