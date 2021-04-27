<template>
	<div v-loading="loading">
		<scEcharts height="300px" :option="option"></scEcharts>
	</div>
</template>

<script>
	import scEcharts from '@/components/scEcharts';

	export default {
		title:"模块1",
		components: {
			scEcharts
		},
		data() {
			return {
				loading: true,
				option: {}
			}
		},
		created() {
			var _this = this;
			setTimeout(function() {
				_this.loading = false
			}, 500);

			var option = {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['支出', '收入'],
					right: 13,
				},
				xAxis: {
					boundaryGap: false,
					data: ['周一', '周二', '周三', '周四', '周五', '周六'],
				},
				yAxis: [{
					type: 'value',
					name: '价格',
					"splitLine": {
						"show": false
					}
				}],
				series: [{
						name: '支出',
						type: 'line',
						symbolSize: 6,
						smooth: true,
						lineStyle: {
							normal: {
								shadowColor: 'rgba(0,0,0,0.2)',
								shadowBlur: 15,
								shadowOffsetY: 20
							}
						},
						'areaStyle': {
							'opacity': 0.2
						},
						data: [35, 10, 36, 5, 5, 20],
					},
					{
						name: '收入',
						type: 'line',
						symbolSize: 6,
						smooth: true,
						lineStyle: {
							normal: {
								shadowColor: 'rgba(0,0,0,0.2)',
								shadowBlur: 15,
								shadowOffsetY: 20
							}
						},
						'areaStyle': {
							'opacity': 0.2
						},
						data: [15, 15, -25, 20, 20, 8],
					},
				],
			};
			this.option = option;
		}
	}
</script>
