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
        update: {
            url: `${config.JOB_URL}/job/updateScheduleJob`,
            name: "修改任务",
            post: async function(data={}){
                return await http.post(this.url, data);
            }
        },
        pauseScheduleJob: {
            url: `${config.JOB_URL}/job/pauseScheduleJob/`,
            name: "暂停任务",
            post: async function(data={}){
                return await http.post(this.url + data, null);
            }
        },
        resumeScheduleJob: {
            url: `${config.JOB_URL}/job/resumeScheduleJob/`,
            name: "恢复任务",
            post: async function(data={}){
                return await http.post(this.url + data, null);
            }
        },
        deleteScheduleJob: {
            url: `${config.JOB_URL}/job/deleteScheduleJob/`,
            name: "删除任务",
            delete: async function(data={}){
                return await http.delete(this.url + data, null);
            }
        },
	}
}
