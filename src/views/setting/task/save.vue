<!--
 * @Descripttion: 系统计划任务配置
 * @version: 1.1
 * @Author: sakuya
 * @Date: 2021年7月7日09:28:32
 * @LastEditors: sakuya
 * @LastEditTime: 2021年7月8日22:15:13
-->

<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="400" destroy-on-close>
		<el-form :model="form" :rules="rules" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="描述" prop="title">
				<el-input v-model="form.title" placeholder="计划任务标题" clearable></el-input>
			</el-form-item>
			<el-form-item label="执行类" prop="handler">
				<el-input v-model="form.handler" placeholder="计划任务执行类名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="定时规则" prop="cron">
				<el-input v-model="form.cron" placeholder="请输入Cron定时规则" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否启用" prop="state">
				<el-switch v-model="form.state" active-value="1" inactive-value="-1"></el-switch>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		inject: ['list'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增计划任务',
					edit: '编辑计划任务'
				},
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
				},
				visible: false,
				isSaveing: false,
			}
		},
		mounted() {

		},
		methods: {
			//显示
			show(mode='add'){
				this.mode = mode;
				this.visible = true;
				this.form = this.$options.data().form
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
						this.isSaveing = true;
						setTimeout(()=>{
							this.isSaveing = false;
							this.visible = false;
							this.$message.success("操作成功")
							if(this.mode == 'add'){
								var newItem = {...this.form}
								newItem.id = new Date().getTime()
								this.list.push(newItem)
							}else if(this.mode == 'edit'){
								this.list.filter(item => item.id===this.form.id ).forEach(item => {
									Object.assign(item, this.form)
								})
							}
						},1000)
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
