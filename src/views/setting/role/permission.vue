<template>
	<el-tabs tab-position="left" style="height: 280px;">
		<el-tab-pane label="菜单权限">
			<div class="treeMain">
				<el-tree ref="menu" node-key="name" :data="menu.list" :default-checked-keys="menu.checked" :props="menu.props" show-checkbox></el-tree>
			</div>
		</el-tab-pane>
		<el-tab-pane label="部门权限">
			<div class="treeMain">
				<el-tree ref="group" node-key="name" :data="group.list" :default-checked-keys="group.checked" :props="group.props" show-checkbox></el-tree>
			</div>
		</el-tab-pane>
		<el-tab-pane label="类型权限">
			<div class="treeMain">
				<el-tree ref="type" node-key="name" :data="type.list" :default-checked-keys="type.checked" :props="type.props" show-checkbox></el-tree>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		data() {
			return {
				menu: {
					list: [],
					checked: ["test", "system", "user", "role"],
					props: {
						label: (data)=>{
							return data.meta.title
						}
					}
				},
				group: {
					list: [],
					checked: [],
					props: {}
				},
				type: {
					list: [],
					checked: [],
					props: {}
				}
			}
		},
		mounted() {
			this.getMenu();
			this.getGroup();
			this.getType();
		},
		methods: {
			async getMenu(){
				var res = await this.$API.menu.list.get();
				this.menu.list = res.data;
			},
			getGroup(){
				this.group.list = [
					{label: 'JL00'},
					{label: 'LP01'},
					{label: 'LP07'},
					{label: 'SL01'},
					{label: 'TL06'},
					{label: 'TL09'},
					{label: 'YP07'}
				];
			},
			getType(){
				this.type.list = [
					{label: '原料采购'},
					{label: '厂内互供'},
					{label: '炼销订单'},
					{label: '化工统销订单'},
					{label: '移库单'},
					{label: '自销订单'},
				];
			}
		}
	}
</script>

<style scoped>
	.treeMain {height:280px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
