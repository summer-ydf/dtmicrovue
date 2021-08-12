<template>
	<el-config-provider :i18n="$i18n.t">
		<router-view></router-view>
	</el-config-provider>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss">
	@import '@/style/style.scss';
	@import '@/style/theme/dark.scss';
</style>
