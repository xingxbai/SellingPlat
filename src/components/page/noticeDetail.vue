<!--
 * @Author: your name
 * @Date: 2020-02-18 20:02:47
 * @LastEditTime: 2020-04-18 20:36:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\components\page\VueEditor.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>{{content.title}}</h1>
            <div v-html="content.content">
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../utils/request'
    export default {
        name: 'editor',
        data: function(){
            return {
                content: {},
                id: 0,
            }
        },
        mounted () {
            this.id = this.$route.params.id
            this.getData()
        },
        methods: {
            getData () {
                axios({
                    url: `/api/notice/detail/${this.id}`
                })
                .then(res => {
                    if (res.code !== 0) {
                        this.$message.error(res.message)
                        return
                    }
                    this.content = res.data
                })
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>