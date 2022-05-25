import config from "@/config"
import http from "@/utils/request"

export default {
	menu: {
		list: {
			url: `${config.API_URL}/menu/list`,
			name: "获取菜单",
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
		list: {
			url: `${config.API_URL}/dic/page`,
			name: "字典分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		save: {
			url: `${config.API_URL}/dic/save`,
			name: "添加字典",
			post: async function(data={}){
				return await http.post(this.url, data);
			}
		},
		delete: {
			url: `${config.API_URL}/dic/delete/`,
			name: "删除字典",
			delete: async function(data={}){
				return await http.delete(this.url + data,null);
			}
		},
		deleteBath: {
			url: `${config.API_URL}/dic/delete_bath`,
			name: "批量删除字典",
			delete: async function(data={}){
				return await http.delete(this.url, data);
			}
		},
		updateEnabled: {
			url: `${config.API_URL}/dic/update_enabled/`,
			name: "修改字典状态",
			post: async function(data={}){
				return await http.delete(this.url + data.id + "/" + data.enabled,null);
			}
		},
	},
	role: {
		list: {
			url: `${config.API_URL}/role/page`,
			name: "获取角色分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		findAll: {
			url: `${config.API_URL}/role/findAll`,
			name: "获取所有角色信息",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
        listTree: {
            url: `${config.API_URL}/role/list`,
            name: "获取角色权限树",
            get: async function(params){
                return await http.get(this.url, params);
            }
        },
        save: {
            url: `${config.API_URL}/role/save`,
            name: "添加角色",
            post: async function(data={}){
                return await http.post(this.url, data);
            }
        },
        delete: {
            url: `${config.API_URL}/role/delete/`,
            name: "删除角色",
            delete: async function(data={}){
                return await http.delete(this.url + data,null);
            }
        },
        deleteBath: {
            url: `${config.API_URL}/role/delete_bath`,
            name: "批量删除角色",
            delete: async function(data={}){
                return await http.delete(this.url, data);
            }
        },
        getTreeRoleMenuById: {
            url: `${config.API_URL}/role/getTreeRoleMenuById/`,
            name: "获取角色拥有的权限信息",
            get: async function(params){
                return await http.get(this.url + params, null);
            }
        },
        saveRoleMenu: {
            url: `${config.API_URL}/role/saveRoleMenu`,
            name: "添加角色权限信息",
            post: async function(params={}){
                return await http.post(this.url, params);
            }
        },
		saveRoleDataScope: {
			url: `${config.API_URL}/role/saveRoleDataScope`,
			name: "添加角色数据权限信息",
			post: async function(params={}){
				return await http.post(this.url, params);
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
		save: {
			url: `${config.API_URL}/operator/save`,
			name: "添加用户",
			post: async function(data={}){
				return await http.post(this.url, data);
			}
		},
        updateMyInfo: {
            url: `${config.API_URL}/operator/updateMyInfo`,
            name: "更新个人信息",
            post: async function(data={}){
                return await http.post(this.url, data);
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
			url: `${config.API_URL}/operator/delete_bath`,
			name: "批量删除用户",
			delete: async function(data={}){
				return await http.delete(this.url, data);
			}
		},
		updateEnabled: {
			url: `${config.API_URL}/operator/update_enabled/`,
			name: "修改用户状态",
			post: async function(data={}){
				return await http.delete(this.url + data.id + "/" + data.enabled,null);
			}
		},
        getById: {
            url: `${config.API_URL}/operator/getById/`,
            name: "根据ID获取用户信息",
            get: async function(params){
                return await http.get(this.url + params, null);
            }
        },
        findAll: {
            url: `${config.API_URL}/operator/findAll`,
            name: "获取用户列表",
            get: async function(params){
                return await http.get(this.url, params);
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
		},
		save: {
			url: `${config.API_URL}/dept/save`,
			name: "添加部门/修改部门",
			post: async function(data={}){
				return await http.post(this.url, data);
			}
		},
		deleteBath: {
			url: `${config.API_URL}/dept/bath_delete`,
			name: "批量删除部门",
			delete: async function(data={}){
				return await http.delete(this.url, data);
			}
		},
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
		login_list: {
            url: `${config.API_URL}/log/login_page`,
            name: "获取登录日志分页列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
		},
        operator_list: {
            url: `${config.API_URL}/log/operator_page`,
            name: "获取操作日志分页列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
        },
        delete_login: {
            url: `${config.API_URL}/log/delete_login/`,
            name: "单个删除登录日志",
            delete: async function(data={}){
                return await http.delete(this.url + data, null);
            }
        },
        delete_operator: {
            url: `${config.API_URL}/log/delete_operator/`,
            name: "单个删除操作日志",
            delete: async function(data={}){
                return await http.delete(this.url + data, null);
            }
        },
        bath_delete_login: {
            url: `${config.API_URL}/log/bath_delete_login`,
            name: "批量删除登录日志",
            delete: async function(data={}){
                return await http.delete(this.url, data);
            }
        },
        bath_delete_operator: {
            url: `${config.API_URL}/log/bath_delete_operator`,
            name: "批量删除操作日志",
            delete: async function(data={}){
                return await http.delete(this.url, data);
            }
        },
	},
	setting: {
        get_my_setting: {
			url: `${config.API_URL}/setting/get_my_setting/`,
			name: "获取我的常用应用",
			get: async function(params){
				return await http.get(this.url + params, null);
			}
		},
		save: {
			url: `${config.API_URL}/setting/save`,
			name: "添加我的常用应用",
            post: async function(data={}){
                return await http.post(this.url, data);
            }
		}
	},
    task: {
        list: {
            url: `${config.API_URL}/job/page`,
            name: "获取任务调度分页列表",
            get: async function(params){
                return await http.get(this.url, params);
            }
        },
    },
	message: {
		list: {
			url: `${config.API_URL}/message/page`,
			name: "获取MQ消息日志分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		delete: {
			url: `${config.API_URL}/message/delete/`,
			name: "单个删除MQ消息日志",
			delete: async function(data={}){
				return await http.delete(this.url + data, null);
			}
		},
		bath_delete: {
			url: `${config.API_URL}/message/bath_delete`,
			name: "批量删除MQ消息日志",
			delete: async function(data={}){
				return await http.delete(this.url, data);
			}
		},
	},
    config: {
        list: {
            url: `${config.API_URL}/config/list`,
            name: "获取系统配置信息",
            get: async function(){
                return await http.get(this.url);
            }
        },
        save: {
            url: `${config.API_URL}/config/save`,
            name: "添加系统配置信息",
            post: async function(data={}){
                return await http.post(this.url, data);
            }
        }
    },
    client: {
        list: {
            url: `${config.API_URL}/client/page`,
            name: "客户端分页列表",
            get: async function(params){
                return await http.get(this.url,params);
            }
        },
        save: {
            url: `${config.API_URL}/client/save`,
            name: "添加客户端配置信息",
            post: async function(data={}){
                return await http.post(this.url, data);
            }
        },
        delete: {
            url: `${config.API_URL}/client/delete/`,
            name: "删除客户端配置项",
            delete: async function(data={}){
                return await http.delete(this.url + data, null);
            }
        },
        refresh: {
            url: `${config.AUTH_URL}/oauth/token`,
            name: "刷新令牌",
            post: async function(data={}) {
                return await http.post(this.url, data);
            }
        },
    },
}
