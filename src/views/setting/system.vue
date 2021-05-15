<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">
				<el-tab-pane label="系统设置">
					
				</el-tab-pane>
				<el-tab-pane label="业务配置">业务配置</el-tab-pane>
				<el-tab-pane label="扩展配置">扩展配置</el-tab-pane>
			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'system',
		data() {
			return {
				sys: {
					name: ""
				}
			}
		}
	}
</script>

<style>
</style>
