<template>
	<div class="scTable">
		<div class="scTable-table">
			<el-table :data="tableData" ref="scTable" height="100%">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="ID" prop="id" width="80"></el-table-column>
				<el-table-column label="显示名称" prop="name" width="200"></el-table-column>
				<el-table-column label="类型" prop="type"></el-table-column>
				<el-table-column label="操作" fixed="right" width="100">
					<template #default="scope">
						<el-button @click="table_show(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="table_show(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="scTable-page">
			<el-pagination background :small="true" layout="total, prev, pager, next, jumper" :total="1000"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'scTable',
		props: {},
		data() {
			return {
				tableData:[
					{
						id: 1,
						name: "sakuya",
						type: 1
					},
					{
						id: 2,
						name: "Ali",
						type: 21
					}
				]
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.scTable {display:flex;flex-direction:column;height:100%;}
	.scTable-table {flex:1;}
	.scTable-page {height:50px;}
</style>
