const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000
const dotenv = require ('dotenv')
const path = require ('path')
dotenv.config()
require('./database/connection')

app.use(cors())
app.use(express.json())
const score = require('./router/score')
app.use('/score', score)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => {
    console.log('App listen on localhost:' + port)
})