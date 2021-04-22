<template>
	<div>
		<el-empty description="LIST"></el-empty>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				input: ""
			}
		}
	}
</script>

<style>
</style>
