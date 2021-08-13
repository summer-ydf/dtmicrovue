import config from "@/config"
import http from "@/utils/request"

export default {
	list: {
		url: `${config.API_URL}/login`,
		name: "菜单管理",
		get: async function(){
			// 这里接口对象偷懒重复了登录接口
			var res = await http.get(this.url);
				res.data = res.data.menuList;
			return res;
		}
	}
}
