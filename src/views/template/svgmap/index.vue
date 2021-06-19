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
					<el-tree ref="tree" class="menu" node-key="id" :data="treeList" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="treeFilterNode">
					</el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-main class="nopadding" style="background: #f6f8f9;" v-loading="svgLoading">
			<scEcharts ref="map" :option="option"></scEcharts>
		</el-main>
		<el-aside width="340px" style="border-left: 1px solid #e6e6e6;border-right: 0;padding:15px;">
			<el-descriptions title="computer-c1" :column="1" border>
				<el-descriptions-item label="name">c1</el-descriptions-item>
				<el-descriptions-item label="category">computer</el-descriptions-item>
				<el-descriptions-item label="state"><em class="state state-1 status-processing"></em></el-descriptions-item>
			</el-descriptions>
			<el-collapse style="margin-top: 15px;">
				<el-collapse-item title="screen" name="1">
					<div class="screen" style="background: #000;height:180px;color: #999;text-align: center;">
						<i class="el-icon-menu" style="font-size: 40px;margin-top: 50px;"></i>
						<p>windows 10</p>
					</div>
				</el-collapse-item>
				<el-collapse-item title="user" name="2">
					<div>
						<el-avatar> S </el-avatar>
					</div>
				</el-collapse-item>
				<el-collapse-item title="network log" name="3">
					<el-empty description="NO DATA" :image-size="60"></el-empty>
				</el-collapse-item>
			</el-collapse>
		</el-aside>
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
				treeList: [
					{
						label: 'computer',
						children: [
							{label: 'c1'},
							{label: 'c2'},
							{label: 'c3'},
							{label: 'c4'},
							{label: 'c5'},
							{label: '...'}
						]
					},
					{
						label: 'network',
						children: [
							{label: 'W1'},
							{label: 'W2'}
						]
					}
				],
				info: {},
				option: {}
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
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
							[137.01938166540623, 51.93905433869099],
							[192.73843670517726, 52.00025351818228]
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
			},
			//树过滤
			treeFilterNode(value, data){
				if (!value) return true;
				var targetText = data.label;
				return targetText.indexOf(value) !== -1;
			},
		}
	}
</script>

<style scoped>
	.state {width:8px;height:8px;background: #ddd;display: inline-block;border-radius: 50%;vertical-align: middle;}
	.state-1 {background: #409EFF;}
	.state-2 {background: #F56C6C;}
	.status-processing {position: relative;}
	.status-processing:after {position: absolute;top:0px;left:0px;width: 100%;height: 100%;border-radius: 50%;background: inherit;content: '';animation: warn 1.2s ease-in-out infinite;}

	@keyframes warn {
		0% {
			transform: scale(0.5);
			opacity: 1;
		}
		30% {
			opacity: 1;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
</style>
