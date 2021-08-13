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
//用户模块
import user from './model/user'
//角色模块
import role from './model/role'
//字典模块
import dic from './model/dic'
//应用模块
import app from './model/app'
//菜单模块
import menu from './model/menu'
//日志模块
import log from './model/log'
//演示模块
import demo from './model/demo'

const api = {
	common,
	user,
	role,
	dic,
	app,
	menu,
	log,
	demo
}

export default api;
