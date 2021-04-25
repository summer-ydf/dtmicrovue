<template>
	<el-main>
		<el-row :gutter="15">
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

		<div class="diy-grid-layout">
			<el-row :gutter="15">
				<el-col :span="16">
					 <draggable v-model="grid[0]" :disabled="false" animation="200" handle=".el-card__header" group="people" @end="end" item-key="id">
						<template #item="{ element }">
							<div>
								<el-card shadow="never" :header="element.name">
									<component :is="allComps[element.name]" msg="demo"></component>
								</el-card>
							</div>
						</template>
					</draggable>
				</el-col>
				<el-col :span="8">
					<draggable v-model="grid[1]" animation="200" handle=".el-card__header" group="people" @end="end" item-key="id">
						<template #item="{ element }">
							<div >
								<el-card shadow="never" :header="element.name">
									<component :is="allComps[element.name]" msg="demo"></component>
								</el-card>
							</div>
						</template>
					</draggable>
				</el-col>
			</el-row>
		</div>

		<pre>{{ grid }}</pre>


	</el-main>
</template>

<script>
	import draggable from 'vuedraggable'
	import allComps from './components'
	export default {
		name: "dashboard",
		components: {
			draggable
		},
		data() {
			return {
				allComps: allComps,
				grid:[
					[
						{ name: "C1", id: 1 },
						{ name: "C2", id: 2 }
					],
					[
						{ name: "C3", id: 5 },
						{ name: "C4", id: 6 }
					]
				]
			}
		},
		mounted(){
			console.log("home.vue mounted #57");
		},
		methods: {
			end(){
				console.log("拖动结束");
			}
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

	.diy-grid-layout .el-card {margin-bottom:15px;}
	.sortable-ghost {
	  opacity: 0.5;
	  background: #c8ebfb;
	}
</style>
