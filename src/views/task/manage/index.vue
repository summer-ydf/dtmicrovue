<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
            </div>
            <div class="right-panel">
                <div class="right-panel-search">
                    <el-input v-model="search.keyword" placeholder="任务名称" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
                </div>
            </div>
        </el-header>
        <el-main class="nopadding">
            <scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="任务ID" prop="taskId" width="150"></el-table-column>
                <el-table-column label="任务名称" prop="taskName" width="100"></el-table-column>
                <el-table-column label="任务组名称" prop="taskGroupName" width="100"></el-table-column>
                <el-table-column label="任务类" prop="jobClass" width="200"></el-table-column>
                <el-table-column label="执行表达式" prop="cronExpression" width="80"></el-table-column>
                <el-table-column label="状态" prop="type" width="100">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" v-if="scope.row.status === 1">运行中</el-button>
                        <el-button type="danger" plain size="small" v-else>已暂停</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="100"></el-table-column>
                <el-table-column label="操作" fixed="right" align="right">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
                        <el-divider direction="vertical"></el-divider>
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
            apiObj: this.$API.task.job.list,
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
