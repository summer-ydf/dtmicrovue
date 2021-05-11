<template>
	<div class="adminui-header">
		<div class="left-panel">
			<div v-if="ismobile" class="mobile-nav-icon panel-item" @click="mobileNav">
				<i class="el-icon-menu"></i>
			</div>
			<el-breadcrumb v-if="!ismobile" separator-class="el-icon-arrow-right">
				<template v-for="(item) in breadList" v-bind:key="item" >
					<el-breadcrumb-item v-if="item.path !='/'"><i v-if="item.meta&&item.meta.icon" :class="item.meta.icon || 'el-icon-menu'"></i>{{item.meta.title}}</el-breadcrumb-item>
				</template>
			</el-breadcrumb>
		</div>
		<div class="center-panel">

		</div>
		<div class="right-panel">
			<div class="screen panel-item" @click="screen">
				<i class="el-icon-full-screen"></i>
			</div>
			<div class="setting panel-item">
				<i class="el-icon-setting"></i>
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
			<el-dropdown trigger="click" @command="handleUser">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				breadList: [],
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
			this.getBreadcrumb();
		},
		computed:{
			ismobile(){
				return this.$store.state.global.ismobile
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
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
			getBreadcrumb(){
				let matched = this.$route.matched;
				this.breadList = matched;
			},
			//全屏
			screen(){
				var element = document.documentElement;
				this.$TOOL.screen(element)
			},
			//标记已读
			markRead(){
				this.msgList = []
			},
			//移动端打开菜单，暴露父组件事件
			mobileNav(){
				this.$emit('mobile-nav')
			}
		}
	}
</script>
