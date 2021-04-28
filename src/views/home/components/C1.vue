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
				series: [
					{
						name: '收入',
						type: 'line',
						symbolSize: 6,
						smooth: true,
						lineStyle: {
							width: 8,
							shadowColor: 'rgba(0,0,0,0.2)',
							shadowBlur: 15,
							shadowOffsetY: 15,
							color: new scEcharts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#409EFF'
								}, {
								offset: 1,
								color: '#36CE9E'
							}])
						},
						'areaStyle': {
							'opacity': 0
						},
						data: [15, 15, 35, 5, 35, 15],
					},
				],
			};
			this.option = option;
		}
	}
</script>
