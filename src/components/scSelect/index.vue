<!--
 * @Descripttion: 异步选择器
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年8月3日15:53:37
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-select v-bind="$attrs" :loading="loading" @visible-change="visibleChange">
		<el-option v-for="item in options" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]">
			<slot name="option" :data="item"></slot>
		</el-option>
	</el-select>
</template>

<script>
	import config from "@/config/select";

	export default {
		props: {
			apiObj: { type: Object, default: () => {} },
			dic: { type: String, default: "" },
			params: { type: Object, default: () => ({}) }
		},
		data() {
			return {
				dicParams: this.params,
				loading: false,
				options: [],
				props: config.props,
			}
		},
		methods: {
			//选项显示隐藏事件
			visibleChange(ispoen){
				if(ispoen && this.options.length==0 && (this.dic || this.apiObj)){
					this.getRemoteData()
				}
			},
			//获取数据
			async getRemoteData(){
				this.loading = true
				this.dicParams[config.request.name] = this.dic
				var res = {}
				if(this.apiObj){
					res = await this.apiObj.get(this.params)
				}else if(this.dic){
					res = await config.dicApiObj.get(this.params)
				}
				var response = config.parseData(res)
				this.options = response.data
				this.loading = false
			}
		}
	}
</script>

<style>
</style>
