/*
 * @Author: your name
 * @Date: 2020-04-22 18:25:42
 * @LastEditTime: 2020-04-22 19:07:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\app.js
 */

const express = require('express')
var bodyparser = require('body-parser');
const axios = require('axios')
const app = express()
const path = require('path')
const config = require('./app.config.js')
console.log(config)
//app.use(express.static('dist'))
//linux和windows差异
app.use(express.static(__dirname + '/dist'));
app.use(bodyparser.urlencoded({extende:true}));
app.use(bodyparser.json())
app.post('/login',(req, response)=>{
    
    const params = {
        ...req.body
    }
    axios({
        url: config.baseUrl + req.url,
        method: 'post',
        data: {...params},
        headers: {'Content-Type': 'application/json'}
    }).then(res=>{
        response.send( JSON.stringify(res.data) )
    })
})
app.listen(3000)
