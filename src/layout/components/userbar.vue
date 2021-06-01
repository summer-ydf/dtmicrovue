<template>
	<div class="user-bar">
		<div class="screen panel-item hidden-sm-and-down" @click="screen">
			<i class="el-icon-full-screen"></i>
		</div>
		<el-popover placement="bottom" :width="360" trigger="click">
			<template #reference>
				<div class="msg panel-item">
					<el-badge :hidden="msgList.length==0" :value="msgList.length" class="badge" type="danger">
						<i class="el-icon-bell"></i>
					</el-badge>
				</div>
			</template>
			<div>
				<el-empty v-if="msgList.length==0" description="暂无新消息"></el-empty>
				<div v-else class="msgList">
					<header>
						<label>通知</label>
						<el-link :underline="false" href="javascript:void(0);" @click="markRead">全部标记已读</el-link>
					</header>
					<ul>
						<el-scrollbar>
							<li v-for="item in msgList" v-bind:key="item.id">
								<a :href="item.link" target="_blank">
									<h2>{{item.title}}</h2>
									<p>{{item.describe}}</p>
								</a>
							</li>
						</el-scrollbar>
					</ul>
					<footer><el-link :underline="false" href="https://gitee.com/lolicode/scui" target="_blank">前往通知中心</el-link></footer>
				</div>
			</div>
		</el-popover>
		<el-dropdown trigger="click" @command="handleUser" style="height: 100%;">
			<div class="user panel-item">
				<el-avatar :size="30">{{ userNameF }}</el-avatar>
				<label>{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i></label>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="uc">个人设置</el-dropdown-item>
					<el-dropdown-item command="cmd">CMD</el-dropdown-item>
					<el-dropdown-item divided command="outLogin">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				userName: "",
				userNameF: "",
				msgList: [
					{
						id: 1,
						title: "关于版本发布的通知",
						describe: "点进去Gitee获取最新开源版本",
						link: "https://gitee.com/lolicode/scui"
					},
					{
						id: 2,
						title: "感谢登录SCUI Admin",
						describe: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
						link: "https://gitee.com/lolicode/scui"
					}
				]
			}
		},
		created() {
			var userInfo = this.$TOOL.data.get("user").userInfo;
			this.userName = userInfo.userName;
			this.userNameF = this.userName.substring(0,1);
		},
		methods: {
			//个人信息
			handleUser(command) {
				if(command == "uc"){
					this.$router.push({path: '/usercenter'});
				}
				if(command == "outLogin"){
					this.$router.replace({path: '/login'});
				}
				if(command == "cmd"){
					this.$router.push({path: '/cmd'});
				}
			},
			//全屏
			screen(){
				var element = document.documentElement;
				this.$TOOL.screen(element)
			},
			//标记已读
			markRead(){
				this.msgList = []
			}
		}
	}
</script>

<style scoped>
	.user-bar {display: flex;align-items: center;height: 100%;}
	.user-bar .panel-item {padding: 0 10px;cursor: pointer;height: 100%;display: flex;align-items: center;}
	.user-bar .panel-item i {font-size: 16px;}
	.user-bar .panel-item:hover {background: rgba(0, 0, 0, 0.1);}
	.user-bar .user {display: flex;align-items: center;}
	.user-bar .user label {display: inline-block;margin-left:5px;font-size: 12px;cursor:pointer;}

	.msgList header {height:35px;line-height: 35px;display: flex;justify-content: space-between;}
	.msgList footer {height:35px;line-height: 35px;text-align:center;}
	.msgList ul {height:180px;border-top: 1px solid #eee;border-bottom: 1px solid #eee;}
	.msgList ul li a {display: inline-block;width: 100%;height: 100%;padding:10px;border: 1px solid transparent;cursor:pointer;}
	.msgList ul li h2 {font-size: 14px;font-weight: normal;line-height: 1.8;}
	.msgList ul li h2 i {margin-right: 10px;}
	.msgList ul li p {font-size: 12px;color: #999;line-height: 1.8;}
	.msgList ul li a:hover {background: #ecf5ff;border-top: 1px solid #d9ecff;border-bottom: 1px solid #d9ecff;}
	.msgList ul li a:hover h2 {color: #409EFF;}
</style>
