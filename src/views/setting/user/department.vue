<template>
	<el-dialog title="系统部门" v-model="visible" :width="400" destroy-on-close @closed="$emit('closed')">
		<el-tree :data="treeData"
				 :props="treeProps"
				 show-checkbox
				 check-strictly
				 node-key="id"
				 :default-expand-all="true"
				 :expand-on-click-node="false"
				 :default-checked-keys="defKeys"
				 ref="treeRef"
				 @check-change="handleNodeClick"
				 empty-text="加载中，请稍后..."
				 style="height: 55vh;overflow: auto;"
		></el-tree>
		<template #footer>
			<el-button type="primary" @click="visible=false" >确 定</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		name: "department",
		props: {
			deptId: Array
		},
		data() {
			return{
				visible: false,
				treeData: [],
				// 树形控件的属性绑定对象
				treeProps: {
					children: 'children',
					label: 'label'
				},
				// 默认选中的节点id值
				defKeys: [],
			}
		},
		created() {
			this.getTreeData()
			this.defKeys = this.deptId
		},
		methods: {
			open(){
				this.visible = true;
			},
			// 获取所有部门信息
			async getTreeData() {
				var res = await this.$API.system.dept.list.get();
				this.treeData = res.data
			},
			// 树组件单选实现
			handleNodeClick(data, checked) {
				if(checked === true) {
					// 子组件向父组件传值
					this.$emit('dept-event', data)
					this.$refs.treeRef.setCheckedKeys([data.id]);
				}
			},
		}
	}
</script>

<style scoped>

</style>
