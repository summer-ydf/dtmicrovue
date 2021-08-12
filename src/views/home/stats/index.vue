<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :span="24">
				<el-card shadow="never" style="margin-bottom: 15px;">
					<div class="welTop">
						<div class="icon">
							<el-avatar :size="60" src="img/avatar.jpg"></el-avatar>
						</div>
						<div class="main">
							<h2>欢迎体验SCUI</h2>
							<p>高性能 / 精致 / 优雅。基于Vue3 + Element-Plus 的中后台前端解决方案，如果喜欢就点个星星支持一下。</p>
                            <p>
								<a href='https://gitee.com/lolicode/scui' target="_blank">
									<img src='https://gitee.com/lolicode/scui/badge/star.svg?theme=dark' alt='star' style="vertical-align: middle">
								</a>
							</p>
						</div>
						<div class="icons hidden-sm-and-down">
							<div class="avatar-list">
								<el-tooltip content="Sakuya" placement="top">
									<el-avatar class="avatar" :size="30" src="img/avatar.jpg"></el-avatar>
								</el-tooltip>
								<el-tooltip content="Lolowan" placement="top">
									<el-avatar class="avatar" :size="30" src="img/avatar2.gif"></el-avatar>
								</el-tooltip>
								<el-tooltip content="Ali" placement="top">
									<el-avatar class="avatar" :size="30" src="img/avatar3.gif"></el-avatar>
								</el-tooltip>
							</div>
							<p>Participants</p>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<div class="data-box">
			<el-row :gutter="15">
				<el-col :md="8" :xs="24">
					<el-card shadow="never" class="item-background">
						<div class="item">
							<div class="main">
								<h2>今日收入</h2>
								<h4>¥1.9K</h4>
								<p><span class="down"><i class="el-icon-bottom"></i>-18.9%</span> 比昨日</p>
							</div>
							<div class="icon">
								<i class="el-icon-data-analysis"></i>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :md="8" :xs="24">
					<el-card shadow="never">
						<div class="item">
							<div class="main">
								<h2>会员总数</h2>
								<h4>68</h4>
								<p><span class="up"><i class="el-icon-top"></i>+1.9%</span> 比昨日</p>
							</div>
							<div class="icon">
								<i class="el-icon-user"></i>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :md="8" :xs="24">
					<el-card shadow="never">
						<div class="item">
							<div class="main">
								<h2>今日访客</h2>
								<h4>108</h4>
								<p><span class="up"><i class="el-icon-top"></i>+7.7%</span> 比昨日</p>
							</div>
							<div class="icon">
								<el-progress type="dashboard" :percentage="25" :width="50"></el-progress>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>

		<gridLayout></gridLayout>

	</el-main>
</template>

<script>
	import gridLayout from './gridLayout'
	export default {
		components: {
			gridLayout
		},
		data() {
			return {}
		},
		mounted(){
			this.$emit('on-mounted')
		},
		methods: {

		}

	}
</script>

<style scoped>
	.el-row {}
	.el-tag+.el-tag {margin-left: 10px;}


	.welTop {display: flex;}
	.welTop .main {margin-left:20px;}
	.welTop .main h2 {font-size: 20px;color: #3c4a54;}
	.welTop .main p {color: #999;margin-top:10px;line-height: 1.8;}
	.welTop .icons {margin-left:auto;text-align: center;}
	.welTop .icons p {font-size: 12px;}
	.avatar-list .avatar {margin-left: -10px;border: 3px solid #fff;cursor: pointer;}

	.data-box {}
	.data-box .el-card {margin-bottom: 15px;}
	.data-box .item-background {background: #409EFF;color: #fff;}
	.data-box .item-background .item h2 {color: #fff;}
	.data-box .item-background .item p {color: rgba(255, 255, 255, 0.5);}
	.data-box .item-background .item .icon i {background: rgba(255, 255, 255, 0.2);}
	.data-box .item {display: flex;}
	.data-box .item h2 {font-size: 12px;color: #999;font-weight: normal;}
	.data-box .item h4 {font-size: 25px;margin:5px 0 5px 0;}
	.data-box .item p {font-size: 12px;color: #999;}
	.data-box .item .icon {margin-left: auto;display: flex;align-items: center;margin-right: 10px;}
	.data-box .item .icon i {font-size: 18px;background: #409EFF;color: #fff;border-radius: 50%;width:32px;height: 32px;display: flex;align-items: center;justify-content: center;}
	.data-box .item p span.up {color: #F56C6C;}
	.data-box .item p span.down {color: #67C23A;}
	
	[data-theme='dark'] .welTop .main h2 {color: var(--el-text-color-regular);}
</style>
