<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
                <el-button type="primary" icon="el-icon-plus" @click="add">发送消息</el-button>
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
                <el-table-column label="#ID" prop="id" width="150"></el-table-column>
                <el-table-column label="接收人" prop="receiverName" width="100"></el-table-column>
                <el-table-column label="发送报文" prop="sendData" width="200"></el-table-column>
                <el-table-column label="响应报文" prop="backData" width="100"></el-table-column>
                <el-table-column label="发送时间" prop="sendDate" width="150"></el-table-column>
                <el-table-column label="状态" prop="status" width="100">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" v-if="scope.row.status === 0">待发送</el-button>
                        <el-button type="primary" plain size="small" v-if="scope.row.status === 1">成功</el-button>
                        <el-button type="danger" plain size="small" v-if="scope.row.status === 2">失败</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="消息类型" prop="category" width="100">
                    <template #default="scope">
                        <el-button type="primary" size="small" v-if="scope.row.category === '1'">微信公众号</el-button>
                        <el-button type="primary" size="small" v-else>企业微信</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align="right">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </scTable>
        </el-main>
    </el-container>
    <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>
</template>
<script>
import saveDialog from "./save"
export default {
    name: "index",
    components: {saveDialog},
    data() {
        return {
            apiObj: this.$API.message.msg.list,
            selection: [],
            search: {
                keyword: null
            },
            dialog: {
                save: false
            },
        }
    },
    methods: {
        //发送消息
        add(){
            this.dialog.save = true
            this.$nextTick(() => {
                this.$refs.saveDialog.open()
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
            var res = await this.$API.message.msg.delete_wx.delete(row.id);
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
            var res = await this.$API.message.msg.bath_delete_wx.delete(ids)
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
        //本地更新数据
        handleSaveSuccess(data, mode){
            if(mode==='add' || mode==='edit'){
                this.$refs.table.refresh()
            }
        }
    }
}
</script>

<style scoped>

</style>
