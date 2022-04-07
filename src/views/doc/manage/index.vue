<template>
	<el-container>
		<el-aside width="220px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="dicFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="dic" class="menu" node-key="code" :data="dicList" :current-node-key="''" :highlight-current="true" :filter-node-method="dicFilterNode" @node-click="dicClick">
                        <template #default="{ node }">
						<span class="el-tree-node__label">
							<el-icon class="icon"><el-icon-folder /></el-icon>{{node.label}}
						</span>
                        </template>
                    </el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container class="is-vertical">
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-upload" @click="add">上传文件</el-button>
					<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length===0" @click="batch_del"></el-button>
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.keyword" placeholder="文件搜索" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" stripe remoteSort remoteFilter>
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="文件名称" prop="objectName" width="400"></el-table-column>
					<el-table-column label="文件后缀" prop="suffix" width="100">
						<template #default="scope">
							<el-button type="primary" plain size="small">{{scope.row.suffix}}</el-button>
						</template>
					</el-table-column>
					<el-table-column label="文件大小" prop="size" width="150">
						<template #default="scope">
							<span>{{towNumber(scope.row.size / 1024)}} KB</span>
						</template>
					</el-table-column>
					<el-table-column label="上传时间" prop="createTime" width="150"></el-table-column>
					<el-table-column label="操作" fixed="right" align="right" width="200">
						<template #default="scope">
							<el-button type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
							<el-divider direction="vertical"></el-divider>
							<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">下载</el-button>
							<el-divider direction="vertical"></el-divider>
							<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">分享</el-button>
							<el-divider direction="vertical"></el-divider>
							<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">查看</el-button>
						</template>
					</el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>
	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>
</template>
<script>
import saveDialog from "./save";
export default {
	components: {
		saveDialog
	},
	data() {
		return {
			apiObj: this.$API.common.file.list,
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
					label: "公共组",
					code: "default",
				}
			]
		}
	},
	watch: {
		dicFilterText(val) {
			this.$refs.dic.filter(val);
		}
	},
	created() {

	},
	methods: {
		//保留两位小数
		towNumber(val) {
			return val.toFixed(2)
		},
		//上传文件
		add(){
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open()
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
					this.$message.success(res.message)
				}, 100)
			}
		},
		//本地更新数据
		handleSaveSuccess(){
            this.$refs.table.refresh()
		}
	}
}
</script>

<style scoped>

</style>
