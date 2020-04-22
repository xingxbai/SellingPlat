<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> schart图表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="padding: 0">
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
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import axios from '../../utils/request'
export default {
    name: 'basecharts',
    components: {
        Schart
    },
    data() {
        return {
            options1: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                bgColor: '#fbfbfb',
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                bgColor: '#fbfbfb',
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
                        data: [114, 138, 200, 235, 190]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '服装品类销售饼状图'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['T恤', '牛仔裤', '连衣裙', '毛衣', '七分裤', '短裙', '羽绒服'],
                datasets: [
                    {
                        data: [334, 278, 190, 235, 260, 200, 141]
                    }
                ]
            },
            options4: {
                type: 'ring',
                title: {
                    text: '环形三等分'
                },
                showValue: false,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['vue', 'react', 'angular'],
                datasets: [
                    {
                        data: [500, 500, 500]
                    }
                ]
            },
            options: {
                type: 'bar',
                title: {
                    text: '各品类销售图'
                },
                xRorate: 25,
                labels: [''],
                datasets: []
            },
            dateBar:['2020-04-13 12:05:38','2020-04-20 12:05:38'],
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
            }
        };
    },
    mounted () {
        this.getData()
    },
    methods: {
        dateBarChange () {
            this.getData()
        },
        getData() {
            const body = {
                startTime: this.dateBar[0],
                endTime: this.dateBar[1]
            }
            axios.post('/api/data/productTag',body)
            .then(res => {
                if(res.code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                const options = {
                    type: 'bar',
                    title: {
                        text: '各品类销售图'
                    },
                    xRorate: 25,
                    labels: [''],
                    datasets: []
                }
                this.$nextTick(() => {
                    if (res.data.length === 0) {
                        const mock = [ {label: "农用/园艺", data: [0]},
                            {label: "电子/网络", data: [0]},
                            {label: "五金工具", data: [0]},
                            {label: "生鲜水果", data: [0]},
                            {label: "宠物/用品", data: [0]},
                            {label: "动漫/周边", data: [0]},
                            {label: "技能服务", data: [0]},
                            {label: "服饰/鞋包", data: [0]},
                            {label: "其他闲置", data: [0],fillColor : "rgba(255, 235, 60, 1)"},
                            {label: "珠宝/饰品", data: [0],fillColor: "rgba(241, 49, 74, 0.5)"}
                        ]
                        options.datasets = mock
                        this.options = options
                        return
                    }
                    options.datasets = res.data
                    options.datasets.forEach((item,index) => {
                        item.data = [item.total]
                        if(index === 9) {
                            item.fillColor = "rgba(241, 49, 74, 0.5)"
                        }
                        if(index === 8) {
                            item.fillColor = "rgba(255, 235, 60, 1)"
                        }
                    })
                    this.options = options
                });
                
            })
        }
    }
};
</script>

<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 100%;
    height: 75vh;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>