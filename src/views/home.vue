<template>
	<el-row>
		<el-col :span="24">
			<el-card shadow="never">
				<div class="welTop">
					<div class="icon">
						<el-avatar :size="60" src="images/avatar.jpg"></el-avatar>
					</div>
					<div class="main">
						<h2>嗨~ admin，忙碌了一上午，记得吃午饭哦。</h2>
						<p>最近更新：动态面包屑，外部链接，Iframe链接等</p>
					</div>
					<div class="icons">
						<div class="avatar-list">
							<el-tooltip content="Sakuya" placement="top">
								<el-avatar class="avatar" :size="30" src="images/avatar.jpg"></el-avatar>
							</el-tooltip>
							<el-tooltip content="Lolowan" placement="top">
								<el-avatar class="avatar" :size="30" src="images/avatar2.gif"></el-avatar>
							</el-tooltip>
							<el-tooltip content="Ali" placement="top">
								<el-avatar class="avatar" :size="30" src="images/avatar3.gif"></el-avatar>
							</el-tooltip>
						</div>
						<p>Participants</p>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
</script>

<style scoped>
	.welTop {display: flex;}
	.welTop .main {margin-left:20px;}
	.welTop .main h2 {font-size: 20px;color: #3c4a54;}
	.welTop .main p {color: #999;margin-top:10px;line-height: 1.8;}
	.welTop .icons {margin-left:auto;text-align: center;}
	.welTop .icons p {font-size: 12px;}
	.avatar-list .avatar {margin-left: -10px;border: 3px solid #fff;cursor: pointer;}
</style>
