<template>
	<el-empty description="描述文字"></el-empty>
</template>

<script>
	export default {
		title:"模块4",
		props: {
			msg: String
		},
		mounted(){
			console.log("加载C4");
		}
	}
</script>
