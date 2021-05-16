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
		login: {
			url: `${config.API_URL}/json/login.json`,
			name: "登录获取用户菜单和权限",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/json/user_list.json`,
			name: "获取用户列表",
			get: async function(params={}){
				return await http.get(this.url, params);
			}
		},
		save: {
			url: `${config.API_URL}/json/post.json`,
			name: "新增编辑用户",
			post: async function(params={}){
				return await http.get(this.url, params);
			}
		},
		del: {
			url: `${config.API_URL}/json/post.json`,
			name: "删除用户",
			post: async function(params={}){
				return await http.get(this.url, params);
			}
		}
	},
	role: {
		select: {
			url: `${config.API_URL}/json/role.json`,
			name: "角色选择列表",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/json/role.json`,
			name: "角色列表",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	dic: {
		list: {
			url: `${config.API_URL}/json/dic_list.json`,
			name: "字典列表",
			get: async function(){
				return await http.get(this.url);
			}
		},
		info: {
			url: `${config.API_URL}/json/dic_info.json`,
			name: "字典明细",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	app: {
		list: {
			url: `${config.API_URL}/json/app.json`,
			name: "应用列表",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	menu: {
		list: {
			url: `${config.API_URL}/json/login.json`,
			name: "菜单管理",
			get: async function(){
				// 这里接口对象偷懒重复了登录接口
				var res = await http.get(this.url);
					res.data = res.data.menuList;
				return res;
			}
		}
	},
	log: {
		list: {
			url: `${config.MOCK_URL}/loglist`,
			name: "日志列表",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	demo: {
		upload: {
			url: `${config.MOCK_URL}/upload`,
			name: "文件上传接口"
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
}

export default api;
