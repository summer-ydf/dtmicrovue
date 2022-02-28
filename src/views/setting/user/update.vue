<template>
		<el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
			<el-row class="drawer-table">
				<el-col :span="24">
					<el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
						<el-form-item label="登录账号" prop="username">
							<el-input v-model="form.username" placeholder="请输入登录账号" clearable></el-input>
						</el-form-item>
						<template v-if="mode==='add'">
							<el-form-item label="登录密码" prop="password">
								<el-input type="password" v-model="form.password" placeholder="请输入登录密码" clearable show-password></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="password2">
								<el-input type="password" v-model="form.password2" placeholder="请确认密码" clearable show-password></el-input>
							</el-form-item>
						</template>
						<!--				<el-form-item label="所属角色" prop="group">-->
						<!--					<el-cascader v-model="form.group" :options="groups" :props="groupsProps" :show-all-levels="false" clearable style="width: 100%;"></el-cascader>-->
						<!--				</el-form-item>-->
						<!--				<el-form-item label="头像" prop="avatar">-->
						<!--					<sc-upload v-model="form.avatar" title="上传头像"></sc-upload>-->
						<!--				</el-form-item>-->
<!--						<template>-->
<!--							<el-button @click="visible=false" >取 消</el-button>-->
<!--							<el-button v-if="mode!=='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>-->
<!--						</template>-->
					</el-form>
				</el-col>
				<el-row class="drawer-footer">
					<el-col :span="24">
						<el-button @click="visible=false" size="small">取 消</el-button>
						<el-button type="primary" size="small">保 存</el-button>
					</el-col>
				</el-row>
			</el-row>


		</el-drawer>
</template>

<script>
	export default {
		name: "update.vue",
		data() {
			return {
				visible: false,
				isSaveing: false,
				mode: "add",
				titleMap: {
					add: '新增用户',
					edit: '编辑用户',
					show: '查看'
				},
				//表单数据
				form: {
					id:"",
					username: "",
					avatar: "",
					name: "",
					group: ""
				},
				//验证规则
				rules: {
					avatar:[
						{required: true, message: '请上传头像'}
					],
					username: [
						{required: true, message: '请输入登录账号'}
					],
					name: [
						{required: true, message: '请输入真实姓名'}
					],
					password: [
						{required: true, message: '请输入登录密码'},
						{validator: (rule, value, callback) => {
								if (this.form.password2 !== '') {
									this.$refs.dialogForm.validateField('password2');
								}
								callback();
							}}
					],
					password2: [
						{required: true, message: '请再次输入密码'},
						{validator: (rule, value, callback) => {
								if (value !== this.form.password) {
									callback(new Error('两次输入密码不一致!'));
								}else{
									callback();
								}
							}}
					],
					group: [
						{required: true, message: '请选择所属角色'}
					]
				},
			}
		},
		methods: {
			//显示
			open(mode = 'add') {
				this.mode = mode;
				this.visible = true;
				return this
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						var res = await this.$API.demo.post.post(this.form);
						this.isSaveing = false;
						if(res.code === 2000){
							this.$emit('success', this.form, this.mode)
							this.visible = false;
							this.$message.success("操作成功")
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
					}else{
						return false;
					}
				})
			},
		}
	}
</script>

<style scoped>

</style>
