<template>
	<el-container>
		<el-aside width="210px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" class="menu" node-key="id" :data="group"></el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>

			<el-header>
			</el-header>
			<el-main>
				<el-card shadow="never">
					<el-button @click="load('1')">异步加载1</el-button>
					<el-button @click="load('2')">异步加载2</el-button>
					<el-button @click="load(null)">卸载组件</el-button>
					<sc-async-component :src="src"></sc-async-component>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import scAsyncComponent from './scAsyncComponent'

	export default {
		name: 'report',
		components: {
			scAsyncComponent
		},
		data() {
			return {
				src: null,
				groupFilterText: '',
				group: [
					{
						label: '系统运维概况',
					},
					{
						label: '访客分析',
						children: [
							{
								label: '地域分布',
							},
							{
								label: '访客人像',
							}
						]
					}
				]
			}
		},
		methods: {
			load(src){
				this.src = src
			}
		}
	}
</script>
