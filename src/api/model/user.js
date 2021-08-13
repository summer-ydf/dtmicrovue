import config from "@/config"
import http from "@/utils/request"

export default {
	login: {
		url: `${config.API_URL}/login`,
		name: "登录获取用户菜单和权限,全部权限",
		get: async function(params={}){
			return await http.get(this.url, params);
		}
	},
	login_demo: {
		url: `${config.API_URL}/login_user`,
		name: "登录获取用户菜单和权限，部分权限",
		get: async function(params={}){
			return await http.get(this.url, params);
		}
	},
	list: {
		url: `${config.API_URL}/user_list`,
		name: "获取用户列表",
		get: async function(params={}){
			return await http.get(this.url, params);
		}
	},
	save: {
		url: `${config.API_URL}/post`,
		name: "新增编辑用户",
		post: async function(params={}){
			return await http.post(this.url, params);
		}
	},
	del: {
		url: `${config.API_URL}/post`,
		name: "删除用户",
		post: async function(params={}){
			return await http.post(this.url, params);
		}
	}
}