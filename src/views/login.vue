<template>
	<h2>LOGIN</h2>
	<el-button type="primary" @click='login()'>模拟登录</el-button>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created: function() {
			this.$TOOL.data.remove("user")
		},
		methods: {
			login: async function() {
				var userInfo = await this.$API.user.info();
				this.$TOOL.data.set("user", userInfo.data);
				this.$router.push({path: '/'});
			}
		}
	}
</script>
