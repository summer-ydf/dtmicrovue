<template>
	<el-main>
		<el-alert title="根据角色配置,可让不同角色访问不同的控制台,参数值在登录成功后返回 dashboard:{type}" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :span="24">
				<el-card shadow="never" header="当前用户权限">
					<el-tag v-if="$HAS('user.add')">user.add</el-tag>
					<el-tag v-if="$HAS('user.edit')">user.edit</el-tag>
					<el-tag v-if="$HAS('user.delete')">user.delete</el-tag>
					<el-tag v-if="$HAS('list.add')">list.add</el-tag>
					<el-tag v-if="$HAS('list.edit')">list.edit</el-tag>
					<el-tag v-if="$HAS('list.delete')">list.delete</el-tag>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted(){
			this.$emit('on-mounted')
		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-row {margin-bottom:15px;}
	.el-tag+.el-tag {margin-left: 10px;}
</style>
