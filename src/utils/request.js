import axios from 'axios';
import { ElNotification } from 'element-plus';
import sysConfig from "@/config";
import tool from '@/utils/tool';

axios.defaults.baseURL = ''

axios.defaults.timeout = 10000

// HTTP request 拦截器
axios.interceptors.request.use(
	(config) => {
		let userInfo = tool.data.get("user");
		if(userInfo){
			config.headers[sysConfig.TOKEN_NAME] = userInfo.token
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// HTTP response 拦截器
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status == 404) {
				ElNotification.error({
					title: '请求错误',
					message: "Status:404，正在请求不存在的服务器记录！"
				});
			} else if (error.response.status == 500) {
				ElNotification.error({
					title: '请求错误',
					message: "Status:500，服务器发生错误！"
				});
			} else {
				ElNotification.error({
					title: '请求错误',
					message: `Status:${error.response.status}，未知错误！`
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
	 */
	get: function(url, params) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
					params: params
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	},

	/** post 请求
	 * @param  {接口地址} url
	 * @param  {请求参数} params
	 */
	post: function(url, params) {
		return new Promise((resolve, reject) => {
			axios.post(url, params)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
}

export default http;
