<template>
	<el-form-item :label="item.label" :rules="item.options.rules">
		<el-select v-model="value" :multiple="item.options.multiple" :placeholder="item.options.placeholder" style="width: 100%;">
			<el-option v-for="option in item.options.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
		</el-select>
	</el-form-item>
</template>

<script>
	export default {
		name: 'selectRender',
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
