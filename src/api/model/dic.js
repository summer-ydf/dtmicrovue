import config from "@/config"
import http from "@/utils/request"

export default {
	list: {
		url: `${config.API_URL}/dic_list`,
		name: "字典列表",
		get: async function(){
			return await http.get(this.url);
		}
	},
	info: {
		url: `${config.API_URL}/dic_info`,
		name: "字典明细",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	get: {
		url: `${config.API_URL}/dic`,
		name: "获取字典数据",
		get: async function(params){
			return await http.get(this.url, params);
		}
	}
}
