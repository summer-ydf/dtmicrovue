<template>
	<el-main>
		<el-alert title="感谢百度Echarts组件, SCUI经过封装后在VUE里使用更方便而且暴露Echarts所有方法,具体请查看本文件" type="success" style="margin-bottom:20px;"></el-alert>
		<el-card shadow="never">
			<scEcharts height="300px" :option="option"></scEcharts>
		</el-card>
	</el-main>
</template>

<script>
	import scEcharts from '@/components/scEcharts';

	/**
	 * 引入组件 @/components/scEcharts
	 * 组件内部会自动加载主题 @/components/scEcharts/echarts-theme-T.js
	 * 支持props包括 height，width，option
	 * 组件export百度Echarts所有方法，使用方式: new scEcharts[fun]
	 */

	export default {
		name: 'chart',
		components: {
			scEcharts
		},
		data() {
			return {
				option: {
					title: {
						text: 'Echarts Demo',
						subtext: '优雅的经过scEcharts组件封装',
					},
					grid: {
						top: '80px'
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'bar',
						barWidth: '20px',
					},
					{
						data: [110, 180, 120, 120, 60, 90, 110],
						type: 'bar',
						barWidth: '20px',
					}]
				}
			}
		}
	}
</script>

<style>
</style>
