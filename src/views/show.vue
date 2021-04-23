<template>
	<div>
		<el-empty description="SHOW"></el-empty>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script>
	export default {
		name: 'show',
		data() {
			return {
				id: this.$route.params.id,
				input: ""
			}
		},
		mounted: function() {
			//修改tags title
			this.$store.commit("updateViewTags", {
				path: this.$route.path,
				meta: {
					title:"详情ID="+this.id
				}
			})
		}
	}
</script>

<style scoped>
	.main {width:200px;}
</style>
