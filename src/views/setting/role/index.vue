<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0"></el-button>
				<el-button type="primary" plain :disabled="selection.length==0">权限设置</el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="角色名称" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" @selection-change="selectionChange">

				<el-table-column type="selection" width="50"></el-table-column>

				<el-table-column label="#" type="index" width="50"></el-table-column>

				<el-table-column label="角色名称" prop="yx" width="250"></el-table-column>

				<el-table-column label="别名" prop="name" width="150"></el-table-column>

				<el-table-column label="排序" prop="progress" width="150"></el-table-column>

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
</template>

<script>
	export default {
		name: 'user',
		data() {
			return {
				selection: [],
				search: {
					keyword: null
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
