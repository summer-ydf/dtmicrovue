<template>

	<div style="height: 248px;text-align: center;">
		<img src="img/ver.svg" style="height:150px"/>
		<h2 style="margin-top: 15px;">SCUI {{$CONFIG.CORE_VER}}</h2>
		<p style="color: #999;margin-top: 10px;line-height: 2;">更新日志移到了gitee维护了，点击下方更新日志按钮查看</p>
	</div>
	<div style="margin-top: 20px;">
		<el-button type="primary" round @click="golog">更新日志</el-button>
		<el-button type="primary" round @click="gogit">gitee</el-button>
	</div>

</template>

<script>
	export default {
		title: "版本更新",
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
			gogit(){
				window.open("https://gitee.com/lolicode/scui")
			}
		}
	}
</script>
