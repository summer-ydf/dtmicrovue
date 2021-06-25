<template>

	<template v-if="data&&data.id">
		<el-tabs>
			<el-tab-pane label="常规">
				<el-alert title="在没有配置的 DNS 服务器响应之后，名称 update-khd.2345.cc 的名称解析超时。" :type="typeMap[data.level]" :closable="false" style="margin-bottom:15px;"></el-alert>
				<el-descriptions :column="2" border size="small">
					<el-descriptions-item label="请求接口">{{data.url}}</el-descriptions-item>
					<el-descriptions-item label="请求方法">{{data.type}}</el-descriptions-item>
					<el-descriptions-item label="状态代码">{{data.code}}</el-descriptions-item>
					<el-descriptions-item label="日志名">{{data.name}}</el-descriptions-item>
					<el-descriptions-item label="日志时间">{{data.time}}</el-descriptions-item>
				</el-descriptions>
			</el-tab-pane>
			<el-tab-pane label="详细">
				<div class="code">
					Request: {
						User-Agent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
					},
					Response: {
						Content-Type: "application/json; charset=utf-8",
						Date: "Fri, 25 Jun 2021 03:02:14 GMT",
						Server: "nginx/1.17.8"
					}
				</div>
			</el-tab-pane>
		</el-tabs>
	</template>

	<template v-else>
		<el-empty description="没有预览" :image-size="120"></el-empty>
	</template>

</template>

<script>
	export default {
		data() {
			return {
				data: {},
				typeMap: {
					'info': "info",
					'warn': "warning",
					'error': "error"
				}
			}
		},
		methods: {
			setData(data){
				this.data = data
			}
		}
	}
</script>

<style scoped>
	.code {background: #848484;padding:15px;color: #fff;font-size: 12px;border-radius: 4px;}
</style>
