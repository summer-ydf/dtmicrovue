//数据表格配置
import { ElMessage } from 'element-plus'

export default {
	pageSize: 20,						//表格每一页条数
	parseData: function (res) {			//数据分析
		return {
			rows: res.data,				//分析行数据字段结构
			total: res.count,			//分析总数字段结构
			msg: res.message,			//分析描述字段结构
			code: res.code				//分析状态字段结构
		}
	},
	request: {							//请求规定字段
		page: 'page',					//规定当前分页字段
		pageSize: 'pageSize',			//规定一页条数字段
		prop: 'prop',					//规定排序字段名字段
		order: 'order'					//规定排序规格字段
	},
	/**
	 * 自定义列保存处理
	 * @tableName scTable组件的props->tableName
	 * @column 用户配置好的列
	 * @ref 列配置弹窗组件的ref
	 */
	columnSettingSave: function (tableName, column, ref) {
		ref.isSave = true
		setTimeout(()=>{
			ref.isSave = false
			ElMessage.success(`${tableName} 保存列配置成功，打开F12控制台查看详细`)
			console.log('这里可以保存本地或者远程保存，本文件在@/config/table.js');
			console.log('tableName:', tableName);
			console.log('column:', column);
		},1000)
	}
}
