<template>
	<el-config-provider :locale="$i18n.messages[$i18n.locale].el" :button="{autoInsertSpace: false}">
		<router-view v-if="isRouterAlive"></router-view>
	</el-config-provider>
</template>

<script>
	import colorTool from '@/utils/color'

	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return{
				isRouterAlive: true
			}
		},
		created() {
			//设置主题颜色
			const app_color = this.$CONFIG.COLOR || this.$TOOL.data.get('APP_COLOR')
			if(app_color){
				document.documentElement.style.setProperty('--el-color-primary', app_color);
				for (let i = 1; i <= 9; i++) {
					document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(app_color,i/10));
				}
				document.documentElement.style.setProperty(`--el-color-primary-darken-1`, colorTool.darken(app_color,0.1));
			}
		},
		methods: {
			// 动态刷新
			reload() {
				this.isRouterAlive = false
				this.$nextTick(() => {
					this.isRouterAlive = true
				});
			},
		}
	}
</script>

<style lang="scss">
	@import '@/style/style.scss';
	@import '@/style/theme/dark.scss';
</style>
