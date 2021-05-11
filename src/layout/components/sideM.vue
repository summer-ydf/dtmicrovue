<template>
	<el-menu :default-active="$route.fullPath" @select="select" router>
		<NavMenu :navMenus="menu"></NavMenu>
	</el-menu>
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
			}
		},
		created: function() {
			var menu = this.$TOOL.data.get("user").menuList;
			var home = this.$router.options.routes[0].children[0];
			menu.unshift(home);
			this.menu = this.filterUrl(menu)
		},
		setup() {

		},
		watch: {

		},
		methods: {
			select(){
				this.$parent.$el.click()
			},
			//转换外部链接的路由
			filterUrl(map){
				map.forEach((item,index) => {
					item.meta = item.meta?item.meta:{};
					//处理隐藏
					if(item.meta.hidden){
						map.splice(index, 1);
					}
					//处理http
					if(item.path.startsWith('http') && item.meta.target!='_blank'){
						item.path = `/${encodeURIComponent(item.path)}`;
					}
					//递归循环
					if(item.children&&item.children.length > 0){
						this.filterUrl(item.children);
					}

				})

				return map;
			}
		}
	}
</script>
