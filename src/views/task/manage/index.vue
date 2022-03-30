<template>
    <el-container>
        <el-header>
            <div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
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
                <el-table-column label="任务名称" prop="taskName" width="150"></el-table-column>
                <el-table-column label="任务组名称" prop="taskGroupName" width="100"></el-table-column>
                <el-table-column label="任务类名" prop="jobClass" width="270"></el-table-column>
                <el-table-column label="cron表达式" prop="cronExpression" width="150"></el-table-column>
                <el-table-column label="状态" prop="type" width="100">
                    <template #default="scope">
                        <el-button type="primary" plain size="small" v-if="scope.row.status === 1">运行中</el-button>
                        <el-button type="danger" plain size="small" v-else>已暂停</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="150"></el-table-column>
                <el-table-column label="操作" fixed="right" align="right">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="table_stop(scope.row, scope.$index)">{{scope.row.status === 1 ? '暂停' : '恢复'}}</el-button>
						<el-divider direction="vertical"></el-divider>
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
import saveDialog from "./save"
export default {
    name: "index",
	components: {saveDialog},
    data() {
        return {
            apiObj: this.$API.task.job.list,
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
        //暂停任务
        async table_stop(row) {
		    var msg = "确定要暂停当前正在执行的任务吗？";
		    if(row.status === 0) {
                msg = "确定要恢复当前停止的任务吗？";
            }
            var confirm = await this.$confirm(msg, '提示', {
                confirmButtonText: 'ok',
                type: 'warning'
            }).catch(() => {
            })
            if (confirm !== 'confirm') {
                return false
            }
            var res = null
            if(row.status === 0) {
                res = await this.$API.task.job.resumeScheduleJob.post(row.taskId);
            }else if (row.status === 1) {
                res = await this.$API.task.job.pauseScheduleJob.post(row.taskId);
            }
            if (res !== null) {
                if (res.code === 2000) {
                    this.$refs.table.refresh()
                    this.$message.success(res.message)
                } else {
                    this.$alert(res.message, "提示", {type: 'error'})
                }
            }
        },
        //删除
        async table_del(row){
            var confirm = await this.$confirm(`确定要删除选中的项吗？`, '提示', {
                confirmButtonText: 'ok',
                type: 'warning'
            }).catch(() => {})
            if(confirm !== 'confirm'){
                return false
            }
            var res = await this.$API.task.job.deleteScheduleJob.delete(row.taskId);
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
