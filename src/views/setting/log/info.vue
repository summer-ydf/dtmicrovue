<template>

	<template v-if="data&&data.id">
		<el-descriptions title="基础信息" :column="1" size="small">
			<el-descriptions-item label="请求接口">{{data.url}}</el-descriptions-item>
			<el-descriptions-item label="请求方法">{{data.type}}</el-descriptions-item>
			<el-descriptions-item label="状态代码">{{data.code}}</el-descriptions-item>
			<el-descriptions-item label="日志名">{{data.name}}</el-descriptions-item>
			<el-descriptions-item label="日志时间">{{data.time}}</el-descriptions-item>
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
	</template>

	<template v-else>
		<el-empty description="没有预览" :image-size="120"></el-empty>
	</template>

</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		methods: {
			setData(data){
				this.data = data
			}
		}
	}
</script>

<style>
</style>
