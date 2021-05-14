<template>
	<el-container>
		<el-aside width="300px" v-loading="showDicloading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="dicFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="dic" node-key="id" :data="dicList" :props="dicProps" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="dicFilterNode" @node-click="dicClick">
						<template #default="{node, data}">
							<span class="custom-tree-node">
								<span class="label">{{ node.label }}</span>
								<span class="code">{{ data.code }}</span>
								<span class="do">
									<i class="el-icon-edit" @click.stop="dicEdit(data)"></i>
									<i class="el-icon-delete" @click.stop="dicDel(node, data)"></i>
								</span>
							</span>
						</template>
					</el-tree>
				</el-main>
				<el-footer style="height:51px;">
					<el-button type="primary" size="mini" icon="el-icon-plus" style="width: 100%;" @click="addDic">字典分类</el-button>
				</el-footer>
			</el-container>
		</el-aside>
		<el-container class="is-vertical">
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus" @click="addInfo"></el-button>
					<el-button type="danger" plain icon="el-icon-delete" disabled></el-button>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="listApi" :params="listApiParams" stripe :paginationLayout="'prev, pager, next'">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column label="#" type="index" width="50"></el-table-column>
					<el-table-column label="" width="50">
						<template #default>
							<el-tag type="info" style="cursor: move;"><i class="el-icon-d-caret"></i></el-tag>
						</template>
					</el-table-column>
					<el-table-column label="名称" prop="name" width="150"></el-table-column>
					<el-table-column label="键值" prop="key" width="150"></el-table-column>
					<el-table-column label="是否有效" prop="yx" width="100">
						<template #default="scope">
							<i v-if="scope.row.yx==1" class="el-icon-success" style="color: #67C23A;"></i>
							<i v-if="scope.row.yx==0" class="el-icon-remove" style="color: #DCDFE6;"></i>
						</template>
					</el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>

	<el-dialog :title="titleMap[dicMode]" v-model="dicDialogVisible" :width="600" destroy-on-close>
		<dic-dialog ref="dicDialog" :mode="dicMode"></dic-dialog>
		<template #footer>
			<el-button @click="dicDialogVisible=false" >取 消</el-button>
			<el-button type="primary" @click="saveDic()" :loading="isDicSaveing">保 存</el-button>
		</template>
	</el-dialog>

	<el-dialog :title="titleMap[listMode]" v-model="listDialogVisible" :width="600" destroy-on-close>
		<list-dialog ref="listDialog" :mode="listMode" :params="listDialogParams"></list-dialog>
		<template #footer>
			<el-button @click="listDialogVisible=false" >取 消</el-button>
			<el-button type="primary" @click="saveList()" :loading="isListSaveing">保 存</el-button>
		</template>
	</el-dialog>

</template>

<script>
	import dicDialog from './dic'
	import listDialog from './list'

	export default {
		name: 'dic',
		components: {
			dicDialog,
			listDialog
		},
		data() {
			return {
				showDicloading: true,
				dicDialogVisible: false,
				isDicSaveing: false,
				dicMode: 'add',
				titleMap: {
					add: "新增",
					edit: "编辑",
					show: "查看"
				},
				dicList: [],
				dicFilterText: '',
				dicProps: {
					label: 'name'
				},
				listApi: null,
				listApiParams: {},
				listDialogVisible: false,
				listDialogParams: {},
				isListSaveing: false,
				listMode: 'add',
			}
		},
		watch: {
			dicFilterText(val) {
				this.$refs.dic.filter(val);
			}
		},
		mounted() {
			this.getDic()
		},
		methods: {
			//加载树数据
			async getDic(){
				var res = await this.$API.dic.list.get();
				this.showDicloading = false;
				this.dicList = res.data;
				//获取第一个节点,设置选中 & 加载明细列表
				var firstNode = this.dicList[0];
				if(firstNode){
					this.$nextTick(() => {
						this.$refs.dic.setCurrentKey(firstNode.id)
					})
					this.listApiParams = {
						code: firstNode.code
					}
					this.listApi = this.$API.dic.info;
				}
			},
			//树过滤
			dicFilterNode(value, data){
				if (!value) return true;
				var targetText = data.name + data.code;
				return targetText.indexOf(value) !== -1;
			},
			//树增加
			addDic(){
				this.dicMode = 'add';
				this.dicDialogVisible = true;
			},
			//编辑树
			dicEdit(data){
				this.dicMode = 'edit';
				this.dicDialogVisible = true;
				this.$nextTick(() => {
					this.$refs.dicDialog.setData(data)
				})
			},
			//保存数据
			saveDic(){
				this.$refs.dicDialog.submit(async (formData) => {
					this.isDicSaveing = true;
					var res = await this.$API.user.save.post(formData);
					this.isDicSaveing = false;
					if(res.code == 200){
						//这里选择刷新整个表格 OR 插入/编辑现有表格数据
						if(this.dicMode == 'add'){
							formData.id = (Math.random() * (500 - 400 + 1) | 0) + 400;
							if(this.dicList.length > 0){
								this.$refs.table.upData({
									code: formData.code
								})
							}else{
								this.listApiParams = {
									code: formData.code
								}
								this.listApi = this.$API.dic.info;
							}
							this.$refs.dic.append(formData, formData.parentId[0])
							this.$refs.dic.setCurrentKey(formData.id)
						}
						if(this.dicMode == 'edit'){
							var editNode = this.$refs.dic.getNode(formData.id);
							//判断是否移动？
							var editNodeParentId =  editNode.level==1?undefined:editNode.parent.data.id
							if(editNodeParentId != formData.parentId){
								var obj = editNode.data;
								this.$refs.dic.remove(formData.id)
								this.$refs.dic.append(obj, formData.parentId[0])
							}
							Object.assign(editNode.data, formData)
						}
						this.dicDialogVisible = false;
						this.$message.success("操作成功")
					}else{
						this.$alert(res.message, "提示", {type: 'error'})
					}
				})
			},
			//树点击事件
			dicClick(data){
				this.$refs.table.upData({
					code: data.code
				})
			},
			//删除树
			dicDel(node, data){
				this.$confirm(`确定删除 ${data.name} 项吗？`, '提示', {
					type: 'warning'
				}).then(() => {
					this.showDicloading = true;

					//删除节点是否为高亮当前 是的话 设置第一个节点高亮
					var dicCurrentKey = this.$refs.dic.getCurrentKey();
					this.$refs.dic.remove(data.id)
					if(dicCurrentKey == data.id){
						var firstNode = this.dicList[0];
						if(firstNode){
							this.$refs.dic.setCurrentKey(firstNode.id);
							this.$refs.table.upData({
								code: firstNode.code
							})
						}else{
							this.listApi = null;
							this.$refs.table.tableData = []
						}
					}

					this.showDicloading = false;
					this.$message.success("操作成功")
				}).catch(() => {

				})
			},
			//添加明细
			addInfo(){
				var dicCurrentKey = this.$refs.dic.getCurrentKey();
				this.listDialogParams = {code: dicCurrentKey};
				this.listDialogVisible = true;
			},
			//保存明细
			saveList(){

			}
		}
	}
</script>

<style scoped>
	.custom-tree-node {display: flex;flex: 1;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 24px;height:100%;}
	.custom-tree-node .code {font-size: 12px;color: #999;}
	.custom-tree-node .do {display: none;}
	.custom-tree-node .do i {margin-left:5px;color: #999;padding:5px;}
	.custom-tree-node .do i:hover {color: #333;}
	.custom-tree-node:hover .code {display: none;}
	.custom-tree-node:hover .do {display: inline-block;}
</style>
