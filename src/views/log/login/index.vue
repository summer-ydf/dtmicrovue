<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button v-if="$AUTH('log.login.batch.delete')" type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
            </div>
            <div class="right-panel">
                <div class="right-panel-search">
                    <el-input v-model="search.keyword" placeholder="登录账号" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
                </div>
            </div>
        </el-header>
        <el-main class="nopadding">
            <scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="登录时间" prop="createTime" width="150"></el-table-column>
                <el-table-column label="登录账号" prop="loginUserName" width="80"></el-table-column>
                <el-table-column label="登录IP" prop="loginIp" width="150"></el-table-column>
                <el-table-column label="标题" prop="title" width="300"></el-table-column>
                <el-table-column label="浏览器" prop="browser" width="100"></el-table-column>
                <el-table-column label="操作系统" prop="operatingSystem" width="100"></el-table-column>
                <el-table-column label="状态" prop="status" width="100">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" v-if="scope.row.status === 1">成功</el-button>
                        <el-button type="danger" plain size="small" v-else>失败</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="type" width="100">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" v-if="scope.row.type === 1">登录系统</el-button>
                        <el-button type="danger" plain size="small" v-else>退出系统</el-button>
                    </template>
                </el-table-column>
                <el-table-column v-if="$AUTH('log.login.delete')" label="操作" fixed="right" align="right">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </scTable>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        name: "index",
        data() {
            return {
                apiObj: this.$API.system.log.login_list,
                selection: [],
                search: {
                    keyword: null
                }
            }
        },
        methods: {
            //删除
            async table_del(row){
                var confirm = await this.$confirm(`确定删除选中的项吗？`, '提示', {
                    confirmButtonText: 'ok',
                    type: 'warning'
                }).catch(() => {})
                if(confirm !== 'confirm'){
                    return false
                }
                var res = await this.$API.system.log.delete_login.delete(row.id);
                if(res.code === 2000){
                    this.$refs.table.refresh()
                    this.$message.success("删除成功")
                }else{
                    this.$alert(res.message, "提示", {type: 'error'})
                }
            },
            //批量删除
            async batch_del(){
                var ids = []
                var confirm = await this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
                    type: 'warning'
                }).catch(() => {})
                if(confirm !== 'confirm'){
                    return false
                }
                this.selection.forEach(item => {
                    ids.push(item.id)
                })
                const loading = this.$loading();
                var res = await this.$API.system.log.bath_delete_login.delete(ids)
                if(res.code === 2000){
                    loading.close();
                    this.$refs.table.reload()
                    this.$message.success("删除成功")
                }else{
                    this.$message.warning("删除失败")
                }
            },
            //表格选择后回调事件
            selectionChange(selection){
                this.selection = selection;
            },
            //搜索
            upsearch(){
                this.$refs.table.upData(this.search)
            },
        }
    }
</script>

<style scoped>

</style>
