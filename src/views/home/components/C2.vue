<template>

	<div style="height: 248px;">
		<el-scrollbar >
			<el-timeline>
				<el-timeline-item v-for="(item, index) in activities" :key="index" :timestamp="item.timestamp" placement="top">
					<div v-html="item.content"></div>
				</el-timeline-item>
			</el-timeline>
		</el-scrollbar>
	</div>
	<div style="margin-top: 20px;">
		<el-button type="primary" round @click="go">反馈讨论</el-button>
		<el-button type="primary" round @click="gogit">gitee</el-button>
	</div>

</template>

<script>
	export default {
		title: "模块2",
		data() {
			return {
				activities: [
					{
						content: '1.0.1 提升部分组件为全局组件',
						timestamp: '2021-05-07'
					},
					{
						content: '1.0.0 版本开源 <i class="el-icon-present"></i>',
						timestamp: '2021-05-07'
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			go(){
				window.open("https://support.qq.com/product/323856")
			},
			gogit(){
				window.open("https://gitee.com/lolicode/scui")
			}
		}
	}
</script>
