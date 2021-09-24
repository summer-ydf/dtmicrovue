<template>
	<el-input v-model="form[item.name]" :placeholder="item.options.placeholder"></el-input>
</template>

<script>
	export default {
		name: 'inputRender',
		props: {
			modelValue: [String, Number, Boolean, Date, Object, Array],
			item: { type: Object, default: () => {} }
		},
		data() {
			return {
				form: this.modelValue
			}
		},
		watch:{
			modelValue(val){
				this.form = val
			},
			form(val){
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
