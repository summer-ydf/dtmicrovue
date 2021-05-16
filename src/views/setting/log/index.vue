<template>
	<el-container>
		<el-container>
			<el-header>
				<div class="left-panel">
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.keyword" placeholder="关键词" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="apiObj" stripe highlightCurrentRow @currentChange="currentChange">
					<el-table-column label="#" type="index" width="50"></el-table-column>
					<el-table-column label="ID" prop="id" width="180"></el-table-column>
					<el-table-column label="日志名" prop="name" width="150"></el-table-column>
					<el-table-column label="请求接口" prop="url" width="150"></el-table-column>
					<el-table-column label="请求方法" prop="type" width="150"></el-table-column>
					<el-table-column label="用户" prop="user" width="150"></el-table-column>
					<el-table-column label="客户端IP" prop="cip" width="150"></el-table-column>
					<el-table-column label="日志时间" prop="time" width="150"></el-table-column>
				</scTable>
			</el-main>
		</el-container>
		<el-aside width="340px" style="border-left: 1px solid #e6e6e6;border-right: 0;padding:20px;">
			<info ref="info"></info>
		</el-aside>
	</el-container>
</template>

<script>
	import info from './info'

	export default {
		name: 'log',
		components: {
			info
		},
		data() {
			return {
				apiObj: this.$API.log.list,
				search: {
					keyword: ""
				}
			}
		},
		methods: {
			upsearch(){

			},
			currentChange(row){
				this.$refs.info.setData(row)
			}
		}
	}
</script>

<style>
</style>
