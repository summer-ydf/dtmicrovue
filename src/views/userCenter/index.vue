<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="user-info">
						<div class="user-info-top">
							<el-avatar :size="80" src="img/avatar.jpg"></el-avatar>
							<h2>{{ form.name||'-' }}</h2>
							<p>{{ form.about||'无签名' }}</p>
							<el-button type="primary" round icon="el-icon-collection-tag" size="medium">Administrator</el-button>
						</div>
						<div class="user-info-main">
							<ul>
								<li><label><i class="el-icon-user"></i></label><span>81883387@qq.com</span></li>
								<li><label><i class="el-icon-present"></i></label><span>1988-05-07</span></li>
								<li><label><i class="el-icon-male"></i></label><span>男</span></li>
								<li><label><i class="el-icon-location-outline"></i></label><span>中国/上海/金山</span></li>
								<li><label><i class="el-icon-office-building"></i></label><span>集团/上海分公司/软件研发部/摸鱼组</span></li>
								<li><label><i class="el-icon-coin"></i></label><span>超级管理员</span></li>
							</ul>
						</div>
						<div class="user-info-bottom">
							<h2>标签</h2>
							<el-space wrap>
								<el-tag>HTML</el-tag>
								<el-tag>CSS</el-tag>
								<el-tag>JavaScript</el-tag>
								<el-tag>NodeJs</el-tag>
								<el-tag>Vue</el-tag>
								<el-tag>Photoshop</el-tag>
							</el-space>
							<h2>当前账号权限</h2>
							<el-space wrap>
								<el-tag v-if="$HAS('user.add')">user.add</el-tag>
								<el-tag v-if="$HAS('user.edit')">user.edit</el-tag>
								<el-tag v-if="$HAS('user.delete')">user.delete</el-tag>
								<el-tag v-if="$HAS('list.add')">list.add</el-tag>
								<el-tag v-if="$HAS('list.edit')">list.edit</el-tag>
								<el-tag v-if="$HAS('list.delete')">list.delete</el-tag>
							</el-space>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :lg="16">
				<el-card shadow="never">
					<el-tabs tab-position="top">
						<el-tab-pane label="基本信息">
							<el-form ref="form" :model="form" label-width="80px" style="width: 460px;margin-top:20px;">
								<el-form-item label="账号">
									<el-input v-model="form.user" disabled></el-input>
									<div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
								</el-form-item>
								<el-form-item label="姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
								<el-form-item label="性别">
									<el-select v-model="form.sex" placeholder="请选择">
										<el-option label="保密" value="0"></el-option>
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="2"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="个性签名">
									<el-input v-model="form.about" type="textarea"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="个人设置">
							<el-form ref="form" :model="form" label-width="120px" style="width: 460px;margin-top:20px;">
								<el-form-item label="布局">
									<el-select v-model="config.theme" placeholder="请选择">
										<el-option label="常规" value="0"></el-option>
										<el-option label="分栏" value="1"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="控制台自由布局">
									<el-switch v-model="config.diy"></el-switch>
								</el-form-item>
								<el-form-item label="多标签">
									<el-switch v-model="config.tags"></el-switch>
								</el-form-item>
								<el-form-item label="系统通知">
									<el-switch v-model="config.msg"></el-switch>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
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
	export default {
		name: 'userCenter',
		data() {
			return {
				form: {
					user: "81883387@qq.com",
					name: "Sakuya",
					sex: "1",
					about: "正所谓富贵险中求"
				},
				config: {
					theme: '1',
					diy: true,
					tags: true,
					msg: true
				}
			}
		}
	}
</script>

<style>
</style>
