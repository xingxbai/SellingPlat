<!--
 * @Author: your name
 * @Date: 2020-02-18 20:02:47
 * @LastEditTime: 2020-05-10 15:54:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\components\page\I18n.vue
 -->
<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-global"></i> {{$t('i18n.breadcrumb')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-input v-model="inputValue"></el-input>
                <el-button @click="handle">点击</el-button>
                <li v-for="item in arr">{{item}}</li>
            </div>
            <span>{{$t('i18n.tips')}}</span>
            <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'zh'?'en':'zh';">{{$t('i18n.btn')}}</el-button>
            <div class="list">
            <h2>{{$t('i18n.title1')}}</h2>
                <p>{{$t('i18n.p1')}}</p>
                <p>{{$t('i18n.p2')}}</p>
                <p>{{$t('i18n.p3')}}</p>
            </div>
            <h2>{{$t('i18n.title2')}}</h2>
            <div>
                <i18n path="i18n.info" tag="p">
                    <a place="action" href="https://element.eleme.cn/2.0/#/zh-CN/component/i18n">{{ $t('i18n.value') }}</a>
                </i18n>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            inputValue:"",
            deep: {
                name: 'xb',
                age: 18,
                child: [{
                    name: 'x1',
                    age: 10
                },{
                    name: 'x2',
                    age:2
                }],
                add:{
                    province: {
                        a: '12'
                    }
                }
            },
            arr: [1,2,3,4,5]
        }
    },
    watch: {
        inputValue (value, previousValue) {
            console.log(value, previousValue)
        },
        // deep:{
        //     handler (newV, pre) {
        //         console.log(newV, pre)
        //     },
        //     deep: true
        // },
        deep (value, previousValue) {
            console.log(value, previousValue)
        },
        arr (value, previousValue) {
            console.log(value, previousValue)
        },
        // arr:{
        //     handler (newV, pre) {
        //         console.log(newV, pre)
        //     },
        //     deep: true
        // },
    },
    methods: {
        handle () {
            this.deep = 333
            //this.$set(this.arr, 0, 3)
            //this.$delete(this.deep,'age')
            //this.arr[0]  = 3
        }
    }
}
</script>

<style scoped>
.list{
    padding: 30px 0;
}
.list p{
    margin-bottom: 20px;
}
a{
    color: #409eff;
}
</style>
