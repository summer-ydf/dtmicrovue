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
	default: {
		upload: {
			url: `${config.MOCK_URL}/upload`,
			name: "文件上传",
			post: async function(data){
				return await http.post(this.url, data);
			}
		}
	},
	user: {
		login: {
			url: `${config.MOCK_URL}/login`,
			name: "登录获取用户菜单和权限,全部权限",
			get: async function(){
				return await http.get(this.url);
			}
		},
		login_demo: {
			url: `${config.MOCK_URL}/login_user`,
			name: "登录获取用户菜单和权限，部分权限",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.MOCK_URL}/user_list`,
			name: "获取用户列表",
			get: async function(params={}){
				return await http.get(this.url, params);
			}
		},
		save: {
			url: `${config.MOCK_URL}/post`,
			name: "新增编辑用户",
			post: async function(params={}){
				return await http.get(this.url, params);
			}
		},
		del: {
			url: `${config.MOCK_URL}/post`,
			name: "删除用户",
			post: async function(params={}){
				return await http.get(this.url, params);
			}
		}
	},
	role: {
		select: {
			url: `${config.MOCK_URL}/role`,
			name: "角色选择列表",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.MOCK_URL}/role`,
			name: "角色列表",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	dic: {
		list: {
			url: `${config.MOCK_URL}/dic_list`,
			name: "字典列表",
			get: async function(){
				return await http.get(this.url);
			}
		},
		info: {
			url: `${config.MOCK_URL}/dic_info`,
			name: "字典明细",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	app: {
		list: {
			url: `${config.MOCK_URL}/app`,
			name: "应用列表",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	menu: {
		list: {
			url: `${config.MOCK_URL}/login`,
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
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	demo: {
		page: {
			url: `${config.MOCK_URL}/page`,
			name: "分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		upload: {
			url: `${config.MOCK_URL}/upload`,
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
}

export default api;
