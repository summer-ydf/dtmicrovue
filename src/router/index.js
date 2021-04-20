import {createRouter, createWebHashHistory} from 'vue-router';
import { ElNotification } from 'element-plus';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import tool from '@/utils/tool';

//系统路由
const routes = [{
		path: "/",
		name: "layout",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: '/dashboard',
		children: [
			{
				path: "/home",
				name: "首页",
				component: () => import(`@/views/other/empty`),
				meta: {
					icon: "el-icon-platform-eleme"
				},
				children: [
					{
						path: "/dashboard",
						name: "控制台",
						meta: {
							affix: true
						},
						component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
					}
				]
			}
		]
	},
	{
		path: "/login",
		name: "登录",
		component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
	}
]

//系统路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	name: "404",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ '@/views/other/404'),
}

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

//判断是否已加载过API路由
var isGetApiRouter = false;

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	let userInfo = tool.data.get("user");

	if(to.path === "/login"){
		next();
		return false;
	}

	if(!userInfo){
		next({
			path: '/login'
		});
		return false;
	}

	//加载API路由
	if(!isGetApiRouter){
		var apiRouter = filterAsyncRouter(userInfo.menuList);
		apiRouter.forEach(item => {
			router.addRoute("layout", item)
		})
		router.addRoute(routes_404)
		if (to.matched.length == 0) {
			router.push(to.path);
		}
		isGetApiRouter = true;
	}
	next();
});

router.afterEach(() => {
	NProgress.done()
});

router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: '路由错误',
		message: error
	});
});


//转换
function filterAsyncRouter(routerMap) {
	const accessedRouters = []
	routerMap.filter(itemRouter => {
		accessedRouters.push({
			path: itemRouter.path,
			name: itemRouter.name,
			meta: itemRouter.meta,
			children: filterAsyncRouter(itemRouter.children || []),
			component: loadComponent(itemRouter.component)
		})
	})
	return accessedRouters
}
function loadComponent(component){
	if(component){
		return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}`)
	}else{
		return () => import(`@/views/other/empty`)
	}

}


export default router
