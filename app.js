/*
 * @Author: your name
 * @Date: 2020-04-22 18:25:42
 * @LastEditTime: 2020-04-22 18:25:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\app.js
 */

const express = require('express')
var bodyparser = require('body-parser');
const axios = require('axios')
const app = express()
const path = require('path')

//app.use(express.static('dist'))
//linux和windows差异
app.use(express.static(__dirname + '/dist'));
app.use(bodyparser.urlencoded({extende:true}));
app.use(bodyparser.json())
let url = 'http://47.93.117.14:8080/second-hand'
app.post('/login',(req, response)=>{
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
        response.send( JSON.stringify(res.data) )
    })
})
app.listen(3000)
