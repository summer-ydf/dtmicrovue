<template>
	<el-main>
		<el-row :gutter="0" class="box">
			<el-col :span="4" v-for="(icon, index) in icons" :key="index" >
				<div class="icon-box">
					<i :class="'scicon-'+icon.font_class"></i>
					<p>{{ 'scicon-'+icon.font_class }}</p>
				</div>
			</el-col>
		</el-row>
	</el-main>

</template>

<script>
	import icons from '@/assets/font/scicon/iconfont.json'
	export default {
		data() {
			return {
				icons: ""
			}
		},
		mounted() {
			this.icons = icons.glyphs
		}
	}
</script>

<style scoped>
	.box {border-top: 1px solid #eee;border-left: 1px solid #eee;}
	.icon-box {height:120px;text-align: center;background: #fff;border-bottom: 1px solid #eee;border-right: 1px solid #eee;color: #666;padding:30px 10px;}
	.icon-box i {font-size: 26px;transition: color .15s linear;}
	.icon-box p {color: #999;margin-top: 15px;transition: color .15s linear;}
	.icon-box:hover i, .icon-box:hover p {color: #5cb6ff;}
</style>
