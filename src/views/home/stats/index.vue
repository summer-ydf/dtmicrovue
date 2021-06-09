<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :span="24">
				<el-card shadow="never">
					<div class="welTop">
						<div class="icon">
							<el-avatar :size="60" src="img/avatar.jpg"></el-avatar>
						</div>
						<div class="main">
							<h2>嗨~ admin，忙碌了一上午，记得吃午饭哦。</h2>
							<p>最近更新：动态面包屑，外部链接，Iframe链接等</p>
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

		<el-row :gutter="15">
			<el-col :span="24">
				<el-card shadow="never" header="当前用户权限">
					<el-tag v-if="$HAS('user.add')">user.add</el-tag>
					<el-tag v-if="$HAS('user.edit')">user.edit</el-tag>
					<el-tag v-if="$HAS('user.delete')">user.delete</el-tag>
					<el-tag v-if="$HAS('list.add')">list.add</el-tag>
					<el-tag v-if="$HAS('list.edit')">list.edit</el-tag>
					<el-tag v-if="$HAS('list.delete')">list.delete</el-tag>
				</el-card>
			</el-col>
		</el-row>

		<gridLayout></gridLayout>

	</el-main>
</template>

<script>
	import gridLayout from './gridLayout'
	export default {
		name: "dashboard",
		components: {
			gridLayout
		},
		data() {
			return {}
		},
		mounted(){

		},
		methods: {

		}

	}
</script>

<style scoped>
	.el-row {margin-bottom:15px;}
	.el-tag+.el-tag {margin-left: 10px;}


	.welTop {display: flex;}
	.welTop .main {margin-left:20px;}
	.welTop .main h2 {font-size: 20px;color: #3c4a54;}
	.welTop .main p {color: #999;margin-top:10px;line-height: 1.8;}
	.welTop .icons {margin-left:auto;text-align: center;}
	.welTop .icons p {font-size: 12px;}
	.avatar-list .avatar {margin-left: -10px;border: 3px solid #fff;cursor: pointer;}

</style>
