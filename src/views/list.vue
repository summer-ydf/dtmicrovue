<template>
	<el-container>
		<el-aside width="200px">
			<div>
				<el-tree node-key="id" :data="data" :default-expanded-keys="[1]" :highlight-current="true" :expand-on-click-node="false" :show-checkbox="true" @node-click="handleNodeClick"></el-tree>
			</div>
		</el-aside>
		<el-container>

			<el-header>
				<el-button type="primary" icon="el-icon-plus"></el-button>
				<el-button type="primary" icon="el-icon-delete"></el-button>
				<el-button type="primary">默认按钮</el-button>
				<el-dropdown style="margin-left: 10px;">
					<el-button type="primary" plain icon="el-icon-arrow-down"></el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>黄金糕</el-dropdown-item>
							<el-dropdown-item>狮子头</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>

			<el-main id="tableMain">
				<el-card shadow="never" v-loading="loading">
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
							<template #default="scope">
								<el-button @click="table_show(scope.row)" type="text" size="small">查看</el-button>
								<el-button @click="table_edit(scope.row)" type="text" size="small">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination background :small="true" layout="total, prev, pager, next, jumper" :total="1000"></el-pagination>
				</el-card>
			</el-main>
		</el-container>
		<el-drawer title="我是标题" v-model="drawer" :size="800" :append-to-body="true" direction="rtl" destroy-on-close>
			<Show showid="我来自父组件"></Show>
		</el-drawer>
	</el-container>
</template>

<script>
	import Show from './show.vue';

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
				tableData: [],
				loading: true,
				drawer: false
			}
		},
		components: {
			Show
		},
		async created() {
			var userInfo = await this.$API.user.info();
			var _this = this;
			setTimeout(function() {
				_this.tableData = userInfo.data.menuList;
				_this.loading = false;
			}, 500);

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
			table_show(row) {
				this.$router.push({
					path: '/template/show/' + row.meta.title
				});
			},
			table_edit(row) {
				console.log(row);
				this.drawer = true
			}
		}
	}
</script>

<style scoped>

</style>
