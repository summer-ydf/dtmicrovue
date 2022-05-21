import config from "@/config"
import http from "@/utils/request"

export default {
    msg: {
        list: {
            url: `${config.API_URL}/message/wx_page`,
            name: "查询微信公众号消息日志分页",
            get: async function(params){
                return await http.get(this.url, params);
            }
        },
        wx_send_message: {
            url: `${config.API_URL}/message/wx_send_message`,
            name: "发送微信公众号模板信息",
            post: async function(data={}){
                return await http.post(this.url, data);
            }
        },
        delete_wx: {
            url: `${config.API_URL}/message/delete_wx/`,
            name: "单个删除微信公众号消息日志",
            delete: async function(data={}){
                return await http.delete(this.url + data, null);
            }
        },
        bath_delete_wx: {
            url: `${config.API_URL}/message/bath_delete_wx`,
            name: "批量删除微信公众号消息日志",
            delete: async function(data={}){
                return await http.delete(this.url, data);
            }
        },
    }
}
