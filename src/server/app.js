/*
 * @Author: your name
 * @Date: 2020-02-18 20:02:47
 * @LastEditTime: 2020-03-07 18:46:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\server\app.js
 */
const express = require('express')
var bodyParser = require('body-parser');
const data = require('../../public/table.json')
const app = express()
app.use(bodyParser.json());
const axios = require('axios')
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
app.get('/good', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(result)
})
app.get('/table', (req, res) => {
    console.log(req)
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data)
})

app.post('/login', (req, res) => {
    console.log(999)
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Content-Type", "application/json")
    res.json(data)
})

app.get('/limit', (req, res) => {
    //let role = req.query.id
    let result = [
        {
            icon: 'el-icon-lx-home',
            index: 'dashboard',
            title: '系统首页'
        },
        {
            icon: 'el-icon-lx-cascades',
            index: 'table',
            title: '基础表格'
        },
        {
            icon: 'el-icon-lx-copy',
            index: 'tabs',
            title: 'tab选项卡'
        },
        {
            icon: 'el-icon-lx-calendar',
            index: '3',
            title: '表单相关',
            subs: [
                {
                    index: 'form',
                    title: '基本表单'
                },
                {
                    index: '3-2',
                    title: '三级菜单',
                    subs: [
                        {
                            index: 'editor',
                            title: '富文本编辑器'
                        },
                        {
                            index: 'markdown',
                            title: 'markdown编辑器'
                        }
                    ]
                },
                {
                    index: 'upload',
                    title: '文件上传'
                }
            ]
        },
        // {
        //     icon: 'el-icon-lx-emoji',
        //     index: 'icon',
        //     title: '自定义图标'
        // },
        {
            icon: 'el-icon-pie-chart',
            index: 'charts',
            title: 'schart图表'
        },
        // {
        //     icon: 'el-icon-rank',
        //     index: '6',
        //     title: '拖拽组件',
        //     subs: [
        //         {
        //             index: 'drag',
        //             title: '拖拽列表'
        //         },
        //         {
        //             index: 'dialog',
        //             title: '拖拽弹框'
        //         }
        //     ]
        // },
        {
            icon: 'el-icon-lx-global',
            index: 'i18n',
            title: '国际化功能'
        },
        {
            icon: 'el-icon-lx-warn',
            index: '7',
            title: '错误处理',
            subs: [
                {
                    index: 'permission',
                    title: '权限测试'
                },
                {
                    index: '404',
                    title: '404页面'
                }
            ]
        },
        {
            icon: 'el-icon-lx-global',
            index: 'i1s8n',
            title: '我是系统管理员才可见'
        },{
            icon: 'el-icon-lx-global',
            index: 'i18dn',
            title: '我是商铺管理员'
        },{
            icon: 'el-icon-lx-global',
            index: 'i18dssn',
            title: '我是商品管理员',
            subs: [
                {
                    index: 'permission',
                    title: '商品管理员A'
                },
                {
                    index: '404',
                    title: '商品管理员B'
                }
            ]
        },
    ]
    res.header("Access-Control-Allow-Origin", "*");
    res.json(result)
})
app.listen(3100,() => {
    console.log('listen 3100 port')
})