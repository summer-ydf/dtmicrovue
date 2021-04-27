<template>
	<div ref="scEcharts" :style="{height:height, width:width}"></div>
</template>

<script>
	import * as echarts from 'echarts';
	import T from './echarts-theme-T.js';
	echarts.registerTheme('T', T);

	export default {
		name: "scEcharts",
		props: {
			height: { type: String, default: "100%" },
			width: { type: String, default: "100%" },
			nodata: {type: Boolean, default: false },
			option: { type: Object, default: () => {} }
		},
		data() {
			return {}
		},
		computed: {
			myOptions: function() {
				return this.option || {};
			}
		},
		mounted(){
			this.draw();
		},
		methods: {
			draw(){
				let myChart = echarts.init(this.$refs.scEcharts, 'T');
				myChart.setOption(this.myOptions);
				window.addEventListener('resize', () => myChart.resize() );
			}
		}
	}
</script>
