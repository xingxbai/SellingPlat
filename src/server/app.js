const express = require('express')
const data = require('../../public/table.json')
const app = express()
let result = [
    {
        id: 1,
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477189&di=e41ca517ca77ad192c6a13c48da0f720&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201606%2F07%2F20160607210213_JXQRN.jpeg',
        desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
        price: 99,
        addr:'中山',
        time:'2020-2-20'
    },
    {
        id:2,
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477189&di=53c877d6ca7b24501d23661c44b5c248&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201110%2F26%2F20111026224810_i3XJ3.jpg',
        desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
        price: 99,
        addr:'中山',
        time:'2020-2-20'
    },
    {
        id:3,
        url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477188&di=ac87a07916aa78287363e1c8edae0628&imgtype=0&src=http%3A%2F%2Fm.tuniucdn.com%2Ffb2%2Ft1%2FG1%2FM00%2FDC%2F55%2FCii9EFdEEdyIKnfwAAJG8L5TsBcAAGJtQPKkRYAAkcI758_w500_h280_c1_t0.jpg',
        desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
        price: 99,
        addr:'中山',
        time:'2020-2-20'
    },
    {
        id:4,
        url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582216477188&di=8a83ff416a5985ccfe08ac6f30282cb5&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0330%2Fbeef5fd2bea34858998d45248e18d2a2.jpg',
        desc:'小番茄定制2017新款显瘦竖条纹半生裙高腰纽扣开叉雪纺中长款半裙',
        price: 99,
        addr:'中山',
        time:'2020-2-20'
    }
]
app.get('/',(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(result)
})
app.get('/good', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(result[req.query.id-1])
})
app.get('/table', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data)
})
app.listen(3100,() => {
    console.log('listen 3100 port')
})