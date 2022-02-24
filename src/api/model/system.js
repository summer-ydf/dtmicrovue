import config from "@/config"
import http from "@/utils/request"

export default {
	menu: {
		myMenus: {
			url: `${config.API_URL}/system/menu/my/1.4.2`,
			name: "获取我的菜单",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/menu/list`,
			name: "获取菜单",
			get: async function(){
				return await http.get(this.url);
			}
		},
		generateId: {
			url: `${config.API_URL}/menu/generateId`,
			name: "生成唯一ID",
			get: async function(){
				return await http.get(this.url);
			}
		},
		save: {
			url: `${config.API_URL}/menu/save`,
			name: "添加菜单",
			post: async function(data={}){
				return await http.post(this.url, data);
			}
		},
        deleteBath: {
            url: `${config.API_URL}/menu/deleteBath`,
            name: "批量删除菜单",
            delete: async function(data={}){
                return await http.delete(this.url, data);
            }
        },
	},
	dic: {
		tree: {
			url: `${config.API_URL}/system/dic/tree`,
			name: "获取字典树",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/system/dic/list`,
			name: "字典明细",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		get: {
			url: `${config.API_URL}/system/dic/get`,
			name: "获取字典数据",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	role: {
		list: {
			url: `${config.API_URL}/role/findAll`,
			name: "获取角色列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	user: {
		list: {
			url: `${config.API_URL}/operator/page`,
			name: "获取用户分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		delete: {
			url: `${config.API_URL}/operator/delete/`,
			name: "删除用户",
			delete: async function(data={}){
				return await http.delete(this.url + data,null);
			}
		},
		deleteBath: {
			url: `${config.API_URL}/operator/deleteBath`,
			name: "批量删除用户",
			delete: async function(data={}){
				return await http.delete(this.url, data);
			}
		},
	},
	dept: {
		list: {
			url: `${config.API_URL}/dept/list`,
			name: "获取部门列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	app: {
		list: {
			url: `${config.API_URL}/system/app/list`,
			name: "应用列表",
			get: async function(){
				return await http.get(this.url);
			}
		}
	},
	log: {
		list: {
			url: `${config.API_URL}/system/log/list`,
			name: "日志列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	},
	table: {
		list: {
			url: `${config.API_URL}/system/table/list`,
			name: "表格列管理列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		info: {
			url: `${config.API_URL}/system/table/info`,
			name: "表格列管理详情",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	}
}
