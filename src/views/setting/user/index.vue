<template>
	<el-container>
		<el-aside width="200px">
			<el-tree node-key="id" :data="group" :default-expanded-keys="[2]" :current-node-key="[1]" :highlight-current="true" :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
		</el-aside>
		<el-container>
				<el-header>
					<div class="left-panel">
						<el-button type="primary" icon="el-icon-plus"></el-button>
						<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0"></el-button>
						<el-button type="primary" plain :disabled="selection.length==0">分配角色</el-button>
						<el-button type="primary" plain :disabled="selection.length==0">密码重置</el-button>
					</div>
					<div class="right-panel">
						<div class="right-panel-search">
							<el-input v-model="search.name" placeholder="登录账号 / 姓名" clearable></el-input>
							<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
						</div>
					</div>
				</el-header>
				<el-main class="nopadding">
					<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange">

						<el-table-column type="selection" width="50"></el-table-column>

						<el-table-column label="#" type="index" width="50"></el-table-column>

						<el-table-column label="登录账号" prop="yx" width="150"></el-table-column>

						<el-table-column label="姓名" prop="name" width="150"></el-table-column>

						<el-table-column label="所属角色" prop="progress" width="150"></el-table-column>

						<el-table-column label="操作" fixed="right" align="right" width="140">
							<template #default="scope">
								<el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
								<el-button type="text" size="small">编辑</el-button>
								<el-button type="text" size="small">删除</el-button>
							</template>
						</el-table-column>

					</scTable>
				</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'user',
		data() {
			return {
				group: [
					{id: 0, label: '所有'},
					{id: 1, label: '超级管理员'},
					{id: 2, label: '管理员', children:[
						{id: 21, label: '系统管理员'},
						{id: 22, label: '业务管理员'},
						{id: 24, label: '数据管理员'}
					]},
					{id: 3, label: '操作员', children:[
						{id: 31, label: '公告维护员'},
						{id: 32, label: '审核员'},
						{id: 33, label: '复审员'}
					]}
				],
				apiObj: this.$API.demo.demolist.list,
				selection: [],
				search: {
					name: null
				}
			}
		},
		methods: {
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
		}
	}
</script>

<style>
</style>
