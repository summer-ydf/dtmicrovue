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
						<el-button v-if="$AUTH('user.add')" type="primary" icon="el-icon-plus" @click="add"></el-button>
						<el-button v-if="$AUTH('user.batch.delete')" type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
					</div>
					<div class="right-panel">
						<div class="right-panel-search">
							<el-input v-model="search.keyword" placeholder="登录账号" clearable></el-input>
							<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
						</div>
					</div>
				</el-header>
				<el-main class="nopadding">
					<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange" stripe remoteSort remoteFilter>
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column label="ID" prop="id" width="160" sortable='custom'></el-table-column>
                        <el-table-column label="姓名" prop="name" width="100" sortable='custom'></el-table-column>
						<el-table-column label="登录账号" prop="username" width="100" sortable='custom'></el-table-column>
						<el-table-column label="手机号" prop="mobile" width="100" sortable='custom'></el-table-column>
						<el-table-column label="登录账号" prop="username" width="100" sortable='custom'></el-table-column>
						<el-table-column label="所属部门" prop="deptName" width="100" sortable='custom'></el-table-column>
						<el-table-column label="所属角色" prop="roleNames" width="200" sortable='custom'>
							<template #default="scope">
								<div v-if="scope.row.roleNames">
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
								<el-switch v-model="scope.row.enabled" @change="changeSwitch($event, scope.row)" :loading="scope.row.$switch_yx" :active-value="true" :inactive-value="false"></el-switch>
							</template>
						</el-table-column>
						<el-table-column v-if="$AUTH('user.edit') || $AUTH('user.delete')" label="操作" fixed="right" align="right" width="100">
							<template #default="scope">
								<el-button v-if="$AUTH('user.edit')" type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
								<el-button v-if="$AUTH('user.delete')" type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
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
					keyword: null,
                    deptId: null
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
			    this.search.deptId = data.id
                this.$refs.table.upData(this.search)
			},
			//表格内开关事件
			async changeSwitch(val, row){
				//1.执行加载
				row.$switch_yx = true;
				var res = await this.$API.system.user.updateEnabled.post({
					"id": row.id,
					"enabled": val
				})
				if (res.code === 2000) {
					//2.等待接口返回后改变值
					setTimeout(()=>{
						delete row.$switch_yx;
						row.yx = val;
						this.$message.success(res.message)
					}, 100)
				}
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
