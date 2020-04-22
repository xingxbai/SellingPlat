<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item >
                                    <div v-html="props.row.content">{{ props.row.content }}</div>
                                </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.username}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.email}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.mobile}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.row)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div> -->
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item >
                                        <div v-html="props.row.content">{{ props.row.content }}</div>
                                    </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                           <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.username}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.email}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.mobile}}</span>
                            </template>
                        </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <!-- <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div> -->
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`已处理(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item >
                                        <div v-html="props.row.content">{{ props.row.content }}</div>
                                    </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                           <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.username}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.email}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.mobile}}</span>
                            </template>
                        </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.row)" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <div class="handle-row">
                            <el-button type="danger">清空已处理</el-button>
                        </div> -->
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import axios from '../../utils/request'
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [],
                read: [],
                recycle: []
            }
        },
        mounted() {
            this.getRead()
            this.getUnRead()
            this.getRecycle()
        },
        methods: {
            getRead() {
                axios({
                    url: '/api/feedback/list/read?pageIndex=1&pageSize=9999'
                }).then(res => {
                    this.read = res.data.list
                })
            },
            getUnRead() {
                axios({
                    url: '/api/feedback/list/untreated?pageIndex=1&pageSize=9999'
                }).then(res => {
                    this.unread = res.data.list
                })
            },
            getRecycle() {
                axios({
                    url: '/api/feedback/list/deal?pageIndex=1&pageSize=99999'
                }).then(res => {
                    this.recycle = res.data.list
                })
            },
            handleRead(value) {
                const body = {
                    ids: [value.feedbackId]
                }
                axios.post('/api/feedback/update/status', body)
                .then( res => {
                    if (res.code !== 0 )  {
                        this.$message.error(res.message)
                        return
                    }
                    this.getUnRead()
                    this.getRead()
                })
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(value) {
                const body = {
                    ids: [value.feedbackId]
                }
                axios.post('/api/feedback/del', body)
                .then( res => {
                    if (res.code !== 0 )  {
                        this.$message.error(res.message)
                        return
                    }
                    this.getRecycle()
                })
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

