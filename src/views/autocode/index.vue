<template>
	<el-container>
		<el-main>
			<el-card shadow="never">
				<el-tabs tab-position="top" type="card">
				    <el-tab-pane label="列配置">

						<el-button type="primary" icon="el-icon-plus" @click="table_add"></el-button>

						<el-table :data="columnTableData" stripe @row-dblclick="table_edit">
							<el-table-column label="排序" type="index" width="50">
							</el-table-column>
							<el-table-column label="显示名称" prop="title" width="150">
								<template #default="scope">
									<el-input v-if="scope.row.isSet" v-model="scope.row.title" placeholder="请输入内容"></el-input>
									<span v-else>{{scope.row.title}}</span>
								</template>
							</el-table-column>
							<el-table-column label="prop" prop="prop" width="150">
								<template #default="scope">
									<el-input v-if="scope.row.isSet" v-model="scope.row.prop" placeholder="请输入内容"></el-input>
									<span v-else>{{scope.row.prop}}</span>
								</template>
							</el-table-column>
							<el-table-column label="宽度" prop="width">
								<template #default="scope">
									<el-input v-if="scope.row.isSet" v-model="scope.row.width" placeholder="请输入内容"></el-input>
									<span v-else>{{scope.row.width}}</span>
								</template>
							</el-table-column>

							<el-table-column label="操作" fixed="right" width="100">
								<template #default="scope">
									<el-button @click="table_edit(scope.row, scope.$index)" type="text" size="small">{{scope.row.isSet?'保存':"修改"}}</el-button>
									<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
										<template #reference>
											<el-button type="text" size="small">删除</el-button>
										</template>
									</el-popconfirm>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				    <el-tab-pane label="按钮配置">

						<el-form ref="button" :model="button" label-width="80px">
							<el-form-item label="按钮显示">
								<el-checkbox label="创建" v-model="button.add"></el-checkbox>
								<el-checkbox label="编辑" v-model="button.edit"></el-checkbox>
								<el-checkbox label="删除" v-model="button.del"></el-checkbox>
							</el-form-item>
						</el-form>

					</el-tab-pane>
				    <el-tab-pane label="弹框设置">弹框设置</el-tab-pane>
				    <el-tab-pane label="API路径配置">
						<el-form ref="api" :model="api" label-width="80px">
							<el-form-item label="列表接口">
								<el-input v-model="api.listUrl"></el-input>
								<div class="el-form-item-msg">需提前至api/index.js中定义接口路径</div>
							</el-form-item>
							<el-form-item label="新增接口">
								<el-input v-model="api.addUrl"></el-input>
							</el-form-item>
							<el-form-item label="编辑接口">
								<el-input v-model="api.editUrl"></el-input>
							</el-form-item>
							<el-form-item label="删除接口">
								<el-input v-model="api.delUrl"></el-input>
							</el-form-item>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</el-card>
			<pre style="margin-top: 50px;display: none;">{{ code }}</pre>
		</el-main>
		<el-footer>
			<el-button type="primary" icon="el-icon-download" @click="download">下载VUE文件</el-button>
			<el-button type="primary" plain icon="el-icon-top-right" @click="showcode">预览代码</el-button>
		</el-footer>
	</el-container>


	<el-dialog title="代码预览" v-model="codeVisible" width="60%" append-to-body>
		<el-alert title="需将VUE文件放置views文件夹,路由匹配组件的路径下,如文件名为index.vue可不需要写文件名" type="success" show-icon style="margin-bottom: 20px;"></el-alert>
		<pre contenteditable class="code">{{ code }}</pre>
		<template #footer>
			<el-button type="primary" @click="codeVisible = false">确 定</el-button>
		</template>
	</el-dialog>

</template>

<script>
	import template from '@/utils/template.js'
	export default {
		name: 'autocode',
		data() {
			return {
				codeVisible: false,
				code: '',
				button: {
					add: true,
					edit: true,
					del: true
				},
				api: {
					listUrl: "user.list",
					addUrl: "user.add",
					editUrl: "user.edit",
					delUrl: "user.del"
				},
				columnTableData: [
					{
						title: "状态",
						prop: "state",
						width: "100"
					},
					{
						title: "姓名",
						prop: "name",
						width: "200"
					},
					{
						title: "类型",
						prop: "type",
						width: "100"
					}
				]
			}
		},
		mounted(){
			this.getTpl()
		},
		methods: {

			table_add(){
				var newRow = {
					title: "",
					prop: "",
					width: "100",
					isSet: true
				}
				this.columnTableData.push(newRow)
			},

			table_edit(row){
				if(row.isSet){
					row.isSet = false
				}else{
					row.isSet = true
				}
			},

			table_del(row, index){

				this.columnTableData.splice(index, 1)
			},

			showcode(){
				this.codeVisible=true;
			},

			//同步获取模板文件
			async getTpl(){
				var data = await this.$HTTP.get('code/table.vue')
				this.code = template(data, {name:"SCUI Demo", date:new Date().toLocaleString()})
			},
			//下载按钮
			download(){
				this.createFile(this.code)
			},
			//创建文件并下载
			createFile(row){
				const element = document.createElement('a')
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(row))
				element.setAttribute('download', 'index.vue')
				element.style.display = 'none'
				element.click()
			}
		}
	}
</script>

<style scoped>
	.code {height:400px;overflow: auto;background: #333;color: #999;padding:20px;font-size: 14px;font-family: "consolas";line-height: 1.5;}
</style>
