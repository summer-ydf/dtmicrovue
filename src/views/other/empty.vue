<template>
	<router-view v-slot="{ Component }">
		<keep-alive :include="keepAliveNameList">
			<component :is="Component" :key="$route.fullPath"/>
		</keep-alive>
	</router-view>
</template>

<script>
	export default {
		data() {
			return {
				keepAliveNameList: this.$store.state.keepAlive.keepLiveRoute
			}
		},
		created: function() {
			
		},
	}
</script>
