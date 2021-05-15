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
				<scTable ref="table" :apiObj="apiObj" stripe>
					<el-table-column label="#" type="index" width="50"></el-table-column>
					<el-table-column label="ID" prop="id" width="80"></el-table-column>
					<el-table-column label="日志名" prop="id" width="150"></el-table-column>
					<el-table-column label="请求接口" prop="id" width="150"></el-table-column>
					<el-table-column label="请求方法" prop="id" width="150"></el-table-column>
					<el-table-column label="客户端IP" prop="id" width="150"></el-table-column>
					<el-table-column label="日志时间" prop="id" width="150"></el-table-column>
				</scTable>
			</el-main>
		</el-container>
		<el-aside width="340px" style="border-left: 1px solid #e6e6e6;border-right: 0;padding:20px;">

			<el-descriptions title="基础信息" :column="1" size="small">
				<el-descriptions-item label="请求接口">/oauth/token</el-descriptions-item>
				<el-descriptions-item label="请求方法">POST</el-descriptions-item>
				<el-descriptions-item label="状态代码">200</el-descriptions-item>
				<el-descriptions-item label="日志名">登录用户验证</el-descriptions-item>
				<el-descriptions-item label="日志时间">2021-05-15 22:15:35</el-descriptions-item>
			</el-descriptions>

			<el-collapse>
				<el-collapse-item title="Request" name="1">
					<div>
						Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198
						Safari/537.36
					</div>
				</el-collapse-item>
				<el-collapse-item title="Response" name="2">
					<div>
						id=100
					</div>
				</el-collapse-item>
			</el-collapse>
		</el-aside>
	</el-container>
</template>

<script>
	export default {
		name: 'log',
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

			}
		}
	}
</script>

<style>
</style>
