<!--
 * @Descripttion: 字典选择器
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年8月3日15:53:37
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-select v-bind="$attrs" :loading="loading" @visible-change="visibleChange">
		<el-option v-for="item in options" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]"></el-option>
	</el-select>
</template>

<script>
	import config from "@/config/dicSelect";

	export default {
		props: {
			dic: { type: String, default: "" },
			params: { type: Object, default: () => ({}) },
		},
		data() {
			return {
				dicParams: this.params,
				loading: false,
				options: [],
				props: config.props
			}
		},
		mounted() {

		},
		methods: {
			//选项显示隐藏事件
			visibleChange(ispoen){
				if(ispoen && this.options.length==0){
					this.getRemoteData()
				}
			},
			//获取数据
			async getRemoteData(){
				this.loading = true
				this.dicParams[config.request.name] = this.dic
				var res = await config.apiObj.get(this.params)
				var response = config.parseData(res)
				this.options = response.data
				this.loading = false
			}
		}
	}
</script>

<style>
</style>
