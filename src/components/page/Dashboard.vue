<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{userInfo.userName}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{userInfo.editTime}}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>中山</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:462px;">
                    <div slot="header" class="clearfix">
                        <span>商品详情</span>
                    </div>
                    <!-- <template v-for="(item,index) in goodsDetail">
                        {{item.label}}<el-progress :percentage="item.total" :color="colorFiltersss(index)"></el-progress>
                    </template> -->
                    <template v-for="(item,index) in goodsDetail">
                        {{item.label}}<el-progress :percentage="item.total" :color="colorFiltersss(index)"></el-progress>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{this.site.viewNum}}</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{this.site.noticeNum}}</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{this.site.productNum}}</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="min-height:613px;">
                    <div slot="header" class="clearfix">
                        <span>用户反馈</span>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status === 1}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template  slot-scope="scope">
                                <i class="el-icon-edit" style="margin-right:10px" @click="editEvent(scope.row)"></i>
                                <!-- <i class="el-icon-delete" @click="deleteEvent(scope.row)"></i> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        small
                        style="margin-top:20px"
                        @current-change="currentPage"
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </el-card>
            </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <el-date-picker
                        v-model="dateBar"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        @change="dateBarChange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col> -->
            <!-- <el-col :span="24">
                <el-card shadow="hover">
                    <el-date-picker
                        v-model="dateLine"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        @change="dateLineChange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col> -->
        </el-row>
        <el-dialog
            title="用户反馈"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{currentValue.title}}</span>
            <div>{{currentValue.content}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">待办</el-button>
                <el-button type="primary" @click="submitEvent">处理</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import axios from '../../utils/request'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            dialogVisible: false,
            dateBar: [],
            dateLine: [],
            currentValue: {
                title:'',
                status: false
            },
            todoList: [],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '各品类销售图'
                },
                xRorate: 25,
                labels: [''],
                datasets: [
                    {
                        label: '家电',
                        data: [234]
                    },
                    {
                        label: '百货',
                        data: [164]
                    },
                    {
                        label: '食品',
                        data: [144]
                    },{
                        label: '家电',
                        data: [234]
                    },
                    {
                        label: '百货',
                        data: [164]
                    },
                    {
                        label: '食品',
                        data: [144]
                    },{
                        label: '家电',
                        data: [234]
                    },
                    {
                        label: '百货',
                        data: [164]
                    },
                    {
                        label: '食品',
                        data: [144],
                        fillColor: 'rgba(241, 49, 74, 0.9)',
                    },{
                        label: '家电',
                        fillColor: 'rgba(215, 49, 74, 0.5)',
                        data: [234]
                    },
                    {
                        label: '百货',
                        data: [164]
                    },
                    {
                        label: '食品',
                        data: [144]
                    },{
                        label: '家电',
                        data: [234]
                    },
                    {
                        label: '百货',
                        data: [164]
                    },
                    {
                        label: '食品',
                        data: [144]
                    },{
                        label: '家电',
                        data: [234]
                    },
                    {
                        label: '百货',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [164]
                    },
                    {
                        label: '食品',
                        data: [144]
                    },
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            site: {
                viewNum: 0,
                noticeNum: 0,
                productNum: 0
            },
            userInfo: {
                userName: "admin",
                editTime: "2020-04-19 22:32:56",
                icon: "http://47.93.117.14:8080/second-hand/fileSystem/files/images.jpg",
            },
            pagination: {
                pageIndex: 1,
                pageSize: 12
            },
            total: 0,
            goodsDetail:[],
            colorFilter: ['#42b983','#f1e05a','#f56c6c','#52c3dd','#42b983','#f1e05a','#e6a23c','#52c3dd']
        };
    },
    components: {
        Schart
    },
    computed: {
        ...mapState({
            user: 'user',
            goods: 'goods'
        }),
        role() {
            return this.userInfo.userName === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
        this.getSite()
        this.getUserInfo()
        this.getTodoList()
        this.getGoodsDetail()
    },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        ...mapMutations({
            setUsername: 'user/setUsername',
        }),
        colorFiltersss(index){
            console.log(this.colorFilter[index])
            return this.colorFilter[index]
        },
        getSite () {
            axios({
                url: '/api/data/site'
            }).then(res => {
                if(res.code !== 0 ) {
                    this.$message.error(res.message)
                    return
                }
                this.site = res.data
            })
        },
        getUserInfo () {
            axios({
                url: '/api/sysHome/get/userInfo'
            }).then(res => {
                if(res.code !== 0 ) {
                    this.$message.error(res.message)
                    return
                }
                this.userInfo = res.data
            })
        },
        getTodoList () {
            const params = this.pagination
            axios({
                url: '/api/sysHome/list',
                params
            }).then(res => {
                if(res.code !== 0 ) {
                    this.$message.error(res.message)
                    return
                }
                this.todoList = res.data.list
                this.total = res.data.total
            })
        },
        getGoodsDetail() {
            axios({
                url: '/api/data/productDetail'
            }).then(res => {
                if(res.code !== 0 ) {
                    this.$message.error(res.message)
                    return
                }
                this.goodsDetail = res.data
                this.goodsDetail.map( item=> {
                    item.total = item.total*100
                })
            })
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        editEvent(value) {
            this.currentValue = value
            this.dialogVisible = true
        },
        deleteEvent(value) {
            this.currentValue = value
        },
        handleClose() {
            this.dialogVisible = false
        },
        submitEvent() {
            const body = {
                ids: [this.currentValue.feedbackId]
            }
            axios.post('/api/sysHome/update/status',body).then(res=> {
                if(res.code !== 0) return
                this.dialogVisible = false
                this.getTodoList()
            })
        },
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
        handleClick () {
            console.log(this.user.username)
            console.log(this.goods) 
            this.setUsername('998')
        },
        currentPage (value) {
            this.pagination.pageIndex = value
            this.getTodoList()
        },
        dateBarChange () {
            console.log(this.dateBar)
            const response = {
                labels: this.options.labels,
                list: this.options.datasets
            }
            console.log(response)
        },
        dateLineChange () {
            
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 600px;
}
</style>
