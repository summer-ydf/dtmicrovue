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
	}
}
