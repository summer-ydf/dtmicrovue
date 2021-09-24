<template>
	<el-checkbox-group v-model="value">
		<el-checkbox v-for="item in item.options.items" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
	</el-checkbox-group>
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
				value: this.modelValue || []
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
