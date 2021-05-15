<template>
	<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px" label-position="left">
		<el-form-item label="应用标识" prop="appId">
			<el-input v-model="form.appId" clearable></el-input>
		</el-form-item>
		<el-form-item label="应用名称" prop="appName">
			<el-input v-model="form.appName" clearable></el-input>
		</el-form-item>
		<el-form-item label="秘钥" prop="secret">
			<el-input v-model="form.secret" clearable></el-input>
		</el-form-item>
		<el-form-item label="类型范围" prop="type">
			<el-checkbox-group v-model="form.type">
				<el-checkbox-button label="ALL"></el-checkbox-button>
				<el-checkbox-button label="UPDATA"></el-checkbox-button>
				<el-checkbox-button label="QUERY"></el-checkbox-button>
				<el-checkbox-button label="INSERT"></el-checkbox-button>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="授权至" prop="exp">
			<el-date-picker v-model="form.exp" type="datetime" placeholder="选择日期时间"></el-date-picker>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		props: {
			mode: { type: String, default: "add" }
		},
		data() {
			return {
				//表单数据
				form: {
					id:"",
					appId: "",
					appName: "",
					secret: "",
					type: [],
					exp: ""
				},
				//验证规则
				rules: {
					appId:[
						{required: true, message: '请输入应用标识'}
					],
					appName:[
						{required: true, message: '请输入应用名称'}
					],
					secret:[
						{required: true, message: '请输入秘钥'}
					],
					type:[
						{required: true, message: '请选择类型范围'}
					],
					exp:[
						{required: true, message: '请选择授权到期日期'}
					]
				},
			}
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
				this.form.appId = data.appId
				this.form.appName = data.appName
				this.form.secret = data.secret
				this.form.type = data.type
				this.form.exp = data.exp

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
