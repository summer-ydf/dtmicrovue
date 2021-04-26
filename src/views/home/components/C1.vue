<template>
	<el-skeleton />
</template>

<script>
	export default {
		title:"模块1",
		props: {
			msg: String
		},
		mounted(){
			console.log("加载C1");
		}
	}
</script>
