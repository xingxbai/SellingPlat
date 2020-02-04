const express = require('express')
const data = require('../../public/table.json')
const app = express()

app.get('/',(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('hello wolrd')
})
app.get('/table', (req, res) => {
    console.log(data)
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data)
})
app.listen(3000,() => {
    console.log('listen 3000 port')
})