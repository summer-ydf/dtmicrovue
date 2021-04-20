import config from "@/config";
import http from "@/utils/request";


const api = {
	user: {
		info: async function(){
			return await http.get(`${config.apiUrl}/json/user.json`);
		}
	}
}

export default api;
