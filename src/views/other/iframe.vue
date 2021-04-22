<template>
	<iframe :src="src" frameborder='0'></iframe>
</template>

<script>
	export default {
		data() {
			return {
				src: decodeURIComponent(this.$route.fullPath.substr(1))
			}
		}
	}
</script>

<style scoped>
	iframe {border:0;position: absolute;top:0px;left:0px;right:0px;bottom:0px;width:100%;height:100%;}
</style>
