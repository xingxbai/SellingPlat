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
                @selection-change="handleSelectionChange"
            >
                <el-table-column label="ID" align="center" width="95px" prop="id"></el-table-column>
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
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
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
                id:1,
                nickName: 999,
                username: 123456789,
                password: 123456789
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
            pageTotal: 0,
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
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
        },

        handleClick () {

        },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.getData();
            console.log(this.query)
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
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
                //TODO ajax删除
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消删除'
            });
        });
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            //TODO ajax
            console.log(this.editValue)
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

        addUser() {
            this.addUserVisible = true
        },

        saveAddUser() {
            //TODO ajax
            const params = this.addUserValue
            console.log(params)
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
