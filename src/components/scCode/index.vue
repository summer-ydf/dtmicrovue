<!--
 * @Descripttion: 封装的codemirror
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年9月28日15:02:19
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<div class="sc-code">
		<textarea v-html="code" wrap="off" rows="10"></textarea>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: [String, Object, Array],
		},
		data() {
			return {
				code: ""
			}
		},
		watch: {
			code(val){
				this.$emit('update:modelValue', JSON.parse(val));
			},
		},
		mounted() {
			this.code = JSON.stringify(this.modelValue, null, 4)
		},
		methods: {

		}
	}
</script>

<style scoped>
	.sc-code textarea {width: 100%;font-size: 12px;padding:15px;}
</style>
