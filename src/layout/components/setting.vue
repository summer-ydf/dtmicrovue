<template>
	<el-form ref="form" label-width="120px" label-position="left" style="padding:0 20px;">
		<el-alert title="以下配置可实时预览，开发者可在 config/index.js 中配置默认值，非常不建议在生产环境下开放布局设置" type="error" :closable="false"></el-alert>
		<el-divider></el-divider>
		<el-form-item label="框架布局">
			<el-select v-model="layout" placeholder="请选择">
				<el-option label="默认" value="default"></el-option>
				<el-option label="通栏" value="header"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="折叠菜单">
			<el-switch v-model="menuIsCollapse"></el-switch>
		</el-form-item>
		<el-form-item label="标签栏">
			<el-switch v-model="layoutTags"></el-switch>
		</el-form-item>
		<el-divider></el-divider>
	</el-form>
</template>

<script>
	export default {
		data(){
			return {
				layout: this.$store.state.global.layout,
				menuIsCollapse: this.$store.state.global.menuIsCollapse,
				layoutTags: this.$store.state.global.layoutTags,
			}
		},
		watch: {
			layout(val) {
				this.$store.commit("SET_layout", val)
			},
			menuIsCollapse(){
				this.$store.commit("TOGGLE_menuIsCollapse")
			},
			layoutTags(){
				this.$store.commit("TOGGLE_layoutTags")
			}
		}
	}
</script>

<style>
</style>
