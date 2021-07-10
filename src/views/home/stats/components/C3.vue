<template>
	<div v-loading="loading">
		<scEcharts height="220px" :option="option"></scEcharts>
	</div>
</template>

<script>
	import scEcharts from '@/components/scEcharts';

	export default {
		title:"周收入对比",
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
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					data: ['支出', '收入'],
					right: 13,
				},
				xAxis: {
					data: ['周一', '周二', '周三', '周四', '周五'],
				},
				yAxis: [{
					type: 'value',
					name: '价格',
				}, ],
				series: [{
						name: '支出',
						barWidth: '15px',
						type: 'bar',
						data: [5, 20, 36, 10, 10],
					},
					{
						name: '收入',
						type: 'bar',
						barWidth: '15px',
						data: [15, 20, 16, 20, 30],
					},
				],
			};
			this.option = option;
		}
	}
</script>
