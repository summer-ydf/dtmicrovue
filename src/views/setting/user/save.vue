<template>
	<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item label="头像" prop="avatar">
					<sc-upload v-model="form.avatar" title="上传头像" :action="uploadUrl"></sc-upload>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="登录账号" prop="userName">
					<el-input v-model="form.userName" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="登录密码" prop="password">
					<el-input v-model="form.password" clearable></el-input>
					<div v-if="mode=='edit'" class="el-form-item-msg">如不修改密码，可为空</div>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="确认密码" prop="password2">
					<el-input v-model="form.password2" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="所属角色" prop="group">
					<el-cascader v-model="form.group" :options="groups" :props="groupsProps" :show-all-levels="false" clearable></el-cascader>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default {
		props: {
			mode: { type: String, default: "add" }
		},
		data() {
			return {
				uploadUrl: this.$API.demo.upload.url,
				//表单数据
				form: {
					id:"",
					userName: "",
					avatar: "",
					name: "",
					group: ""
				},
				//验证规则
				rules: {
					avatar:[
						{required: true, message: '请上传头像'}
					],
					userName: [
						{required: true, message: '请输入登录账号'}
					],
					name: [
						{required: true, message: '请输入真实姓名'}
					],
					password: [
						{required: true, message: '请输入登录密码'},
						{validator: () => {
							if (this.form.password2 !== '') {
								this.$refs.dialogForm.validateField('password2');
							}
						}}
					],
					password2: [
						{required: true, message: '请再次输入密码'},
						{validator: (value, callback) => {
							if (value !== this.form.password) {
								callback(new Error('两次输入密码不一致!'));
							}
						}}
					],
					group: [
						{required: true, message: '请选择所属角色'}
					]
				},
				//所需数据选项
				groups: [],
				groupsProps: {
					value: "id",
					multiple: true,
					checkStrictly: true
				}
			}
		},
		mounted() {
			if(this.mode != 'add'){
				this.rules.password = []
				this.rules.password2 = []
			}
			this.getGroup()
		},
		methods: {
			//加载树数据
			async getGroup(){
				var res = await this.$API.role.select.get();
				this.groups = res.data;
			},
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
				this.form.userName = data.userName
				this.form.avatar = data.avatar
				this.form.name = data.name
				this.form.group = data.group

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
