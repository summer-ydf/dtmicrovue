<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="6">
				<el-card shadow="never" header="1.参数配置">
					<pre>{{config2}}</pre>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="2.渲染器">
					<sc-form :config="config2" v-model="data"></sc-form>
				</el-card>
				<el-card shadow="never" header="" v-if="false">
					<el-form ref="formref" :model="d" label-width="100px" label-position="right" :rules="rules">
						<h3 class="form-title">基础信息</h3>
						<el-form-item label="活动名称" prop="name">
							<el-input v-model="d.name"></el-input>
						</el-form-item>
						<h3 class="form-title">扩展信息</h3>
						<el-form-item label="活动名称2" prop="name2">
							<el-input v-model="d.name2"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">立即创建</el-button>
							<el-button>取消</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :lg="6">
				<el-card shadow="never" header="3.表单输出">
					<pre>{{data}}</pre>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	//import scCode from '@/components/scCode';

	export default {
		name: 'formRender',
		components: {
			//scCode
		},
		data() {
			return {
				d: {
					name: "",
					name2: ""
				},
				rules: {
					name2: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' }
					]
				},
				data: {
					name: "Activity name",
					checkbox: {
						option1: true
					},
					checkboxGroup: ["option1"],
					select: ["1"],
					select2: "1"
				},
				config2: {
					labelWidth: '130px',
					labelPosition: 'right',
					size: 'medium',
					formItems: [
						{
							label: "Activity name",
							message: "123",
							name: "name",
							value: "123",
							component: "input",
							options: {
								placeholder: "Activity name",
							},
							rules: [
								{required: true, message: "Please input Activity name", trigger: "blur"}
							],
							requiredHandle: "$.required==true",
						},
						{
							label: "Select",
							name: "select",
							value: "",
							component: "select",
							span: 12,
							options: {
								multiple: true,
								items:[
									{
										label: "选项1",
										value: "1"
									},
									{
										label: "选项2",
										value: "2"
									}
								]
							},
							rules: [
								{required: true, message: "Please input Activity name", trigger: "change"}
							],
							requiredHandle: "$.required==true",
						},
						{
							label: "Select2",
							name: "select2",
							value: "",
							component: "select",
							span: 12,
							options: {
								items:[
									{
										label: "选项1",
										value: "1"
									},
									{
										label: "选项2",
										value: "2"
									}
								]
							}
						},
						{
							label: "Checkbox",
							name: "checkbox",
							component: "checkbox",
							span: 12,
							options: {
								items:[
									{
										label: "选项1",
										name: "option1",
										value: false
									},
									{
										label: "选项2",
										name: "option2",
										value: false
									}
								]
							}
						},
						{
							label: "Checkbox group",
							name: "checkboxGroup",
							value: [],
							component: "checkboxGroup",
							span: 12,
							options: {
								items:[
									{
										label: "选项1",
										value: "option1"
									},
									{
										label: "选项2",
										value: "option2"
									}
								]
							}
						},
						{
							label: "Required handle",
							name: "required",
							value: false,
							component: "switch",
						},
						{
							label: "Upload",
							component: "upload",
							options: {
								items:[
									{
										label: "图像1",
										name: "img1",
										value: ""
									},
									{
										label: "图像2",
										name: "img2",
										value: ""
									}
								]
							},
							hideHandle: "$.required==true"
						},
						{
							label: "Date",
							name: "date",
							value: "",
							component: "date",
							options: {
								type: "datetime",
								valueFormat: "YYYY-MM-DD HH:mm:ss",
								defaultTime: new Date(2000, 1, 1, 12, 0, 0),
								shortcuts: [
									{
										text: '今天',
										value: new Date(),
									}
								]
							},
							rules: [
								{required: true, message: "Please input Data", trigger: "change"}
							],
						},
						{
							label: "Number",
							name: "number",
							value: 0,
							component: "number",
						},
						{
							label: "Radio",
							name: "radio",
							value: "",
							component: "radio",
							options: {
								items:[
									{
										label: "选项1",
										value: "1"
									},
									{
										label: "选项2",
										value: "2"
									}
								]
							}
						},
					]
				},
				config: {
					labelWidth: '130px',
					labelPosition: 'right',
					size: 'medium',
					items: [
						{
							label: "Required handle",
							name: "required",
							component: "switch",
							span: 24,
						},
						{
							label: "Hide handle",
							name: "hide",
							component: "switch",
							span: 24,
						},
						{
							label: "Activity name",
							name: "name",
							component: "input",
							span: 24,
							options: {
								placeholder: "Activity name",
							},
							rules: [
								{required: true, message: "Please input Activity name", trigger: "blur"}
							],
							requiredHandle: "$.required==true",
							hideHandle: "$.hide==true"
						},
						{
							label: "Checkbox",
							name: "checkbox",
							component: "checkbox",
							span: 24,
							options: {
								items:[
									{
										label: "选项1",
										value: "option1"
									},
									{
										label: "选项2",
										value: "option2"
									}
								]
							}
						},
						{
							label: "Checkbox group",
							name: "checkboxGroup",
							component: "checkboxGroup",
							span: 24,
							options: {
								items:[
									{
										label: "选项1",
										value: "option1"
									},
									{
										label: "选项2",
										value: "option2"
									}
								]
							}
						},
						// {
						// 	label: "下拉选择",
						// 	name: "type",
						// 	component: "select",
						// 	span: 12,
						// 	options: {
						// 		defaultValue: "",
						// 		placeholder: "请选择",
						// 		options: [
						// 			{
						// 				label: '黄金糕',
						// 				value: '1',
						// 			},
						// 			{
						// 				label: '双皮奶',
						// 				value: '2',
						// 			}
						// 		],
						// 		rules: [
						// 			{
						// 				required: true,
						// 				message: "请输入名称",
						// 				trigger: "blur"
						// 			}
						// 		]
						// 	},
						// 	dynamicHide: "$.switch==true"
						// },
						// {
						// 	label: "下拉多选",
						// 	name: "type2",
						// 	component: "select",
						// 	span: 12,
						// 	options: {
						// 		multiple: true,
						// 		defaultValue: "",
						// 		placeholder: "请选择",
						// 		options: [
						// 			{
						// 				label: '黄金糕',
						// 				value: '1',
						// 			},
						// 			{
						// 				label: '双皮奶',
						// 				value: '2',
						// 			}
						// 		],
						// 		rules: [
						// 			{
						// 				required: true,
						// 				message: "请输入名称",
						// 				trigger: "blur"
						// 			}
						// 		]
						// 	},
						// 	dynamicHide: "$.switch==true",
						// },
						// {
						// 	label: "多选组",
						// 	name: "checkbox",
						// 	component: "checkbox",
						// 	span: 12,
						// 	options: {
						// 		items: [
						// 			{
						// 				label: "选项1",
						// 				value: "1"
						// 			},
						// 			{
						// 				label: "选项2",
						// 				value: "2"
						// 			}
						// 		]
						// 	},
						// 	dynamicHide: "$.switch==true"
						// }
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			onSubmit(){
				this.$refs.formref.validate((valid, obj) => {
					console.log(obj)
					if (valid) {
						alert('submit!')
					}else{
						return false
					}
				})
			}
		}
	}
</script>

<style>
</style>
