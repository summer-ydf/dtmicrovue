<template>
	<el-checkbox v-for="option in item.options.items" :key="option.value" v-model="value[option.name]" :label="option.label"></el-checkbox>
</template>

<script>
	export default {
		name: 'checkboxGroupRender',
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
