<template>
	<el-main>
		<el-alert title="注意:此页面为系统调试页面,可控制系统所有缓存以及一些本地设置,如不熟悉操作请勿操作" type="warning" show-icon></el-alert>
		<h2 style="margin:20px 0">{{ title }}</h2>

		<el-button @click="clear_all()">清除所有</el-button>
		<el-button @click="clear_user()">清除登录状态</el-button>
		<el-button @click="clear_grid()">清除首页自定义布局数据</el-button>

		<el-tabs>
			<el-tab-pane label="user">
				<pre class="code">{{json.user}}</pre>
			</el-tab-pane>
			<el-tab-pane label="token">
				<pre class="code">{{json.token}}</pre>
			</el-tab-pane>
			<el-tab-pane label="grid">
				<pre class="code">{{json.grid}}</pre>
			</el-tab-pane>
			<el-tab-pane label="config">
				<pre class="code">{{json.config}}</pre>
			</el-tab-pane>
			<el-tab-pane label="api">
				<pre class="code">{{json.api}}</pre>
			</el-tab-pane>
		 </el-tabs>


	</el-main>
</template>

<script>
	export default {
		name: 'blank',
		data() {
			return {
				title: "CMD",
				json: {
					user: null,
					token: null,
					grid: null,
					config: null,
					api: null,
				}
			}
		},
		created() {
			this.json.user = this.$TOOL.data.get("USER_INFO");
			this.json.token = this.$TOOL.data.get("TOKEN");
			this.json.grid = this.$TOOL.data.get("grid")||'null';
			this.json.config = this.$CONFIG;
			this.json.api = this.$API;
		},
		methods: {
			clear_all(){
				this.$TOOL.data.clear()
				this.$message.success("清除所有成功")
			},
			clear_user(){
				this.$TOOL.data.remove("user")
				this.$message.success("清除登录状态成功")
			},
			clear_grid(){
				this.$TOOL.data.remove("grid")
				this.$message.success("清除grid成功")
			}
		}
	}
</script>

<style scoped>
	.code {height:400px;overflow: auto;background: #333;color: #999;padding:20px;font-size: 14px;font-family: "small fonts";line-height: 1.8;}
</style>
