import config from "@/config"
import http from "@/utils/request"

export default {
	list: {
		url: `${config.API_URL}/app`,
		name: "应用列表",
		get: async function(){
			return await http.get(this.url);
		}
	}
}
