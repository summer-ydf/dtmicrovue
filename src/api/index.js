import config from "@/config";
import http from "@/utils/request";

/**
 * 所有接口集合
 * 每个接口对象需含有以下字段
 * @url 接口的URL地址
 * @name 接口名称
 * @get|post 返回请求接口的函数
 */

const api = {
	user: {
		info: {
			url: `${config.API_URL}/json/user.json`,
			name: "登录获取用户菜单和权限",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	demo: {
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
}

export default api;
