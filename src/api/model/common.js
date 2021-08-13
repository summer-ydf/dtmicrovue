import config from "@/config"
import http from "@/utils/request"

export default {
	upload: {
		url: `${config.API_URL}/upload`,
		name: "文件上传",
		post: async function(data){
			return await http.post(this.url, data);
		}
	}
}
