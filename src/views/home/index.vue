<template>
	<work v-if="dashboard=='1'"></work>
	<stats v-else></stats>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	const stats = defineAsyncComponent(() => import('./stats'));
	const work = defineAsyncComponent(() => import('./work'));

	export default {
		components: {
			stats,
			work
		},
		data(){
			return {
				dashboard: ''
			}
		},
		mounted(){
			this.dashboard = this.$TOOL.data.get("user").dashboard;
		},
		methods: {

		}
	}
</script>

<style>
</style>
