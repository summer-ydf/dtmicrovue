<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
				<el-button type="primary" plain :disabled="selection.length==0">权限设置</el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="角色名称" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="角色名称" prop="label" width="250"></el-table-column>
				<el-table-column label="别名" prop="alias" width="150"></el-table-column>
				<el-table-column label="排序" prop="progress" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="140">
					<template #default="scope">
						<el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
						<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
						<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
							<template #reference>
								<el-button type="text" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>

			</scTable>
		</el-main>
	</el-container>

	<el-dialog :title="titleMap[saveMode]" v-model="saveDialogVisible" :width="600" destroy-on-close>
		<save-dialog ref="saveDialog" :mode="saveMode"></save-dialog>
		<template #footer>
			<el-button @click="saveDialogVisible=false" >取 消</el-button>
			<el-button v-if="saveMode!='show'" type="primary" @click="saveForm()" :loading="isSaveing">保 存</el-button>
		</template>
	</el-dialog>

</template>

<script>
	import saveDialog from './save'

	export default {
		name: 'role',
		components: {
			saveDialog
		},
		data() {
			return {
				apiObj: this.$API.role.list,
				selection: [],
				search: {
					keyword: null
				},
				saveDialogVisible: false,
				saveMode: 'add',
				titleMap: {
					add: "新增",
					edit: "编辑",
					show: "查看"
				},
				isSaveing: false,

			}
		},
		methods: {
			//添加
			add(){
				this.saveMode = 'add';
				this.saveDialogVisible = true;
			},
			//编辑
			table_edit(row){
				this.saveMode = 'edit';
				this.saveDialogVisible = true;
				this.$nextTick(() => {
					//这里应该再次根据ID查询详情接口
					this.$refs.saveDialog.setData(row)
				})

			},
			//查看
			table_show(row){
				this.saveMode = 'show';
				this.saveDialogVisible = true;
				this.$nextTick(() => {
					//这里应该再次根据ID查询详情接口
					this.$refs.saveDialog.setData(row)
				})
			},
			//删除
			async table_del(row, index){
				var reqData = {id: row.id}
				var res = await this.$API.user.del.post(reqData);
				if(res.code == 200){
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据
					this.$refs.table.tableData.splice(index, 1);
					this.$message.success("删除成功")
				}else{
					this.$alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量删除
			async batch_del(){
				this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？如果删除项中含有子集将会被一并删除`, '提示', {
					type: 'warning'
				}).then(() => {
					const loading = this.$loading();
					this.selection.forEach(item => {
						this.$refs.table.tableData.forEach((itemI, indexI) => {
							if (item.id === itemI.id) {
								this.$refs.table.tableData.splice(indexI, 1)
							}
						})
					})
					loading.close();
					this.$message.success("操作成功")
				}).catch(() => {

				})
			},
			//提交
			saveForm(){
				this.$refs.saveDialog.submit(async (formData) => {
					this.isSaveing = true;
					var res = await this.$API.user.save.post(formData);
					this.isSaveing = false;
					if(res.code == 200){
						//这里选择刷新整个表格 OR 插入/编辑现有表格数据
						this.saveDialogVisible = false;
						this.$message.success("操作成功")
					}else{
						this.$alert(res.message, "提示", {type: 'error'})
					}
				})
			},
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
			//搜索
			upsearch(){

			}
		}
	}
</script>

<style>
</style>
