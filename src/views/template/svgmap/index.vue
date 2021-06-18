<!--
 * @Descripttion: SVG平面布置图模板
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月16日15:05:15
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-container>
		<el-aside width="210px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					tree
				</el-main>
			</el-container>
		</el-aside>
		<el-main class="nopadding" style="background: #f6f8f9;" v-loading="svgLoading">
			<scEcharts ref="map" :option="option"></scEcharts>
		</el-main>
	</el-container>
</template>

<script>
	import scEcharts from '@/components/scEcharts';

	export default {
		name: 'svgmap',
		components: {
			scEcharts
		},
		data() {
			return {
				svgLoading: false,
				filterText: "",
				option: {}
			}
		},
		mounted() {
			this.getSvg()
		},
		methods: {
			async getSvg(){
				this.svgLoading = true;
				var svg = await this.$HTTP.get('img/floorplan.svg')
				this.svgLoading = false;
				scEcharts.registerMap('floorplan', { svg: svg });

				this.option = {
					title: {
						text: 'Floorplan Demo',
						subtext: '非常适用于室内布局/电子版布局/停车场监控等业务场景',
						left: '20',
						top: '20'
					},
					tooltip: {
					},
					geo: {
						map: 'floorplan',
						roam: true,
						selectedMode: 'single',
						select: {
							itemStyle: {
								color: 'rgba(0, 153, 255, 0.8)'
							},
							label: {
								show: false,
							}
						},
						emphasis: {
							itemStyle: {
								color: null
							},
							label: {
								show: false
							}
						}
					},
					series: {
						name: '告警',
						type: 'effectScatter',
						symbolSize: 20,
						coordinateSystem: 'geo',
						geoIndex: 0,
						encode: {
							tooltip: 2
						},
						data: [
							[329.0704991641723, 202.9464925472316, 100],
							[254.6904486027168, 623.9059276397206, 50]
						]
					}
				}

				var myChart = this.$refs.map.myChart
				myChart.on('geoselectchanged', function (params) {
					var selectedNames = params.allSelected[0].name;
					console.log('selected', selectedNames);
				});
				myChart.getZr().on('click', function (params) {
					var pixelPoint = [params.offsetX, params.offsetY];
					    var dataPoint = myChart.convertFromPixel({ geoIndex: 0 }, pixelPoint);
					    // 在 SVG 上点击时，坐标会被打印。
					    // 这些坐标可以在 `series.data` 里使用。
					    console.log(dataPoint);

				});
			}
		}
	}
</script>

<style>
</style>
