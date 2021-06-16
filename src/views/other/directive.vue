<template>
	<el-main>
		<el-card shadow="never">
			<h2 style="margin-bottom: 15px;">v-auth</h2>
			<el-button v-auth="'user.add'" type="primary">v-auth="'user.add'"</el-button>
			<el-button v-auth="['user.no','user.add']" type="primary">v-auth="['user.no','user.add']"</el-button>
			<el-alert title="v-auth指令 是$AUTH的语法糖, 原先需要使用v-if来判断是否有权限, 使用指令将减少代码冗余. 并且支持传入数组,有一项满足就判断有权限" style="margin-top: 15px;"></el-alert>
		</el-card>
	</el-main>
</template>

<script>
</script>

<style>
</style>
