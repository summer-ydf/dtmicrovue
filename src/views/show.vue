<template>
	<div>
		<el-empty description="SHOW"></el-empty>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script>
	export default {
		name: 'show',
		data() {
			return {
				input: ""
			}
		}
	}
</script>

<style scoped>
	.main {width:200px;}
</style>