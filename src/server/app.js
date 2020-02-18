const express = require('express')
const data = require('../../public/table.json')
const app = express()

app.get('/',(req, res) => {
    let result = [
        {
            id: 1,
            url: 'https://i.epochtimes.com/assets/uploads/2018/08/20180801_Gaspe_lighthouse2-600x400.jpg'
        },
        {
            id:2,
            url: 'https://i.epochtimes.com/assets/uploads/2018/08/20180801_Gaspe_lighthouse3-450x600.jpg'
        },
        {
            id:3,
            url:'https://i.epochtimes.com/assets/uploads/2018/08/20180801_Gaspe_lighthouse3-450x600.jpg'
        },
        {
            id:4,
            url:'https://i.epochtimes.com/assets/uploads/2018/08/20180801_Gaspe_lighthouse2-600x400.jpg'
        }
    ]
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(result)
})
app.get('/table', (req, res) => {
    console.log(data)
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data)
})
app.listen(3100,() => {
    console.log('listen 3100 port')
})