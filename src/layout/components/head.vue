<template>
	<div class="adminui-header">
		<div class="left-panel">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<template v-for="(item) in breadList" v-bind:key="item" >
					<el-breadcrumb-item v-if="item.path !='/'"><i v-if="item.meta&&item.meta.icon" :class="item.meta.icon || 'el-icon-menu'"></i>{{item.name}}</el-breadcrumb-item>
				</template>
			</el-breadcrumb>
		</div>
		<div class="center-panel">

		</div>
		<div class="right-panel">
			<div class="setting panel-item">
				<i class="el-icon-setting"></i>
			</div>
			<el-popover placement="bottom" :width="300" trigger="click">
				<template #reference>
					<div class="msg panel-item">
						<el-badge :value="1" class="badge" type="danger">
							<i class="el-icon-bell"></i>
						</el-badge>
					</div>
				</template>
				<div>
					<el-empty description="暂无消息"></el-empty>
				</div>
			</el-popover>
			<el-dropdown trigger="click" @command="handleUser">
				<div class="user panel-item">
					<el-avatar :size="30">{{ userNameF }}</el-avatar>
					<label>{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i></label>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="userInfo">个人设置</el-dropdown-item>
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
				userNameF: ""
			}
		},
		created() {
			var userInfo = this.$TOOL.data.get("user").userInfo;
			this.userName = userInfo.userName;
			this.userNameF = this.userName.substring(0,1);
			this.getBreadcrumb();
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
		},
		methods: {
			handleUser(command) {
				if(command == "outLogin"){
					this.$router.replace({path: '/login'});
				}
			},
			getBreadcrumb(){
				let matched = this.$route.matched;
				this.breadList = matched;
			}
		}
	}
</script>
