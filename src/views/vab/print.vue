<template>
	<el-main>
		<el-card shadow="never">
			<el-tabs tab-position="top">
				<el-tab-pane label="普通打印">
					<el-alert title="打印当前页面已存在的元素,如包含.no-print样式就忽略" type="success" style="margin-bottom:20px;"></el-alert>
					<el-button type="primary" @click="print">普通打印</el-button>
					<div style="height:20px"></div>
					<div class="printMain" ref="printMain">
						打印内容
						<p class="no-print">忽略打印</p>
					</div>
				</el-tab-pane>
				<el-tab-pane label="动态打印">
					<el-alert title="打印创建的DOM结构,适用于远程获取模板后打印" type="success" style="margin-bottom:20px;"></el-alert>
					<el-button type="primary" @click="print2">动态打印</el-button>
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</el-main>
</template>

<script>
	import print from '@/utils/print'

	export default {
		name: 'print',
		data() {
			return {}
		},
		methods: {
			print(){
				//直接传入REF或者querySelector
				print(this.$refs.printMain)
			},
			print2(){
				//创建虚拟DOM结构后再传入
				var dom = document.createElement("div")
					dom.innerHTML = "<div>后创建的DOM结构</div>"
				print(dom)
			}
		}
	}
</script>

<style scoped>
	.printMain {padding:20px;border: 1px solid #eee;}
	.printMain p {margin-top: 20px;color: #999;}
</style>
