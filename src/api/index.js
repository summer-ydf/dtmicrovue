/**
 * 所有接口集合
 * 每个接口对象需含有以下字段
 * 开发者可将不同的业务模块细化分离处理
 * @param  {接口地址} url
 * @param  {接口名称描述} name
 * @param  {请求类型 get|post|put|patch|delete} type
 */

//公共模块
import common from './model/common'
//授权模块
import auth from './model/auth'
//系统模块
import system from './model/system'
//演示模块
import demo from './model/demo'

const api = {
	common,
	auth,
	system,
	demo
}

export default api;
