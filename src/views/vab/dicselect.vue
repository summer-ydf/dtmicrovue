<!--
 * @Descripttion: 字典选择器组件演示
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年8月3日15:51:20
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-card shadow="never" header="单选">
			<sc-dic-select v-model="value" dic="notice" clearable filterable></sc-dic-select>
		</el-card>
		<el-card shadow="never" header="多选" style="margin-top: 15px;">
			<sc-dic-select v-model="value2" dic="notice" clearable filterable multiple></sc-dic-select>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'dicselect',
		data() {
			return {
				value: '',
				value2: []
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
