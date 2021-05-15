<template>
	<el-container>
		<el-aside width="200px" v-loading="showGrouploading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" node-key="id" :data="group" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick"></el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
				<el-header>
					<div class="left-panel">
						<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
						<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
						<el-button type="primary" plain :disabled="selection.length==0">分配角色</el-button>
						<el-button type="primary" plain :disabled="selection.length==0">密码重置</el-button>
					</div>
					<div class="right-panel">
						<div class="right-panel-search">
							<el-input v-model="search.name" placeholder="登录账号 / 姓名" clearable></el-input>
							<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
						</div>
					</div>
				</el-header>
				<el-main class="nopadding">
					<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange" stripe>
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column label="ID" prop="id" width="80"></el-table-column>
						<el-table-column label="头像" width="80">
							<template #default="scope">
								<el-avatar :src="scope.row.avatar" size="small"></el-avatar>
							</template>
						</el-table-column>
						<el-table-column label="登录账号" prop="userName" width="150"></el-table-column>
						<el-table-column label="姓名" prop="name" width="150"></el-table-column>
						<el-table-column label="所属角色" prop="groupName" width="200"></el-table-column>
						<el-table-column label="加入时间" prop="date" width="150"></el-table-column>
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
		name: 'user',
		components: {
			saveDialog
		},
		data() {
			return {
				saveDialogVisible: false,
				saveMode: 'add',
				titleMap: {
					add: "新增",
					edit: "编辑",
					show: "查看"
				},
				isSaveing: false,
				showGrouploading: false,
				groupFilterText: '',
				group: [],
				apiObj: this.$API.user.list,
				selection: [],
				search: {
					name: null
				}
			}
		},
		watch: {
			groupFilterText(val) {
				this.$refs.group.filter(val);
			}
		},
		mounted() {
			this.getGroup()
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
				this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
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
			//加载树数据
			async getGroup(){
				var res = await this.$API.role.select.get();
				this.showGrouploading = false;
				var allNode ={id: '', label: '所有'}
				res.data.unshift(allNode);
				this.group = res.data;
			},
			//树过滤
			groupFilterNode(value, data){
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			//树点击事件
			groupClick(data){
				var params = {
					groupId: data.id
				}
				this.$refs.table.upData(params)
			},
			//搜索
			upsearch(){

			}
		}
	}
</script>

<style>
</style>
