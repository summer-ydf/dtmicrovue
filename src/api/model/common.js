import config from "@/config"
import http from "@/utils/request"

export default {
	upload: {
		url: `${config.DOC_URL}/upload`,
		name: "文件上传",
		post: async function(data, config={}){
			return await http.post(this.url, data, config);
		}
	},
	file: {
		menu: {
			url: `${config.DOC_URL}/file/listBucketNames`,
			name: "获取文件分类",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.DOC_URL}/file/page`,
			name: "获取文件分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
	},
	generateId: {
		url: `${config.AUTH_URL}/anonymous/generate_id`,
		name: "生成分布式唯一ID",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
