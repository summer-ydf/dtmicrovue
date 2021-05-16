<template>
	<el-container>
		<el-aside width="300px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="menuFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="menu" node-key="name" :data="menuList" :props="menuProps" highlight-current :expand-on-click-node="false" check-strictly show-checkbox :filter-node-method="menuFilterNode" @node-click="menuClick">

						<template #default="{node, data}">
							<span class="custom-tree-node">
								<span class="label">{{ node.label }}</span>
								<span class="do">
									<i class="el-icon-plus" @click.stop="add(node, data)"></i>
								</span>
							</span>
						</template>

					</el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
			<el-main class="nopadding" style="padding:20px;">
				<save ref="save" :menu="menuList"></save>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import save from './save'

	export default {
		name: "settingMenu",
		components: {
			save
		},
		data(){
			return {
				menuList: [],
				menuProps: {
					label: (data)=>{
						return data.meta.title
					}
				},
				menuFilterText: ""
			}
		},
		watch: {
			menuFilterText(val){
				this.$refs.menu.filter(val);
			}
		},
		mounted() {
			this.getMenu();
		},
		methods: {
			//加载树数据
			async getMenu(){
				var res = await this.$API.menu.list.get();
				this.menuList = res.data;
			},
			//树点击
			menuClick(data, node){
				var pid = node.level==1?undefined:node.parent.data.name;
				this.$refs.save.setData(data, pid)
			},
			//树过滤
			menuFilterNode(value, data){
				if (!value) return true;
				var targetText = data.name;
				return targetText.indexOf(value) !== -1;
			},
			//增加
			add(node, data){
				console.log(node, data);
			}
		}
	}
</script>

<style scoped>
	.custom-tree-node {display: flex;flex: 1;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 24px;height:100%;}
	.custom-tree-node .do {display: none;}
	.custom-tree-node .do i {margin-left:5px;color: #999;padding:5px;}
	.custom-tree-node .do i:hover {color: #333;}

	.custom-tree-node:hover .do {display: inline-block;}
</style>
