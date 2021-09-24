<template>
	<el-switch v-model="value" />
	<div v-if="item.message" class="el-form-item-msg">{{item.message}}</div>
</template>

<script>
	export default {
		name: 'switchRender',
		props: {
			modelValue: [String, Number, Boolean, Date, Object, Array],
			item: { type: Object, default: () => {} }
		},
		data() {
			return {
				value: this.modelValue
			}
		},
		watch:{
			modelValue(val){
				this.value = val
			},
			value(val){
				this.$emit("update:modelValue", val)
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
