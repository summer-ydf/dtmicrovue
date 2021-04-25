<template>
	<el-skeleton />
</template>

<script>
	export default {
		props: {
			msg: String
		},
		mounted(){
			console.log("加载C2");
		}
	}
</script>
