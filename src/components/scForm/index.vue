<!--
 * @Descripttion: 动态表单渲染器
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年9月22日09:26:25
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-form ref="form" :model="form" :label-width="config.labelWidth" :label-position="config.labelPosition">
		<el-row :gutter="15">
			<template v-for="(item, index) in config.items" :key="index">
				<el-col v-if="!hideHandle(item)" :span="item.span || 24">
					<el-form-item :label="item.label" :prop="item.name" :rules="rulesHandle(item)">
						<component :is="`${item.component}-render`" v-model="form" :item="item"></component>
					</el-form-item>
				</el-col>
			</template>
			<el-col :span="24">
				<el-form-item>
					<el-button type="primary">提交</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import inputRender from './items/input'
	import selectRender from './items/select'
	import checkboxRender from './items/checkbox'
	import checkboxGroupRender from './items/checkboxGroup'
	import switchRender from './items/switch'

	export default {
		props: {
			modelValue: { type: Object, default: () => {} },
			config: { type: Object, default: () => {} }
		},
		components: {
			inputRender,
			selectRender,
			checkboxRender,
			checkboxGroupRender,
			switchRender
		},
		data() {
			return {
				form: {}
			}
		},
		watch:{
			form(val){
				this.$emit("update:modelValue", val)
			}
		},
		mounted() {
			this.setForm()
		},
		methods: {
			//构建form对象
			setForm(){
				this.config.items.forEach((item) => {

					if(item.component == 'checkbox'){
						item.options.items.forEach((option) => {
							this.form[option.name] = option.value
						})
					}else{
						this.form[item.name] = item.value
					}

				})
				this.form = Object.assign({}, this.form, this.modelValue)
			},
			updata(val, item){
				console.log(val, item)
			},
			hideHandle(item){
				if(item.hideHandle){
					const exp = eval(item.hideHandle.replace(/\$/g,"this.form"))
					return exp
				}
				return false
			},
			rulesHandle(item){
				if(item.requiredHandle){
					const exp = eval(item.requiredHandle.replace(/\$/g,"this.form"))
					var requiredRule = item.rules.find(t => 'required' in t)
					requiredRule.required = exp
				}
				return item.rules
			}
		}
	}
</script>

<style>
</style>
