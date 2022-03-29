import config from "@/config"
import http from "@/utils/request"

export default {
	job: {
		list: {
			url: `${config.JOB_URL}/job/page`,
			name: "获取任务调度分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		save: {
			url: `${config.JOB_URL}/job/addScheduleJob`,
			name: "添加任务",
			post: async function(data={}){
				return await http.post(this.url, data);
			}
		},
	}
}
