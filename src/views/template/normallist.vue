<template>
	<el-container>
		<el-header>
			<el-button type="primary" icon="el-icon-plus">新增</el-button>
			<el-button type="danger" icon="el-icon-delete"></el-button>
		</el-header>
		<el-main>
			<el-card shadow="never" class="scTable-card" body-style="height:100%">
				<scTable></scTable>
			</el-card>
		</el-main>
	</el-container>
</template>

<script>
	import scTable from '@/components/scTable';

	export default {
		name: 'normallist',
		components: {
			scTable
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.scTable-card {height:100%;}
	.scTable-card >>> .el-card {height:100%;}
</style>
