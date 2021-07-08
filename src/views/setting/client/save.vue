<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close>
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
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增APP',
					edit: '编辑APP'
				},
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
				visible: false,
				isSaveing: false,
				pData: {}
			}
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
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						var res = await this.$API.user.save.post(this.form);
						this.isSaveing = false;
						if(res.code == 200){
							this.visible = false;
							if(this.mode == 'add'){
								//
							}else if(this.mode == 'edit'){
								Object.assign(this.pData, this.form)
							}
							this.$message.success("操作成功")
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
					}
				})
			},
			//表单注入数据
			setData(data){
				this.pData = data
				this.form.id = data.id
				this.form.appId = data.appId
				this.form.appName = data.appName
				this.form.secret = data.secret
				this.form.type = data.type
				this.form.exp = data.exp
			}
		}
	}
</script>

<style>
</style>
