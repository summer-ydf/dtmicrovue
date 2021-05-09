<template>

	<div style="height: 248px;">
		<el-scrollbar >
			<el-timeline style="padding-left: 20px;">
				<el-timeline-item v-for="(item, index) in activities" :key="index" :timestamp="item.timestamp" :color="index==0?'#409EFF':''" placement="top">
					<li v-for="li in item.content" :key="li"  v-html="li"></li>
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
						content: [
							"[新增] 个性列表模板",
							"[调整] 大布局更换为flex布局"
						],
						timestamp: '2021-05-09'
					},
					{
						content: [
							'[新增] 增加自定义隐藏排序列',
							'[修复] scEcharts组件主题警'
						],
						timestamp: '2021-05-08'
					},
					{
						content: [
							'[调整] 提升部分组件为全局组件'
						],
						timestamp: '2021-05-07'
					},
					{
						content: [
							'1.0.0 版本开源 <i class="el-icon-present"></i>'
						],
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
