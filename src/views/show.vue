<template>
	<div>SHOW</div>
	<div class="main">
		<el-input v-model="input" placeholder="请输入内容" clearable></el-input>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: ''
			};
		}
	}
</script>

<style>
	.main {width:200px;}
</style>