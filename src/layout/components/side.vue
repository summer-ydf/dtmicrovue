<template>
	<div class="aminui-side-split">
		<div class="adminui-side-split-scroll">
			<ul>
				<li v-for="item in menu" v-bind:key="item" :class="pmenu.path==item.path?'active':''" @click="showMenu(item)"><i :class="item.meta.icon || 'el-icon-menu'"></i>
					<p>{{ item.name }}</p>
				</li>
			</ul>
		</div>
	</div>

	<div class="aminui-side">
		<div class="adminui-side-scroll">
			<el-menu :default-active="$route.path" router>
				<NavMenu :navMenus="nextMenu"></NavMenu>
			</el-menu>
		</div>
	</div>

</template>

<script>
	import NavMenu from './NavMenu.vue';

	export default {
		components: {
			NavMenu
		},
		data() {
			return {
				menu: [],
				nextMenu: [],
				pmenu: {}
			}
		},
		created: function() {
			var menu = this.$TOOL.data.get("user").menuList;
			var home = this.$router.options.routes[0].children[0];
			menu.unshift(home);
			this.menu = menu;
			this.showThis()
		},
		setup() {

		},
		watch: {
			$route() {
				this.showThis()
			}
		},
		methods: {
			//路由监听高亮
			showThis(){
				var menu = this.$TOOL.data.get("user").menuList;
				var home = this.$router.options.routes[0].children[0];
				menu.unshift(home);
				var pl = this.$route.path.split("/");
				var p = pl.length<=2?home.path:"/" + pl[1];
				this.pmenu = p==home.path ? home:this.getRoute(p, menu);
				this.nextMenu = this.pmenu.children;
			},
			//点击显示
			showMenu(route) {
				this.pmenu = route;
				this.nextMenu = route.children;
			},
			//根据path获取
			getRoute(path, menu){
				for (var item of menu) {
					if (item.path == path) {
						return item;
					}
					if (item.children) {
						this.getRoute(path, item.children);
					}
				}
			}
		}
	}
</script>
