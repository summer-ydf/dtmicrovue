import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `${config.AUTH_URL}/oauth/token`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	},
	myMenus: {
		url: `${config.API_URL}/menu/get_operator_menu/`,
		name: "登录获取菜单",
		get: async function(params){
			return await http.get(this.url+params,null);
		}
	}
}
