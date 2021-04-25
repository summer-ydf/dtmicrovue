<template>
	<el-empty description="描述文字"></el-empty>
</template>

<script>
	export default {
		props: {
			msg: String
		},
		mounted(){
			console.log("加载C3");
		}
	}
</script>
