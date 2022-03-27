<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button v-if="$AUTH('role.add')" type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button v-if="$AUTH('role.batch.delete')" type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="角色名称" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="#ID" prop="id" width="200"></el-table-column>
				<el-table-column label="角色名称" prop="name" width="150"></el-table-column>
				<el-table-column label="角色别名" prop="alias" width="150"></el-table-column>
				<el-table-column label="备注" prop="remark" width="150"></el-table-column>
				<el-table-column label="创建时间" prop="createTime" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right">
					<template #default="scope">
                        <el-button v-if="$AUTH('role.auth')" type="text" size="small" @click="table_permission(scope.row, scope.$index)">权限设置</el-button>
                        <el-divider direction="vertical"></el-divider>
						<el-button v-if="$AUTH('role.data.scope')" type="text" size="small" @click="table_scopedata(scope.row, scope.$index)">数据权限</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-button v-if="$AUTH('role.edit')" type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
						<el-divider direction="vertical"></el-divider>
                        <el-button v-if="$AUTH('role.delete')" type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

	<permission-dialog v-if="dialog.permission"
                       ref="permissionDialog"
                       :menuProps="menuProps"
					   @success="handlePermissionSuccess"
                       @closed="dialog.permission=false">
    </permission-dialog>

    <scopedata-dialog v-if="dialog.scope" ref="scopedataDialog" @success="handleDataSuccess" @closed="dialog.scope=false"></scopedata-dialog>

</template>

<script>
	import saveDialog from './save'
	import permissionDialog from './permission'
    import scopedataDialog from "./scopedata";

	export default {
		name: 'role',
		components: {
            scopedataDialog,
			saveDialog,
			permissionDialog
		},
		data() {
			return {
				dialog: {
					save: false,
					permission: false,
                    scope: false
				},
				apiObj: this.$API.system.role.list,
				selection: [],
				search: {
					keyword: null
				},
                menuProps: {
				    roleId: "",
                    defKeys: []
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
            //数据权限
            table_scopedata(row) {
			    this.dialog.scope = true
                this.$nextTick(() => {
                    this.$refs.scopedataDialog.open().setData(row)
                })
            },
			//权限设置
            async table_permission(row) {
                this.dialog.permission = true
                // 递归获取三级节点id
                this.menuProps.roleId = row.id
                this.menuProps.defKeys = []
                // 获取角色拥有的权限
                var res = await this.$API.system.role.getTreeRoleMenuById.get(row.id);
                this.getLeafKeys(res.data,this.menuProps.defKeys)
                this.$nextTick(() => {
                    this.$refs.permissionDialog.open()
                })
            },
            //通过递归的形式获取角色下所有权限id
            getLeafKeys(node,arr) {
                if(node.children.length === 0) {
                    return arr.push(node.id)
                }
                node.children.forEach(item => this.getLeafKeys(item,arr))
            },
			//删除
			async table_del(row){
                var confirm = await this.$confirm(`确定删除选中的项吗？如果删除项中含有权限信息将会被一并删除`, '提示', {
                    confirmButtonText: 'ok',
                    type: 'warning'
                }).catch(() => {})
                if(confirm !== 'confirm'){
                    return false
                }
				var res = await this.$API.system.role.delete.delete(row.id);
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
                var confirm = await this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？如果删除项中含有权限信息将会被一并删除`, '提示', {
                    type: 'warning'
                }).catch(() => {})
                if(confirm !== 'confirm'){
                    return false
                }
                this.selection.forEach(item => {
                    ids.push(item.id)
                })
                const loading = this.$loading();
                var res = await this.$API.system.role.deleteBath.delete(ids)
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
