<template>

	<div style="height: 248px;text-align: center;">
		<img src="img/ver.svg" style="height:150px"/>
		<h2 style="margin-top: 15px;">SCUI {{$CONFIG.APP_VER}}</h2>
		<p style="color: #999;margin-top: 10px;line-height: 2;">更新日志移到了gitee维护了，点击下方更新日志按钮查看</p>
	</div>
	<div style="margin-top: 20px;">
		<el-button type="primary" round @click="golog">更新日志</el-button>
		<el-button type="primary" round @click="go">反馈</el-button>
		<el-button type="primary" round @click="gogit">gitee</el-button>
	</div>

</template>

<script>
	export default {
		title: "模块2",
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			golog(){
				window.open("https://gitee.com/lolicode/scui/releases")
			},
			go(){
				window.open("https://support.qq.com/product/323856")
			},
			gogit(){
				window.open("https://gitee.com/lolicode/scui")
			}
		}
	}
</script>
