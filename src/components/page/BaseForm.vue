<!--
 * @Author: your name
 * @Date: 2020-02-18 20:02:47
 * @LastEditTime: 2020-04-20 13:42:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\components\page\BaseForm.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>通知公告
                </el-breadcrumb-item>
                <el-breadcrumb-item>公告列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="padding-left:10px">
                <el-input v-model="pagination.keyWord" placeholder="请输入" style="width:256px;margin-right:20px"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
            </div>
            <el-table :show-header="false" :data="list" style="width:100%;margin-top:25px">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item >
                            <div v-html="props.row.content">{{ props.row.content }}</div>
                        </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column width="40">
                    <template slot-scope="scope">
                        {{scope.row.noticeId}}
                    </template>
                </el-table-column>
                <el-table-column >
                    <template slot-scope="scope" width="50%">
                        <div
                            class="todo-item"
                            :class="{'todo-item-del': scope.row.noticeId}"
                            @click="goNoticeDetail(scope.row.noticeId)"
                        >{{scope.row.title}}</div>
                    </template>
                </el-table-column>
                <el-table-column  width="300">
                    <template slot-scope="scope">
                        <div
                            class="todo-item"
                            :class="{'todo-item-del': scope.row.creatTime}"
                        >{{scope.row.creatTime}}</div>
                    </template>
                </el-table-column>
                    </el-table>
                    <div style="margin-top:40px">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pagination.pageIndex"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pagination.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                    </div>
                   
        </div>
    </div>
</template>

<script>
import axios from '../../utils/request'
export default {
    name: 'baseform',
    data() {
        return {
            list: [],
            total: 10,
            pageIndex: 1,
            pagination: {
                pageIndex: 1,
                pageSize: 10,
                keyWord: ''
            },
        };
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
            const params = this.pagination
            axios({
                url: '/api/notice/list',
                params
            }).then( res => {
                if (res.code !== 0) {
                    this.$message.error( res.message)
                    return 
                }
                this.list = res.data.list
                this.total = res.data.total
            })
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
        goNoticeDetail (value) {
            // this.$router.push({
            //     name: 'detail',
            //     params: {
            //         id: value
            //     }
            // })
        },
        handleCurrentChange (value) {
            this.pagination.pageIndex = value
            this.getList()
        },
        handleSizeChange (value) {
            this.pagination.pageSize = value
            this.getList()
        }
    }
};
</script>