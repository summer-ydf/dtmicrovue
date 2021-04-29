<template>
	<el-main>
		<el-card shadow="never">
			<scFilterBar :options="options" :defaultFilter="defaultFilter" @change="change"></scFilterBar>
		</el-card>
		<el-alert title="SCUI 独创的过滤条Filterbar,可配置不同类型的过滤字段,以及异步获取数据,操作上方过滤条查看下方change事件的回调,在表格查询的场景下非常合适" type="success" style="margin:20px 0;"></el-alert>
		<el-card shadow="never">
			<pre>{{ filterData }}</pre>
		</el-card>
	</el-main>
</template>

<script>
	import scFilterBar from '@/components/scFilterBar';

	export default {
		name: 'filterBar',
		components: {
			scFilterBar
		},
		data() {
			return {
				filterData : {},
				defaultFilter : [],
				options: [
					{
						label: '输入框',
						value: 'name',
						type: 'text'
					},
					{
						label: '固定下拉框',
						value: 'type',
						type: 'select',
						extend: {
							data:[
								{
									label: "选项1",
									value: "1"
								},
								{
									label: "选项2",
									value: "2"
								}
							]
						}
					},
					{
						label: '固定下拉框(多选)',
						value: 'type2',
						type: 'select',
						extend: {
							multiple: true,
							data:[
								{
									label: "选项1",
									value: "1"
								},
								{
									label: "选项2",
									value: "2"
								}
							]
						}
					},
					{
						label: '异步下拉框',
						value: 'type3',
						type: 'select',
						extend: {
							request: async () => {
								var list = await this.$API.demo.select.get();
								return list.data;
							}
						}
					},
					{
						label: '远程搜索下拉框',
						value: 'type4',
						type: 'select',
						extend: {
							remote: true,
							request: async (query) => {
								var data = {
									keyword: query,
								}
								var list = await this.$API.demo.select.get(data);
								return list.data;
							}
						}
					},
					{
						label: '日期单选',
						value: 'date',
						type: 'date',
					},
					{
						label: '日期范围',
						value: 'date2',
						type: 'daterange',
					}
				]
			}
		},
		methods: {
			change(data){
				this.filterData = data;
			}
		}
	}
</script>

<style>
</style>
