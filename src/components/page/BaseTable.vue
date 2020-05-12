<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 添加用户
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.key" placeholder="" class="handle-select mr10">
                    <el-option v-for="(item,index) in selectOptions" :key="index" :label="item.label" :value="item.value" ></el-option>
                </el-select>
                <el-input v-model="query.value" placeholder="请输入查询条件" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addUser" style="float:right" >添加用户</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column label="ID" align="center" width="95px" prop="userId"></el-table-column>
                <el-table-column v-for="(item,index) in tableTitleData"
                                :key="index"
                                :prop="item.prop"
                                :label="item.label"
                ></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row, scope.$index)"  size="small" style="margin-right:20px">编辑</el-button>
                        <el-button  size="small" @click="handleDelete(scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    :current-page="query.pageIndex"
                    @size-change="handleSizeChange"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 50, 100]"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑用户" :visible.sync="editVisible">
            <el-form  label-width="70px">
                <el-form-item label="用户昵称">
                    <el-input v-model="editValue.nickName"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="editValue.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="editValue.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加用户" :visible.sync="addUserVisible">
            <el-form  label-width="70px">
                <el-form-item label="用户昵称">
                    <el-input v-model="addUserValue.nickName"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="addUserValue.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="addUserValue.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from '../../utils/request'
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                key: 'all',
                value: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableTitleData: [{
                    prop: 'nickName',
                    label: '用户昵称',
                },{
                    prop: 'username',
                    label: '用户名',
                },{
                    prop: 'password',
                    label: '密码',
                }
            ],
            tableData: [{
            }],
            selectOptions: [{
                    label: '所有',
                    value: 'all',
                },{
                    label: '用户昵称',
                    value: 'nickName',
                },{
                    label: '用户名',
                    value: 'username',
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 36,
            editValue: {
                nickName:'',
                username:'',
                password:''
            },
            addUserVisible: false,
            addUserValue: {
                nickName:'',
                username:'',
                password:''
            },
            idx: -1,
            id: -1
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            const params =  this.query
            axios({
                methods: 'get',
                url: '/api/user/find',
                params
            }).then( res => {
                if (res.code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                this.tableData = res.data.list
                this.pageTotal = res.data.total
            })
        },

        handleClick () {

        },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 编辑操作
        handleEdit(value) {
            this.editValue = Object.assign({},value);
            this.editVisible = true;
        },
        handleDelete(value) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                axios.delete('/api/user/del/'+value.userId).then (res => {
                    if( res.code !== 0) {
                        this.$message.error = res.message
                        return
                    }
                    this.query.pageIndex = 1
                    this.pageSize = 10
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消删除'
            });
        });
        },
        // 保存编辑
        saveEdit() {
            let params = this.editValue
            params = {
                userId: params.userId,
                nickName: params.nickName,
                password: params.password,
                username: params.username
            }
            axios.post('/api/user/update',params).then(res => {
                if (res.code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                this.editVisible = false
                this.query = {
                    key: 'all',
                    value: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                this.getData()
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleSizeChange(val) {
            this.query.pageSize = val
            this.getData();
        },

        addUser() {
            this.addUserVisible = true
        },

        saveAddUser() {
            const params = this.addUserValue
            axios.post('/api/user/add',params).then(res => {
                if (res.code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                this.addUserVisible = false
                this.query = {
                    key: 'all',
                    value: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                this.getData()
            })
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
