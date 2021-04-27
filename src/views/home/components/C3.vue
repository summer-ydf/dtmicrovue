<template>
	<div style="height: 200px" ref="demo"></div>
</template>

<script>
	import * as echarts from 'echarts';
	import T from '@/utils/echarts-theme-T.js';
	echarts.registerTheme('T', T);
	
	export default {
		title:"模块3",
		components: {
			echarts
		},
		props: {
			msg: String
		},
		mounted(){

			const myChart = echarts.init(this.$refs.demo, 'T');
			const option = {
				grid: {
					top: 50,
					right: 20,
					bottom: 30,
					left: 30,
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['预购队列', '最新成交价'],
					right: 13,
				},
				xAxis: {
					data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
				},
				yAxis: [
					{
						type: 'value',
						name: '价格',
					},
				],
				series: [
					{
						name: '预购队列',
						barWidth: 16,
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20],
					},
					{
						name: '最新成交价',
						type: 'line',
						data: [15, 20, 16, 20, 30, 8],
					},
				],
			};
			myChart.setOption(option);
		}
	}
</script>
