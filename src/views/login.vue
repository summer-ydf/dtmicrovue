<template>

	<div class="login_container">
		<div class="login_body">
			<div class="login-sidebox">
				<div class="login-logo">
					<img class="logo" :alt="appName" src="@/assets/logo.png">{{appName}}
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
						<el-dropdown  style="width: 100%;">
							<el-button type="primary" style="width: 100%;" :loading="islogin" round>登 录<i class="el-icon-arrow-down el-icon--right"></i></el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="submitForm('ruleForm', 'admin')">
										<div class="demo-user-item">
											<div class="icon">
												<el-avatar src="img/avatar.jpg"></el-avatar>
											</div>
											<div class="info">
												<h2>Sakuya</h2>
												<p>超级管理员(Administrator)</p>
											</div>
										</div>
									</el-dropdown-item>
									<el-dropdown-item @click="submitForm('ruleForm', 'user')">
										<div class="demo-user-item">
											<div class="icon">
												<el-avatar src="img/avatar2.gif"></el-avatar>
											</div>
											<div class="info">
												<h2>Lolowan</h2>
												<p>普通用户(User)</p>
											</div>
										</div>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
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
		<div class="login-footer">© {{appName}} {{appVar}}</div>
	</div>

</template>

<style scoped>
	.login_container {position: absolute;top:50%;left:50%;width: 900px;margin: 0 auto;z-index: 1;transform: translate(-50%, -50%);}
	.login_body {width: inherit;display: flex;box-shadow: 0px 20px 80px 0px rgba(0,0,0,0.3);}
	.login-sidebox {width: 50%;background:url(~@/assets/login-left.png) 0 0 no-repeat #607089;padding: 60px;color: #fff;position: relative;}

	.login-logo {font-size: 35px;display: flex;align-items: center;}
	.login-logo .logo {margin-right: 10px;width: 50px;height: 50px;}

	.login-title {margin-top: 20px;}
	.login-title h2 {font-size: 22px;font-weight: normal;}
	.login-title p {font-size: 12px;margin-top:40px;line-height: 1.8;color: rgba(255,255,255,0.8);}

	.login-form {width: 50%;padding: 60px;background: #fff;}
	.login-form h2 {font-size: 24px;color: #40485b;margin-bottom: 25px;}
	.login-oauth {display: flex;justify-content:space-around;}
	.login-form .el-divider {margin-top:40px;}

	.login-footer {text-align: center;color: #999;margin-top: 50px;}

	.demo-user-item {display: flex;align-items: center;line-height: 1;padding:10px 0;}
	.demo-user-item .icon {margin-right: 20px;}
	.demo-user-item .info h2 {font-size: 14px;}
	.demo-user-item .info p {color: #666;margin-top: 6px;}

	@media (max-height: 650px){
	.login_container {position: static;transform: none;margin:50px auto;}
	}
</style>

<script>
	export default {
		data() {
			return {
				appName: this.$CONFIG.APP_NAME,
				appVar: this.$CONFIG.APP_VER,
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
				},
				islogin: false
			}
		},
		created: function() {
			this.$TOOL.data.remove("user")
		},
		methods: {
			submitForm(formName, type) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						type=='admin' && this.login()
						type=='user' && this.login_demo()
					}else{
						console.log('error submit!!');
						return false;
					}
				})
			},
			login: async function() {
				this.islogin = true;
				var userInfo = await this.$API.user.login.get();
				this.$TOOL.data.set("user", userInfo.data);
				this.$router.replace({
					path: '/'
				});
				//开启欢迎词
				this.$message.success("Login Success 登录成功")
			},
			login_demo: async function() {
				this.islogin = true;
				var userInfo = await this.$API.user.login_demo.get();
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
