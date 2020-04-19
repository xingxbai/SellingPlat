<!--
 * @Author: your name
 * @Date: 2020-02-18 20:02:47
 * @LastEditTime: 2020-04-18 22:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\components\page\Markdown.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 通知公告</el-breadcrumb-item>
                <el-breadcrumb-item>公告编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips"></div>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from '../../utils/request'
    export default {
        name: 'markdown',
        data: function(){
            return {
                content:'',
                html:'',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                console.log(pos)
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                axios({
                    url: '/fileSystem/upLoadImage',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    if (url.code !== 0) {
                        this.$message.error(url.message)
                        return 
                    }
                    url = url.data[0]
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                if (this.html.length >= 15000) {
                    this.$message.error('输入长度过大，< 150000')
                    return
                }
                this.$prompt('请输入公告标题', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    if ( !value ) {
                        this.$message.error('请输入公告标题')
                        return
                    }
                    const body = {
                        title: value,
                        content: this.html
                    }
                    axios.post('/api/notice/add', body)
                    .then(res => {
                        if (res.code !== 0) {
                            this.$message.error(res.message)
                        }
                    })
                    this.$router.push({
                        path:'/form'
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
                });
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>