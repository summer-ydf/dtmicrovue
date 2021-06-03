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
							"[优化] 代码生成器重构移位"
						],
						timestamp: '2021-06-03'
					},
					{
						content: [
							"[新增] 扩展图标"
						],
						timestamp: '2021-06-01'
					},
					{
						content: [
							"[新增] 布局实时演示",
							"[优化] 抽离tinymce、echarts模块",
							"[优化] 更换富文本编辑为tinymce",
							"[优化] 打印工具可直接传入html",
							"[删除] 诺干个无用的模板",
						],
						timestamp: '2021-05-30'
					},
					{
						content: [
							"[优化] 上传组件上传行为",
							"[优化] 富文本上传行为",
						],
						timestamp: '2021-05-25'
					},
					{
						content: [
							"[优化] 重构上传组件",
							"[新增] 富文本编辑器",
						],
						timestamp: '2021-05-24'
					},
					{
						content: [
							"[优化] 控制台自由布局开关",
							"[优化] 增加菜单管理新增和删除",
							'[优化] 角色管理增加权限配置'
						],
						timestamp: '2021-05-17'
					},
					{
						content: [
							"[新增] 组件sortablejs",
							"[新增] 7类系统基础页面",
							"[新增] 表格新增params，hidePagination参数",
							"[新增] 新的全局组件 sc-upload",
							"[优化] 路由表新增type属性 判断菜单、链接等",
							"[优化] iframe的表现形式,地址栏用别名代替",
							'[修复] 图表和表格切换标签时宽高异常'
						],
						timestamp: '2021-05-16'
					},
					{
						content: [
							"[新增] 打印工具",
							"[新增] 移动端菜单布局",
							'[修复] scEcharts数据双向绑定'
						],
						timestamp: '2021-05-09'
					},
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
