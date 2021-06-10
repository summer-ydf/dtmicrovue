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
		<el-card shadow="never">
			<sc-table-select v-model="value" style="width: 400px;">

			</sc-table-select>
			<p>{{value}}</p>
		</el-card>
	</el-main>
</template>

<script>

	import scTableSelect from '@/components/scTableSelect';

	export default {
		name: 'tableselect',
		components: {
			scTableSelect
		},
		data() {
			return {
				value: null
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
