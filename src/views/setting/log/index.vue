<template>
	<el-container>
		<el-aside width="220px">
			<el-tree ref="category" class="menu" node-key="label" :data="category" :default-expanded-keys="['系统日志']" current-node-key="系统日志" :highlight-current="true" :expand-on-click-node="false" @node-click="dicClick">
			</el-tree>
		</el-aside>
		<el-container>
			<el-main class="nopadding">
				<el-container>
					<el-header>
						<div class="left-panel">
							<el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
						</div>
						<div class="right-panel">

						</div>
					</el-header>
					<el-main class="nopadding">
						<scTable ref="table" :apiObj="apiObj" stripe highlightCurrentRow @currentChange="currentChange">
							<el-table-column label="级别" prop="level" width="50">
								<template #default="scope">
									<i v-if="scope.row.level=='error'" class="el-icon-error" style="color: #F56C6C;font-size: 14px;"></i>
									<i v-if="scope.row.level=='warn'" class="el-icon-warning" style="color: #E6A23C;font-size: 14px;"></i>
									<i v-if="scope.row.level=='info'" class="el-icon-info" style="color: #409EFF;font-size: 14px;"></i>
								</template>
							</el-table-column>
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
			</el-main>
			<div style="height:10px;border-top: 1px solid #e6e6e6;"></div>
			<el-footer style="height:40%;overflow: auto;">
				<info ref="info"></info>
			</el-footer>
		</el-container>
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
				category: [
					{
						label: '系统日志',
						children: [
							{label: 'debug'},
							{label: 'info'},
							{label: 'warn'},
							{label: 'error'},
							{label: 'fatal'}
						]
					},
					{
						label: '应用日志',
						children: [
							{label: 'selfHelp'},
							{label: 'WechatApp'}
						]
					}
				],
				date: [],
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
