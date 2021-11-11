<!--
 * @Descripttion: 趋势标记
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年11月11日11:07:10
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<span class="sc-trend" :class="'sc-trend--'+type">
		<i v-if="type=='P'" class="sc-trend-icon el-icon-top"></i>
		<i v-if="type=='N'" class="sc-trend-icon el-icon-bottom"></i>
		<i v-if="type=='Z'" class="sc-trend-icon el-icon-right"></i>
		<em class="sc-trend-prefix">{{prefix}}</em>
		<em class="sc-trend-value">{{absValue}}</em>
		<em class="sc-trend-suffix">{{suffix}}</em>
	</span>
</template>

<script>
	export default {
		props: {
			modelValue: { type: Number, default: 0 },
			prefix: { type: String, default: "" },
			suffix: { type: String, default: "" },
			reverse: { type: Boolean, default: false }
		},
		computed: {
			absValue(){
				return Math.abs(this.modelValue);
			},
			type(v){
				if(this.modelValue == 0){
					v = 'Z'
				}else if(this.modelValue < 0){
					v =  this.reverse?'N':'P'
				}else if(this.modelValue > 0){
					v =   this.reverse?'P':'N'
				}
				return v
			}
		}
	}
</script>

<style scoped>
	.sc-trend {}
	.sc-trend-icon {margin-right: 2px;}
	.sc-trend em {font-style: normal;}
	.sc-trend-prefix {margin-right: 2px;}
	.sc-trend-suffix {margin-left: 2px;}
	.sc-trend--P {color: #f56c6c;}
	.sc-trend--N {color: #67c23a;}
	.sc-trend--Z {color: #555;}
</style>
