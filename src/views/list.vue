<template>
	<el-container>
		<el-aside width="200px">
			<div>
				<el-tree node-key="id" :data="data" :default-expanded-keys="[1]" :highlight-current="true" :expand-on-click-node="false" :show-checkbox="true" @node-click="handleNodeClick"></el-tree>
			</div>
		</el-aside>
		<el-container>

			<el-header>
				<el-button type="primary">主要按钮</el-button>
				<el-button disabled>默认按钮</el-button>
				<el-button disabled>默认按钮</el-button>
				<el-dropdown style="margin-left: 10px;">
					<el-button>更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>黄金糕</el-dropdown-item>
							<el-dropdown-item>狮子头</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>

			<el-main id="tableMain">
				<el-card shadow="never" @selection-change='handleSelectionChange'>
					<el-table :data="tableData" row-key="name" stripe default-expand-all :height="tableHeight">
						<el-table-column type="selection" width="50"></el-table-column>
						<el-table-column label="显示名称" prop="meta.title" width="200"></el-table-column>
						<el-table-column label="图标" width="80">
							<template #default="scope">
								<i :class="scope.row.meta.icon"></i>
							</template>
						</el-table-column>
						<el-table-column label="路由名称" prop="name" width="100"></el-table-column>
						<el-table-column label="路由地址" prop="path" width="200">
							<template #default="scope">
								<el-tag>{{scope.row.path}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="路由组件" prop="component" width="100"></el-table-column>
						<el-table-column label="是否隐藏" prop="meta.hidden">
							<template #default="scope">
								{{ scope.row.meta.hidden?"是":"否" }}
							</template>
						</el-table-column>

						<el-table-column label="操作" fixed="right" width="100">
							<template>
								<el-button type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination background :small="true" layout="total, prev, pager, next, jumper" :total="1000"></el-pagination>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				data: [
					{label: '桌面'},
					{label: '下载'},
					{label: '文档'},
					{label: '图片'},
					{label: '磁盘', id: 1, children:[
						{label: 'Windows (C)'},
						{label: '本地磁盘 (D)'},
						{label: '本地磁盘 (E)'}
					]}
				],
				tableHeight: '0',
				tableData: []
			}
		},
		created() {
			this.tableData = this.$TOOL.data.get("user").menuList;
		},
		mounted(){
			this.$nextTick(() => {
				this.setTableHeight()
			})
			window.onresize = ()=>{
				this.setTableHeight()
			}
		},
		methods: {
			setTableHeight(){
				this.tableHeight = this.$el.querySelector("#tableMain").offsetHeight - 40 - 78
			},
			handleNodeClick(data){
				console.log(data);
			},
			handleSelectionChange(val) {
				console.log(val);
			}
		}
	}
</script>

<style scoped>

</style>
