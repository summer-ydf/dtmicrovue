import config from "@/config"
import http from "@/utils/request"

export default {
	select: {
		url: `${config.API_URL}/role`,
		name: "角色选择列表",
		get: async function(){
			return await http.get(this.url);
		}
	},
	list: {
		url: `${config.API_URL}/role`,
		name: "角色列表",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
