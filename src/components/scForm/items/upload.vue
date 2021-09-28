<template>
	<el-col>
		<el-form-item :prop="item.name">
			<sc-upload v-model="value" :title="item.label"></sc-upload>
		</el-form-item>
	</el-col>
</template>

<script>
	export default {
		name: 'uploadRender',
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
