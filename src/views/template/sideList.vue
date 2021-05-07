<template>
	<el-container>
		<el-aside width="200px">
			<div>
				<el-tree node-key="id" :data="data" :default-expanded-keys="[1]" :highlight-current="true" :expand-on-click-node="false" :show-checkbox="true" @node-click="handleNodeClick"></el-tree>
			</div>
		</el-aside>
		<el-container>
			<el-header>
				<div>
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
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :data="tableData" row-key="name">
					<!-- 表格列开始 -->
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
					<el-table-column label="是否隐藏" prop="meta.hidden" width="100">
						<template #default="scope">
							{{ scope.row.meta.hidden?"是":"否" }}
						</template>
					</el-table-column>

					<el-table-column label="操作" fixed="right" align="right" width="140">
						<template #default="scope">
							<el-button @click="table_edit(scope.row)" type="text" size="mini">编辑</el-button>
							<el-dropdown style="margin-left:10px;">
								<el-button size="mini" type="primary" plain icon="el-icon-arrow-down"></el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item @click="table_show(scope.row)">查看</el-dropdown-item>
										<el-dropdown-item>更新数据</el-dropdown-item>
										<el-dropdown-item>转移</el-dropdown-item>
										<el-dropdown-item>删除</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</template>
					</el-table-column>
					<!-- 表格列结束 -->
				</scTable>
			</el-main>
		</el-container>
	</el-container>

	<el-drawer title="我是标题" v-model="drawer" :size="800" :append-to-body="true" direction="rtl" destroy-on-close>
		<Show showid="我来自父组件"></Show>
	</el-drawer>

</template>

<script>
	import Show from './show.vue';

	export default {
		name: 'sideList',
		components: {
			Show
		},
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
				tableData: [],
				drawer: false
			}
		},
		async created() {
			var userInfo = await this.$API.user.info.get();
			this.tableData = userInfo.data.menuList;
		},
		mounted(){

		},
		methods: {
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
