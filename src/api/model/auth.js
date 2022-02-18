import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `${config.API_URL}/permission/login`,
		name: "登录获取TOKEN",
		post: async function(data={}){
			return await http.post(this.url, data);
		}
	},
	menu: {
		url: `${config.API_URL}/menu/getOperatorMenu/248204704247877`,
		name: "登录获取菜单",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
