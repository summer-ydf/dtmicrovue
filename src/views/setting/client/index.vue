<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" row-key="id">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="应用ID" prop="appId" width="150"></el-table-column>
				<el-table-column label="应用名称" prop="appName" width="250"></el-table-column>
				<el-table-column label="秘钥" prop="secret" show-overflow-tooltip width="150"></el-table-column>
				<el-table-column label="类型" prop="type" width="150"></el-table-column>
				<el-table-column label="授权到期" prop="tokenExp" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="120">
					<template #default="scope">
						<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
						<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
							<template #reference>
								<el-button type="text" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: "client",
		data(){
			return {
				apiObj: this.$API.app.list
			}
		},
		methods: {
			add(){

			}
		}
	}
</script>

<style>
</style>
