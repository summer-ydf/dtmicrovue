<template>
	<el-container>
		<el-aside width="200px" v-loading="showDeptloading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" class="menu" node-key="id" :data="group" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick"></el-tree>
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
							<el-input v-model="search.username" placeholder="登录账号" clearable></el-input>
							<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
						</div>
					</div>
				</el-header>
				<el-main class="nopadding">
					<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange" stripe remoteSort remoteFilter>
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column label="ID" prop="id" width="200" sortable='custom'></el-table-column>
						<el-table-column label="头像" width="80" column-key="filterAvatar" :filters="[{text: '已上传', value: '1'}, {text: '未上传', value: '0'}]">
							<template #default="scope">
								<el-avatar :src="scope.row.avatar" size="small"></el-avatar>
							</template>
						</el-table-column>
						<el-table-column label="登录账号" prop="username" width="150" sortable='custom' column-key="filterUserName" :filters="[{text: '系统账号', value: '1'}, {text: '普通账号', value: '0'}]"></el-table-column>
						<el-table-column label="使用范围" prop="scope" width="100" sortable='custom'></el-table-column>
						<el-table-column label="所属角色" prop="roleNames" width="200" sortable='custom'>
							<template #default="scope">
								<div v-if="scope.row.roleNames.length > 0">
									<el-tag v-for="item in scope.row.roleNames" :key="item">{{item}}</el-tag>
								</div>
								<div v-else>
									<el-tag>暂无角色</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="创建时间" prop="createTime" width="150" sortable='custom'></el-table-column>
						<el-table-column label="账号状态" prop="enabled" width="100" sortable='custom'>
							<template #default="scope">
								<el-button type="primary" plain size="small" v-if="scope.row.enabled">开启</el-button>
								<el-button type="danger" plain size="small" v-else>禁用</el-button>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="right" width="100">
							<template #default="scope">
								<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
								<el-button type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</scTable>
				</el-main>
		</el-container>
	</el-container>

	<update-dialog v-if="dialog.save" ref="updateDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></update-dialog>
</template>

<script>
	import updateDialog from './update';

	export default {
		name: 'user',
		components: {
			updateDialog
		},
		data() {
			return {
				dialog: {
					save: false,
					department: false
				},
				showDeptloading: false,
				groupFilterText: '',
				group: [],
				apiObj: this.$API.system.user.list,
				selection: [],
				search: {
					username: null
				}
			}
		},
		watch: {
			groupFilterText(val) {
				this.$refs.group.filter(val);
			}
		},
		mounted() {
			this.getDeptList()
		},
		methods: {
			//添加
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.updateDialog.open()
				})
			},
			//编辑
			table_edit(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.updateDialog.open('edit').setData(row)
				})
			},
			//查看
			table_show(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('show').setData(row)
				})
			},
			//删除
			async table_del(row, index){
				var confirm = await this.$confirm(`确定删除选中的项吗？`, '提示', {
					confirmButtonText: 'ok',
					type: 'warning'
				}).catch(() => {})
				if(confirm !== 'confirm'){
					return false
				}
				var res = await this.$API.system.user.delete.delete(row.id);
				if(res.code === 2000){
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据
					this.$refs.table.tableData.splice(index, 1);
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
				var res = await this.$API.system.user.deleteBath.delete(ids)
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
			//加载部门树数据
			async getDeptList(){
				this.showDeptloading = true;
				var res = await this.$API.system.dept.list.get();
				this.showDeptloading = false;
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
				this.$refs.table.reload(params)
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

<style>
</style>
