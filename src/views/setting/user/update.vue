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
						<el-form-item label="使用范围" prop="scope">
							<el-radio-group v-model="form.scope">
								<el-radio label="web">PC端</el-radio>
								<el-radio label="app">手机端</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="所属角色" prop="roleIds">
							<el-select v-model="form.roleIds" multiple placeholder="请选择用户角色">
								<el-option
									v-for="item in roles"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="头像" prop="avatar">
							<sc-upload v-model="form.avatar" title="上传头像"></sc-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-row class="drawer-footer">
					<el-col :span="24">
						<el-button @click="visible=false" size="small">取 消</el-button>
						<el-button v-if="mode!=='show'" :loading="isSaveing" @click="submit()" type="primary" size="small">保 存</el-button>
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
					password: "",
					avatar: "",
					scope: "",
					roleIds: []
				},
				//角色数据
				roles:[],
				//验证规则
				rules: {
					username: [
						{required: true, message: '请输入登录账号'}
					],
					scope: [
						{required: true, message: '请输入使用范围'}
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
					roleIds: [
						{required: true, message: '请选择所属角色',trigger: 'blur'}
					]
				},
			}
		},
		mounted() {
			this.getRole()
		},
		methods: {
			//显示
			open(mode = 'add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//获取角色信息
			async getRole(){
				var res = await this.$API.system.role.findAll.get();
				this.roles = res.data;
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						this.form.roleIds = this.form.roleIds.join(',')
						var res = await this.$API.system.user.save.post(this.form);
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
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.username = data.username
				this.form.avatar = data.avatar
				this.form.scope = data.scope
				// 字符串数组，改成数值数组
				this.form.roleIds = data.roleIds.split(',').map(Number)

				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
				console.log("form=========")
				console.log(data.roleIds.split(',').map(Number))
			}
		}
	}
</script>

<style scoped>

</style>
