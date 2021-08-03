<template>
	<el-container>
		<el-aside width="210px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="group" class="menu" node-key="id" :data="group" highlight-current default-expand-all @node-click="groupClick">
						<template #default="{ node, data }">
							<span class="el-tree-node__label">
								<i :class="['icon', data.children?'el-icon-folder':'el-icon-tickets']"></i>{{ node.label }}
							</span>
						</template>
					</el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>

			<el-header>
			</el-header>
			<el-main>
				<el-card shadow="never">
					<component :is="src"></component>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import { defineAsyncComponent, markRaw } from "vue"

	export default {
		name: 'report',
		data() {
			return {
				src: null,
				groupFilterText: '',
				group: [
					{
						label: '系统运维概况',
						name: 'system'
					},
					{
						label: '访客分析',
						children: [
							{
								label: '地域分布',
								name: 'region'
							},
							{
								label: '访客人像',
								name: 'user'
							}
						]
					}
				]
			}
		},
		methods: {
			groupClick(data){
				if(data.children) return
				this.src = markRaw(
					defineAsyncComponent({
						loader: () => import(`@/views/template/report/pages/${data.name}`),
						delay: 0,
						timeout: 10000,
						//loadingComponent: { template: '<div>加载中</div>' },
						//errorComponent:  { template: '<div>加载失败</div>' }
					})
				)
			}
		}
	}
</script>
