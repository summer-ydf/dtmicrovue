import {createRouter, createWebHashHistory} from 'vue-router';
import { ElNotification } from 'element-plus';
import config from "@/config"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import tool from '@/utils/tool';
import systemRouter from './systemRouter';

//系统路由
const routes = systemRouter

//系统特殊路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ '@/views/other/404'),
}

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

//设置标题
document.title = config.APP_NAME

//判断是否已加载过API路由
var isGetApiRouter = false;

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	let userInfo = tool.data.get("user");

	if(to.path === "/login"){
		isGetApiRouter = false;
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
			router.push(to.fullPath);
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
		message: error.message
	});
});


//转换
function filterAsyncRouter(routerMap) {
	const accessedRouters = []
	routerMap.forEach(item => {
		item.meta = item.meta?item.meta:{};
		//处理外部链接特殊路由
		if(item.meta.type=='iframe'){
			item.meta.url = item.path;
			item.path = `/i/${item.name}`;
			item.component = 'other/iframe';
		}
		//MAP转路由对象
		var route = {
			path: item.path,
			name: item.name,
			meta: item.meta,
			redirect: item.redirect,
			children: item.children ? filterAsyncRouter(item.children) : null,
			component: loadComponent(item.component)
		}
		accessedRouters.push(route)
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
