<template>
	<div>
		<el-empty description="SHOW"></el-empty>
		<h2>ID={{ id }}</h2>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script>
	export default {
		name: 'show',
		props: ['showid'],
		data() {
			return {
				id: this.$route.params.id || this.showid,
				input: ""
			}
		},
		mounted: function() {
			//如果路由与组件名称相同修改tags title，防止作用于非路由组件时修改tags
			if(this.$route.name==this.$options.name){
				this.$store.commit("updateViewTags", {
					path: this.$route.path,
					meta: {
						title:"详情ID="+this.id
					}
				})
			}
		}
	}
</script>

<style scoped>
	.main {width:200px;}
</style>
