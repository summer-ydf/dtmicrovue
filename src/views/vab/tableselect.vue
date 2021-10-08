<!--
 * @Descripttion: 表格选择器组件演示
 * @version: 1.0
 * @Author: sakya
 * @Date: 2021年6月8日09:29:14
 * @LastEditors: sakya
 * @LastEditTime: 2021年6月8日09:29:14
-->

<template>
	<el-main>
		<el-alert title="select深度改造的表格选择器, 非常适用于大量数据选择的场景" type="success" style="margin-bottom:20px;"></el-alert>
		<el-card shadow="never" header="单选">
			<sc-table-select v-model="value2" :apiObj="apiObj" :params="params" :table-width="600" :props="props">
				<el-table-column prop="id" label="ID" width="150"></el-table-column>
				<el-table-column prop="user" label="姓名"></el-table-column>
			</sc-table-select>
		</el-card>
		<div style="height:15px"></div>
		<el-card shadow="never" header="多选">
			<sc-table-select v-model="value" :apiObj="apiObj" multiple :props="props">
				<el-table-column prop="id" label="ID" width="150"></el-table-column>
				<el-table-column prop="user" label="姓名"></el-table-column>
			</sc-table-select>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'tableselect',
		data() {
			return {
				apiObj: this.$API.demo.page,
				params: {
					name: 'demoName'
				},
				value: [
					{
						id: "410000199512025445",
						user: "魏磊"
					},
					{
						id: "520000198407304275",
						user: "史平"
					}
				],
				value2: {
					id: "520000198407304275",
					user: "史平"
				},
				props: {
					label: 'user',
					value: 'id',
					keyword: "keyword"
				}
			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
</style>
