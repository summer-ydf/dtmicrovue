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
			<el-menu :default-active="$route.fullPath" router>
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
			this.menu = this.filterUrl(menu);
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
				var home = this.$router.options.routes[0].children[0];
				this.pmenu = this.$route.matched[1] || home;
				this.nextMenu = this.filterUrl(this.pmenu.children);
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
			},
			//转换外部链接的路由
			filterUrl(map){
				var newMap = []
				map.forEach(item => {
					item.meta = item.meta?item.meta:{};
					if(item.path.startsWith('http') && item.meta.target!='_blank'){
						item.path = `/${encodeURIComponent(item.path)}`;
					}
					if(item.children&&item.children.length > 0){
						this.filterUrl(item.children);
					}
					newMap.push(item)
				})
				return newMap;
			}
		}
	}
</script>
