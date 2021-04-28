<template>

	<div class="login_container">
		<div class="login_body">
			<div class="login-sidebox">
				<div class="login-logo">
					<i class="el-icon-platform-eleme"></i>SCUI
				</div>
				<div class="login-title">
					<h2>面面俱到的中后台前端框架</h2>
					<p>基于Vue 3.0 + Vue-Router 4.0 + Element-Plus + VueX + Axios 后台管理系统前端框架。</p>
				</div>
			</div>
			<div class="login-form">
				<h2>登录</h2>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" size="large">
					<el-form-item prop="user">
						<el-input v-model="ruleForm.user" prefix-icon="el-icon-user" clearable placeholder="用户名 / 手机 / 邮箱"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" clearable show-password placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item style="margin-bottom: 10px;">
						<el-checkbox label="记住我" v-model="ruleForm.autologin"></el-checkbox>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" style="width: 100%;" @click="submitForm('ruleForm')" round>登 录</el-button>
					</el-form-item>
				</el-form>

				<el-divider><i class="el-icon-mobile-phone"></i></el-divider>

				<div class="login-oauth">
					<el-button size="medium" type="primary" icon="el-icon-platform-eleme" circle></el-button>
					<el-button size="medium" type="success" icon="el-icon-s-goods" circle></el-button>
					<el-button size="medium" type="info" icon="el-icon-s-promotion" circle></el-button>
					<el-button size="medium" type="warning" icon="el-icon-menu" circle></el-button>
				</div>
			</div>
		</div>
		<div class="login-footer">© SCUI</div>
	</div>

</template>

<style scoped>
	.login_container {position: absolute;top:50%;left:50%;width: 900px;margin: 0 auto;z-index: 1;transform: translate(-50%, -50%);}
	.login_body {width: inherit;display: flex;box-shadow: 0px 20px 80px 0px rgba(0,0,0,0.3);}
	.login-sidebox {width: 50%;background:url(/images/login-left.png) 0 0 no-repeat #607089;padding: 60px;color: #fff;position: relative;}

	.login-sidebox

	.login-logo {font-size: 35px;}
	.login-logo i {margin-right: 10px;}

	.login-title {margin-top: 20px;}
	.login-title h2 {font-size: 22px;font-weight: normal;}
	.login-title p {font-size: 12px;margin-top:40px;line-height: 1.8;color: rgba(255,255,255,0.8);}

	.login-form {width: 50%;padding: 60px;background: #fff;}
	.login-form h2 {font-size: 24px;color: #40485b;margin-bottom: 25px;}
	.login-oauth {display: flex;justify-content:space-around;}
	.login-form .el-divider {margin-top:40px;}

	.login-footer {text-align: center;color: #999;margin-top: 50px;}
</style>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					user: "admin",
					password: "admin",
					autologin: false
				},
				rules: {
					user: [
						{required: true, message: '请输入用户名', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'}
					]
				}
			}
		},
		created: function() {
			this.$TOOL.data.remove("user")
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.login()
					}else{
						console.log('error submit!!');
						return false;
					}
				})
			},
			login: async function() {
				var userInfo = await this.$API.user.info.get();
				this.$TOOL.data.set("user", userInfo.data);
				this.$router.replace({
					path: '/'
				});
				//开启欢迎词
				this.$message.success("Login Success 登录成功")
			}
		}
	}
</script>
