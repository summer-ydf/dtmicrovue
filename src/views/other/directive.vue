<template>
	<el-main>
		<el-card shadow="never">
			<h2 style="margin-bottom: 20px;">v-auth 高精度权限控制</h2>
			<el-button v-auth="'user.add'" type="primary">v-auth="'user.add'"</el-button>
			<el-button v-auth="['user.no','user.add']" type="primary">v-auth="['user.no','user.add']"</el-button>
			<el-alert title="v-auth指令 是$AUTH的语法糖, 原先需要使用v-if来判断是否有权限, 使用指令将减少代码冗余. 并且支持传入数组,有一项满足就判断有权限" style="margin-top: 20px;"></el-alert>
		</el-card>
		<el-card shadow="never" style="margin-top: 15px;">
			<h2 style="margin-bottom: 20px;">v-role 角色权限控制</h2>
			<el-button v-role="'admin'" type="primary">v-role="'admin'"</el-button>
			<el-button v-role="['SA','admin']" type="primary">v-role="['SA','admin']"</el-button>
			<el-alert title="v-role指令 是$ROLE的语法糖, 原理是判断是否含有用户所在的角色别名" style="margin-top: 20px;"></el-alert>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'directive',
		data() {
			return {}
		},
		created() {

		}
	}
</script>

<style>
</style>
