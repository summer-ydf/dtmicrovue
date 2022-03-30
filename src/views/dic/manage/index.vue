<template>
	<el-container>
		<el-aside width="220px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="dicFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="dic" class="menu" node-key="code" :data="dicList" :current-node-key="''" :highlight-current="true" :filter-node-method="dicFilterNode" @node-click="dicClick"></el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container class="is-vertical">
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
					<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.keyword" placeholder="字典名称" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe remoteSort remoteFilter>
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="代码" prop="code" width="150"></el-table-column>
					<el-table-column label="名称" prop="name" width="150"></el-table-column>
					<el-table-column label="是否有效" prop="enabled" width="100">
						<template #default="scope">
							<el-switch v-model="scope.row.enabled" @change="changeSwitch($event, scope.row)" :loading="scope.row.$switch_yx" :active-value="true" :inactive-value="false"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" width="150"></el-table-column>
					<el-table-column label="操作" fixed="right" align="right" width="140">
						<template #default="scope">
							<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
							<el-divider direction="vertical"></el-divider>
							<el-button type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>
	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>
</template>
<script>
import saveDialog from "./save"
export default {
	name: 'dic',
	components: {saveDialog},
	data() {
		return {
			apiObj: this.$API.system.dic.list,
			selection: [],
			dialog: {
				save: false
			},
			search: {
				keyword: null,
				category: null
			},
			dicFilterText: '',
			dicList: [
				{
					label: "所有",
					code: "",
				},
				{
					label: "基础字典",
					code: "baseType",
				},
				{
					label: "公告字典",
					code: "noticeType",
				},
				{
					label: "消息字典",
					code: "messageType",
				},
				{
					label: "数据字典",
					code: "dataType",
				}
			]
		}
	},
	watch: {
		dicFilterText(val) {
			this.$refs.dic.filter(val);
		}
	},
	mounted() {
	},
	methods: {
		//添加
		add(){
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open()
			})
		},
		//编辑
		table_edit(row){
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open('edit').setData(row)
			})
		},
		//删除
		async table_del(row){
			var confirm = await this.$confirm(`确定删除选中的项吗？`, '提示', {
				confirmButtonText: 'ok',
				type: 'warning'
			}).catch(() => {})
			if(confirm !== 'confirm'){
				return false
			}
			var res = await this.$API.system.dic.delete.delete(row.id);
			if(res.code === 2000){
				this.$refs.table.refresh()
				this.$message.success("删除成功")
			}else{
				this.$alert(res.message, "提示", {type: 'error'})
			}
		},
		//批量删除
		async batch_del(){
			var ids = []
			var confirm = await this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
				type: 'warning'
			}).catch(() => {})
			if(confirm !== 'confirm'){
				return false
			}
			this.selection.forEach(item => {
				ids.push(item.id)
			})
			const loading = this.$loading();
			var res = await this.$API.system.dic.deleteBath.delete(ids)
			if(res.code === 2000){
				loading.close();
				this.$refs.table.reload()
				this.$message.success("删除成功")
			}else{
				this.$message.warning("删除失败")
			}
		},
		//树过滤
		dicFilterNode(value, data){
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树点击事件
		dicClick(data){
			this.search.category = data.code
			this.$refs.table.upData(this.search)
		},
		//搜索
		upsearch(){
			this.$refs.table.upData(this.search)
		},
		//表格选择后回调事件
		selectionChange(selection){
			this.selection = selection;
		},
		//表格内开关事件
		async changeSwitch(val, row){
			//1.执行加载
			row.$switch_yx = true;
			var res = await this.$API.system.dic.updateEnabled.post({
				"id": row.id,
				"enabled": val
			})
			if (res.code === 2000) {
				//2.等待接口返回后改变值
				setTimeout(()=>{
					delete row.$switch_yx;
					row.yx = val;
					this.$message.success(`操作成功id:${row.id} val:${val}`)
				}, 100)
			}
		},
		//本地更新数据
		handleSaveSuccess(data, mode){
			if(mode==='add' || mode==='edit'){
				this.$refs.table.refresh()
			}
		}
	}
}
</script>

<style scoped>

</style>
