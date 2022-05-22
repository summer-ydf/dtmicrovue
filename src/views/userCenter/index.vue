<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="24">
				<el-card shadow="never">
					<el-tabs tab-position="top">
						<el-tab-pane :label="$t('user.info')">
							<el-form ref="form" :model="form" label-width="80px" style="width: 460px;margin-top:20px;">
								<el-form-item label="登录账号">
									<el-input v-model="form.username" disabled></el-input>
									<div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
								</el-form-item>
								<el-form-item label="真实姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
                                <el-form-item label="电话号码">
                                    <el-input v-model="form.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="form.idno"></el-input>
                                </el-form-item>
                                <el-form-item label="openid">
                                    <el-input v-model="form.openid"></el-input>
                                </el-form-item>
								<el-form-item>
									<el-button type="primary" @click="submit()">保存</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane :label="$t('user.settings')">
							<el-form ref="form" :model="form" label-width="120px" style="margin-top:20px;">
								<el-form-item :label="$t('user.nightmode')">
									<el-switch v-model="config.theme" active-value="dark" inactive-value="default" inline-prompt active-icon="el-icon-moon" inactive-icon="el-icon-sunny"></el-switch>
									<div class="el-form-item-msg">{{ $t('user.nightmode_msg') }}</div>
								</el-form-item>
								<el-form-item label="主题颜色">
									<el-color-picker v-model="config.colorPrimary" :predefine="colorList">></el-color-picker>
								</el-form-item>
								<el-form-item :label="$t('user.language')">
									<el-select v-model="config.lang">
										<el-option label="简体中文" value="zh-cn"></el-option>
										<el-option label="English" value="en"></el-option>
										<el-option label="日本語" value="ja"></el-option>
									</el-select>
									<div class="el-form-item-msg">{{ $t('user.language_msg') }}</div>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import colorTool from '@/utils/color'

	export default {
		name: 'userCenter',
		data() {
			return {
				form: {
					id: "",
                    username: "",
					name: "",
                    mobile: "",
                    idno: "",
                    openid: ""
				},
				colorList: ['#409EFF', '#009688', '#536dfe', '#ff5c93', '#c62f2f', '#fd726d'],
				config: {
					lang: this.$TOOL.data.get('APP_LANG') || this.$CONFIG.LANG,
					theme: this.$TOOL.data.get('APP_THEME') || 'default',
					colorPrimary: this.$TOOL.data.get('APP_COLOR') || this.$CONFIG.COLOR || '#409EFF'
				}
			}
		},
		watch:{
			'config.theme'(val){
				document.body.setAttribute('data-theme', val)
				this.$TOOL.data.set("APP_THEME", val);
			},
			'config.lang'(val){
				this.$i18n.locale = val
				this.$TOOL.data.set("APP_LANG", val);
			},
			'config.colorPrimary'(val){
				document.documentElement.style.setProperty('--el-color-primary', val);
				for (let i = 1; i <= 9; i++) {
					document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(val,i/10));
				}
				document.documentElement.style.setProperty(`--el-color-primary-darken-1`, colorTool.darken(val,0.1));
				this.$TOOL.data.set("APP_COLOR", val);
			}
		},
        created() {
            let userInfo = this.$TOOL.data.get("USER_INFO");
		    this.getUser(userInfo.userid)
        },
        methods: {
		    // 获取个人信息
            async getUser(v) {
                var res = await this.$API.system.user.getById.get(v);
                if (res.code === 2000) {
                    this.form = res.data
                }
            },
            // 表单提交方法
            async submit() {
                this.saveLoading = true;
                var res = await this.$API.system.user.updateMyInfo.post(this.form);
                this.saveLoading = false;
                if (res.code === 2000) {
                    this.visible = false;
                    this.$message.success(res.message)
                } else {
                    this.$alert(res.message, "提示", {type: 'error'})
                }
            },
		}
	}
</script>

<style scoped>
	.el-card {margin-bottom:15px;}
	.activity-item {font-size: 13px;color: #999;display: flex;align-items: center;}
	.activity-item label {color: #333;margin-right:10px;}
	.activity-item .el-avatar {margin-right:10px;}
	.activity-item .el-tag {margin-right:10px;}

	[data-theme='dark'] .user-info-bottom {border-color: var(--el-border-color-base);}
	[data-theme='dark'] .activity-item label {color: #999;}
</style>
