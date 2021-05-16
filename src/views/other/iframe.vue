<template>
	<iframe :src="src" frameborder='0'></iframe>
</template>

<script>
	export default {
		data() {
			return {
				src: this.$route.meta.url
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	iframe {border:0;width:100%;height:100%;display: block;}
</style>
