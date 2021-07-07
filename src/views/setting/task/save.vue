<!--
 * @Descripttion: 系统计划任务配置
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月7日09:28:32
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-form :model="form" :rules="rules" ref="dialogForm" label-width="100px" label-position="left">
		<el-form-item label="描述" prop="title">
			<el-input v-model="form.title" clearable></el-input>
		</el-form-item>
		<el-form-item label="执行类" prop="handler">
			<el-input v-model="form.handler" clearable></el-input>
		</el-form-item>
		<el-form-item label="定时规则" prop="cron">
			<el-input v-model="form.cron" clearable></el-input>
		</el-form-item>
		<el-form-item label="状态" prop="state">
			<el-switch v-model="form.state" active-value="1" inactive-value="-1"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id:"",
					title: "",
					handler: "",
					cron: "",
					state: "1"
				},
				rules: {
					title:[
						{required: true, message: '请填写标题'}
					],
					handler:[
						{required: true, message: '请填写执行类'}
					],
					cron:[
						{required: true, message: '请填写定时规则'}
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			//表单提交方法
			submit(callback){
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
						callback(this.form)
					}else{
						return false;
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.title = data.title
				this.form.handler = data.handler
				this.form.cron = data.cron
				this.form.state = data.state
			}
		}
	}
</script>

<style>
</style>
