<template>
	<el-container>
		<el-aside width="300px" v-loading="deptLoading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="deptFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="dept" class="menu" node-key="id" :data="deptList" :props="deptProps"
							 draggable highlight-current :expand-on-click-node="false"
							 check-strictly show-checkbox :filter-node-method="deptFilterNode"
							 @node-click="deptClick">
						<template #default="{node, data}">
							<span class="custom-tree-node el-tree-node__label">
								<span class="label">
									{{ node.label }}
								</span>
								<span class="do">
									<el-icon @click.stop="add(node, data)"><el-icon-plus/></el-icon>
								</span>
							</span>
						</template>
					</el-tree>
				</el-main>
				<el-footer style="height:51px;">
					<el-button v-if="$AUTH('dept.add')" type="primary" size="mini" icon="el-icon-plus" @click="add()"></el-button>
					<el-button v-if="$AUTH('dept.batch.delete')" type="danger" size="mini" plain icon="el-icon-delete" @click="delDept"></el-button>
				</el-footer>
			</el-container>
		</el-aside>
		<el-container>
			<el-main class="nopadding" style="padding:20px;" ref="main">
				<save ref="save" :dept="deptList"></save>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
let newDeptIndex = 1;
import save from './save'
export default {
    name: "settingDept",
	components: {save},
	data(){
		return {
			deptLoading: false,
			deptList: [],
			deptProps: {
				label: (data)=>{
					return data.label
				}
			},
			deptFilterText: ""
		}
	},
	watch: {
		deptFilterText(val){
			this.$refs.dept.filter(val)
		}
	},
	mounted() {
		this.getDept()
	},
	methods: {
		//加载树数据
		async getDept(){
			this.deptLoading = true
			let res = await this.$API.system.dept.list.get()
			this.deptLoading = false
			this.deptList = res.data
		},
		//树点击
		deptClick(data, node){
			let pid = node.level === 1 ? '0' : node.parent.data.id
			this.$refs.save.setData(data, pid)
			this.$refs.main.$el.scrollTop = 0
		},
		//树过滤
		deptFilterNode(value, data){
			if (!value) return true
			let targetText = data.label
			return targetText.indexOf(value) !== -1
		},
		//增加
		async add(node, data){
			let newDeptName = "未命名" + newDeptIndex++;
			let newMenuData = {
				parentId: data ? data.id : "",
				label: newDeptName
			}
			this.deptLoading = true
			let res = await this.$API.common.generateId.get()
			this.deptLoading = false
			newMenuData.id = res.data
			this.$refs.dept.append(newMenuData, node)
			this.$refs.dept.setCurrentKey(newMenuData.id)
			var pid = node ? node.data.id : ""
			this.$refs.save.setData(newMenuData, pid)
		},
		//删除
		async delDept(){
			var CheckedNodes = this.$refs.dept.getCheckedNodes()
			if(CheckedNodes.length === 0){
				this.$message.warning("请选择需要删除的项")
				return false;
			}

			var confirm = await this.$confirm(`确定删除选中的 ${CheckedNodes.length} 项吗？`,'提示', {
				type: 'warning',
				confirmButtonText: '删除',
				confirmButtonClass: 'el-button--danger'
			}).catch(() => {})
			if(confirm !== 'confirm'){
				return false
			}

			this.deptLoading = true
			var ids = []
			CheckedNodes.forEach(item => {
				ids.push(item.id)
			})

			var res = await this.$API.system.dept.deleteBath.delete(ids)
			this.deptLoading = false

			if(res.code === 2000){
				this.$message.success("删除成功")
				CheckedNodes.forEach(item => {
					this.$refs.dept.remove(item)
				})
			}else{
				this.$message.warning(res.message)
			}
		}
	}
}
</script>

<style scoped>
.custom-tree-node {display: flex;flex: 1;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 24px;height:100%;}
.custom-tree-node .label {display: flex;align-items: center;;height: 100%;}
.custom-tree-node .label .el-tag {margin-left: 5px;}
.custom-tree-node .do {display: none;}
.custom-tree-node .do i {margin-left:5px;color: #999;padding:5px;}
.custom-tree-node .do i:hover {color: #333;}
.custom-tree-node:hover .do {display: inline-block;}
</style>
