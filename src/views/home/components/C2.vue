<template>
	<el-skeleton />
</template>

<script>
	export default {
		title:"模块2",
		props: {
			msg: String
		},
		mounted(){
			console.log("加载C2");
		}
	}
</script>
