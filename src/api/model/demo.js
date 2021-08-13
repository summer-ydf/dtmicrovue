import config from "@/config"
import http from "@/utils/request"

export default {
	page: {
		url: `${config.API_URL}/page`,
		name: "分页列表",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	upload: {
		url: `${config.API_URL}/upload`,
		name: "文件上传接口",
		post: async function(data){
			return await http.post(this.url, data);
		}
	},
	select: {
		url: `${config.API_URL}/json/select.json`,
		name: "下拉菜单数据",
		get: async function(data){
			return await http.get(this.url, data);
		}
	},
	demolist: {
		list: {
			url: `${config.API_URL}/json/list.json`,
			name: "列表数据",
			get: async function(data){
				return await http.get(this.url, data);
			}
		}
	}
}