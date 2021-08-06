//系统路由
const routes = [{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: '/dashboard',
		children: [
			{
				name: "home",
				path: "/home",
				component: () => import(`@/views/other/empty`),
				meta: {
					title: "首页",
					icon: "el-icon-platform-eleme"
				},
				children: [
					{
						name: "dashboard",
						path: "/dashboard",
						meta: {
							title: "控制台",
							icon: "el-icon-menu",
							affix: true
						},
						component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
					},
					{
						name: "userCenter",
						path: "/usercenter",
						meta: {
							title: "个人信息",
							icon: "el-icon-user",
						},
						component: () => import(/* webpackChunkName: "usercenter" */ '@/views/userCenter'),
					}
				]
			}
		]
	},
	{
		path: "/cmd",
		component: () => import(/* webpackChunkName: "cmd" */ '@/views/other/cmd'),
		meta: {
			title: "CMD"
		}
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ '@/views/userCenter/login'),
		meta: {
			title: "登录"
		}
	}
]

export default routes;
