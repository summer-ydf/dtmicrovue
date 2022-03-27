<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button v-if="$AUTH('log.oper.batch.delete')" type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
            </div>
            <div class="right-panel">
                <div class="right-panel-search">
                    <el-input v-model="search.keyword" placeholder="操作账号" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
                </div>
            </div>
        </el-header>
        <el-main class="nopadding">
            <scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="操作时间" prop="createTime" width="150"></el-table-column>
                <el-table-column label="操作账号" prop="requestUserName" width="100"></el-table-column>
                <el-table-column label="标题" prop="title" width="200"></el-table-column>
                <el-table-column label="请求方式" prop="requestMethodType" width="100"></el-table-column>
                <el-table-column label="请求地址" prop="requestUrl" width="300"></el-table-column>
                <el-table-column label="请求IP" prop="requestIp" width="160"></el-table-column>
                <el-table-column label="状态" prop="status" width="80">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" v-if="scope.row.status === 1">正常</el-button>
                        <el-button type="danger" plain size="small" v-else>异常</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align="right">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看详情</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button v-if="$AUTH('log.oper.delete')" type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </scTable>
        </el-main>
    </el-container>
    <see-dialog v-if="dialog.see" ref="seeDialog" @closed="dialog.see=false"></see-dialog>
</template>
<script>
import seeDialog from "./see";
export default {
    name: "index",
    components: {
        seeDialog
    },
    data() {
        return {
            dialog: {
                see: false
            },
            apiObj: this.$API.system.log.operator_list,
            selection: [],
            search: {
                keyword: null
            }
        }
    },
    methods: {
        //查看详情
        table_show(row) {
            this.dialog.see = true
            this.$nextTick(() => {
                this.$refs.seeDialog.open().setData(row)
            })
        },
        //删除
        async table_del(row){
            var confirm = await this.$confirm(`确定删除选中的项吗？`, '提示', {
                confirmButtonText: 'ok',
                type: 'warning'
            }).catch(() => {})
            if(confirm !== 'confirm'){
                return false
            }
            var res = await this.$API.system.log.delete_operator.delete(row.id);
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
            var res = await this.$API.system.log.bath_delete_operator.delete(ids)
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
