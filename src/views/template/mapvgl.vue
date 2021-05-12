<template>
	<div id="map_container" style="width: 500px;height: 500px;">map</div>
</template>

<script>
	export default {
		name: 'mapvgl',
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {
			this.initMap()
		},
		methods: {
			BMPGL(){
				return new Promise(function(resolve, reject) {
					window.init = function() {
						// eslint-disable-next-line
						resolve(BMapGL)
					}
					const script = document.createElement('script')
						script.type = 'text/javascript'
						script.src = `//api.map.baidu.com/api?v=1.0&type=webgl&ak=vxSbZuydZ42ktZCvXvy5xCai28OEVqUq&callback=init`
						script.onerror = reject
						document.head.appendChild(script)
					const script2 = document.createElement('script')
						script2.type = 'text/javascript'
						script2.src = `//mapv.baidu.com/build/mapv.min.js`
						script2.onerror = reject
						document.head.appendChild(script2)
					const script3 = document.createElement('script')
						script3.type = 'text/javascript'
						script3.src = `https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.119/dist/mapvgl.min.js`
						script3.onerror = reject
						document.head.appendChild(script3)
				})
			},
			initMap(){
				this.BMPGL().then((BMapGL) => {
					// 1. 创建地图实例
					var bmapgl = new BMapGL.Map('map_container');
					var point = new BMapGL.Point(116.403748, 39.915055);
					bmapgl.centerAndZoom(point, 17);

					// 2. 创建MapVGL图层管理器
					var view = new mapvgl.View({
					    map: bmapgl
					});

					// 3. 创建可视化图层，并添加到图层管理器中
					var layer = new mapvgl.PointLayer({
					    color: 'rgba(50, 50, 200, 1)',
					    shape: 'circle', // 默认为圆形，可传square改为正方形
					    blend: 'lighter',
					    size: 2,
					    data: [{
					        geometry: {
					            type: 'Point',
					            coordinates: [116.403748, 39.915055]
					        }
					    }]
					});
					view.addLayer(layer);

					// 4. 准备好规范化坐标数据
					var data = [{
					    geometry: {
					        type: 'Point',
					        coordinates: [116.403748, 39.915055]
					    }
					}];

					// 5. 关联图层与数据，享受震撼的可视化效果
					layer.setData(data);
				}).catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
