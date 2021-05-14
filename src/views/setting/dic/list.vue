<template>
	LIST
	{{params}}
</template>

<script>
	export default {
		props: {
			mode: { type: String, default: "add" },
			params: { type: Object, default: () => {} }
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
</style>
