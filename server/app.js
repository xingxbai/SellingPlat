/*
 * @Author: your name
 * @Date: 2020-04-22 12:49:01
 * @LastEditTime: 2020-04-22 18:01:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edits
 * @FilePath: \SellingPlat\server\app.js
 */
const express = require('express')
var bodyparser = require('body-parser');
const axios = require('axios')
const app = express()

app.use(express.static('dist'))
app.use(express.static(__dirname + '/dist'));
app.use(bodyparser.urlencoded({extende:true}));
app.use(bodyparser.json())
let url = 'http://47.93.117.14:8080/second-hand'
app.post('/login',(req, res)=>{
    console.log('/second-hand' + req.url)
    const params = {
        username:'admin',
        password: 'admin'
    }
    axios({
        url: url + req.url,
        method: 'post',
        data: {...params},
        headers: {'Content-Type': 'application/json'}
    }).then(res=>{
        console.log(res)
    })
})
app.listen(3000)