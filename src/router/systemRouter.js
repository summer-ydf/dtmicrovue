import config from "@/config"

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '/dashboard',
		children: []
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ '@/views/userCenter/login'),
		meta: {
			title: "登录"
		}
	},
    {
        path: "/authorize",
        component: () => import(/* webpackChunkName: "authorize" */ '@/views/userCenter/authorize'),
        meta: {
            title: "认证中心"
        }
    }
]

export default routes;
