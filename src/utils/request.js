import axios from 'axios';
import { ElNotification, ElMessageBox } from 'element-plus';
import sysConfig from "@/config";
import tool from '@/utils/tool';
import router from '@/router';

axios.defaults.baseURL = ''

axios.defaults.timeout = sysConfig.TIMEOUT

// HTTP request 拦截器
axios.interceptors.request.use(
	(config) => {
		let token = tool.data.get("CMS_ACCESS_TOKEN");
		let existRefreshToken = tool.data.get("EXIST_REFRESH_TOKEN");
        console.log(existRefreshToken)
        console.log(token)
		if(token) {
			config.headers[sysConfig.TOKEN_NAME] = sysConfig.TOKEN_PREFIX + token
		}
		if(!sysConfig.REQUEST_CACHE && config.method === 'get'){
			config.params = config.params || {};
			config.params['_'] = new Date().getTime();
		}
		Object.assign(config.headers, sysConfig.HEADERS)
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

let refreshing = false // 正在刷新Token标识，避免重复刷新Token

// HTTP response 拦截器
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
        let config = error.config
		if (error.response) {
		    console.log("出错了=======")
            console.log(error.response)
			if (error.response.status === 404) {
				ElNotification.error({
					title: '请求错误',
					message: "Status:404，正在请求不存在的服务器记录！"
				});
			} else if (error.response.status === 500) {
				ElNotification.error({
					title: '请求错误',
					message: error.response.data.message || "Status:500，服务器发生错误！"
				});
			} else if (error.response.status === 401) {
			    // TODO Token过期，重新刷新令牌
			    // if (error.response.data.code === 6002) {
                //     if (!refreshing) {
                //         console.log("重新刷新令牌")
                //         refreshing = true
                //         const refreshToken = tool.data.get("CMS_REFRESH_TOKEN");
                //         console.log(refreshToken)
                //         tool.data.set("EXIST_REFRESH_TOKEN", true)
                //         return new Promise((resolve,reject)=>{
                //             axios.post(`auth/oauth/token`,null,{
                //                 params: {
                //                     client_id: "cms-web",
                //                     client_secret: "dt$pwd123",
                //                     grant_type: "refresh_token",
                //                     refresh_token: refreshToken,
                //                 }
                //             }).then((response) => {
                //                 console.log("成功执行1")
                //                 console.log(response.data)
                //                 tool.data.set("EXIST_REFRESH_TOKEN", false)
                //                 tool.data.remove("CMS_ACCESS_TOKEN")
                //                 tool.data.remove("CMS_REFRESH_TOKEN")
                //                 //tool.data.set("CMS_ACCESS_TOKEN", response.data.access_token)
                //                 //tool.data.set("CMS_REFRESH_TOKEN", response.data.refresh_token)
                //                 resolve(response.data);
                //             }).catch((error) => {
                //                 ElMessageBox.confirm('当前用户已被登出或令牌已过期，请尝试重新登录后再操作。', '系统警告', {
                //                     type: 'warning',
                //                     closeOnClickModal: false,
                //                     center: true,
                //                     confirmButtonText: '重新登录'
                //                 }).then(() => {
                //                     router.replace({path: '/login'});
                //                 }).catch(() => {})
                //                 reject(error);
                //             }).finally(() => {
                //                 console.log("最终执行1->>>")
                //                 refreshing = false
                //             })
                //         })
                //     }
                // }else {
                //
                // }

                ElMessageBox.confirm('当前用户已被登出或令牌已过期，请尝试重新登录后再操作。', '系统警告', {
                    type: 'warning',
                    closeOnClickModal: false,
                    center: true,
                    confirmButtonText: '重新登录'
                }).then(() => {
                    router.replace({path: '/login'});
                }).catch(() => {})

			} else {
				ElNotification.error({
					title: '请求错误',
					message: error.response.data.message || `Status:${error.response.status}，未知错误！`
				});
			}
		} else {
			ElNotification.error({
				title: '请求错误',
				message: "请求服务器无响应！"
			});
		}

		return Promise.reject(error.response);
	}
);

var http = {

	/** get 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} params
	 * @param  {参数} config
	 */
	get: function(url, params={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: url,
				params: params,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** post 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	post: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** put 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	put: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'put',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** patch 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	patch: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'patch',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** delete 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} data
	 * @param  {参数} config
	 */
	delete: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'delete',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** jsonp 请求
	 * @param  {接口地址} url
	 * @param  {JSONP回调函数名称} name
	 */
	jsonp: function(url, name='jsonp'){
		return new Promise((resolve) => {
			var script = document.createElement('script')
			var _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
			script.id = _id
			script.type = 'text/javascript'
			script.src = url
			window[name] =(response) => {
				resolve(response)
				document.getElementsByTagName('head')[0].removeChild(script)
				try {
					delete window[name];
				}catch(e){
					window[name] = undefined;
				}
			}
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}
}

export default http;
