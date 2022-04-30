<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
            </div>
            <div class="right-panel">
                <div class="right-panel-search">
                    <el-input v-model="search.keyword" placeholder="客户端ID" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
                </div>
            </div>
        </el-header>
        <el-main class="nopadding">
            <scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="#客户端ID" prop="clientId" width="150"></el-table-column>
                <el-table-column label="访问域" prop="scope" width="100"></el-table-column>
                <el-table-column label="自动放行" prop="autoapprove" width="100"></el-table-column>
                <el-table-column label="授权方式" prop="authorizedGrantTypes" width="350"></el-table-column>
                <el-table-column label="认证令牌时效(单位：秒)" prop="accessTokenValidity" width="200"></el-table-column>
                <el-table-column label="刷新令牌时效(单位：秒)" prop="refreshTokenValidity" width="200"></el-table-column>
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

    <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

</template>

<script>
    import saveDialog from './save'
    export default {
        components: {
            saveDialog
        },
        data() {
            return {
                dialog: {
                    save: false
                },
                apiObj: this.$API.system.client.list,
                selection: [],
                search: {
                    keyword: null
                }
            }
        },
        methods: {
            //添加
            add(){
                this.dialog.save = true
                this.$nextTick(() => {
                    this.$refs.saveDialog.open()
                })
            },
            //编辑
            table_edit(row){
                this.dialog.save = true
                this.$nextTick(() => {
                    this.$refs.saveDialog.open('edit').setData(row)
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
                var res = await this.$API.system.client.delete.delete(row.clientId);
                if(res.code === 2000){
                    this.$refs.table.refresh()
                    this.$message.success("删除成功")
                }else{
                    this.$alert(res.message, "提示", {type: 'error'})
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
            handleSaveSuccess(){
                this.$refs.table.refresh()
            },
            handlePermissionSuccess(){
                this.$refs.table.refresh()
            },
            handleDataSuccess(){
                this.$refs.table.refresh()
            }
        }
    }
</script>

<style>
</style>
