<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
				<el-popconfirm :title="'确定删除选中的 '+selection.length+' 项吗？'" @confirm="batch_del">
					<template #reference>
						<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0"></el-button>
					</template>
				</el-popconfirm>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.name" placeholder="请输入内容" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
				<scFilterBar ref="scFilterBar" :options="options" @change="updata"></scFilterBar>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="apiObj" :params="{name:'demo',a:'1'}" @selection-change="selectionChange">
				<!-- 表格列开始 -->
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="序号" type="index" width="50"></el-table-column>
				<el-table-column label="头像" width="60">
					<template #default="scope">
						<el-avatar size="small">{{ scope.row.name.substring(0,1) }}</el-avatar>
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="name" width="150"></el-table-column>
				<el-table-column label="进度" prop="progress" width="200">
					<template #default="scope">
						<el-progress :percentage="scope.row.progress" status="success"></el-progress>
					</template>
				</el-table-column>
				<el-table-column label="邮箱" prop="yx" width="150"></el-table-column>
				<el-table-column label="状态" prop="audit" width="50">
					<template #default="scope">
						<el-tag>{{scope.row.audit}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="加入时间" prop="date" width="170"></el-table-column>

				<el-table-column label="操作" fixed="right" align="right" width="140">
					<template #default="scope">
						<el-button @click="table_show(scope.row, scope.$index)" type="text" size="small">查看</el-button>
						<el-button @click="table_edit(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
						<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.$index)">
							<template #reference>
								<el-button type="text" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
				<!-- 表格列结束 -->
			</scTable>
		</el-main>
	</el-container>

	<!-- 弹窗开始 -->
	<el-dialog :title="titleMap[dialogMode]" :width="600" v-model="showDialog" :before-close="closeDialog" append-to-body>
		<el-form :model="form" :rules="rules" :disabled="dialogMode=='show'" ref="dialogForm" label-width="80px" label-position="top">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="名称" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" prop="yx">
						<el-input v-model="form.yx"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="进度" prop="progress">
						<el-input v-model.number="form.progress"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态" prop="audit">
						<el-switch v-model="form.audit" active-value="1" inactive-value="0"></el-switch>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="closeDialog">取 消</el-button>
			<el-button v-if="dialogMode=='add'" type="primary" @click="submitForm()">创 建</el-button>
			<el-button v-if="dialogMode=='edit'" type="primary" @click="editForm()">保 存</el-button>
		</template>
	</el-dialog>
	<!-- 弹窗结束 -->
</template>

<script>
	export default {
		name: 'normallist',
		data() {
			return {
				search : {
					name: ""
				},
				options: [
					{
						label: '状态',
						value: 'type',
						type: 'select',
						extend: {
							data:[
								{
									label: "通过",
									value: "0"
								},
								{
									label: "失败",
									value: "1"
								}
							]
						}
					},
					{
						label: '加入时间',
						value: 'date',
						type: 'daterange'
					}
				],
				apiObj: this.$API.demo.demolist.list,
				selection: [],
				showDialog: false,
				dialogMode: "add",
				editIndex: null,
				titleMap: {
					add: "新增",
					edit: "编辑",
					show: "查看"
				},
				form: {
					name: "",
					audit: "1",
					yx: "",
					progress: 0
				},
				rules: {
					name: [
						{ required: true, message: '请输入名称' },
					],
					yx: [
						{ required: true, message: '请输入完整的邮箱地址' },
					],
					progress: [
						{ required: true, message: '请输入进度' },
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
			//行删除
			table_del(index){
				this.$refs.table.tableData.splice(index, 1);
			},
			//批量删除
			batch_del(){
				var _this = this;
				_this.selection.forEach(function (item) {
					_this.$refs.table.tableData.forEach(function (itemI, indexI) {
						if (item.id === itemI.id) {
							_this.$refs.table.tableData.splice(indexI, 1)
						}
					})
				})
			},
			//关闭弹窗
			closeDialog(){
				this.showDialog = false;
				this.$nextTick(() => {
					this.$refs.dialogForm.resetFields();
				})
			},
			//打开弹窗
			openDialog(mode){
				this.dialogMode = mode;
				this.showDialog = true;
			},
			//新增提交
			submitForm(){
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
						var newData = {
							...this.form,
							id: new Date().getTime(),
							date: "2021-04-30 13:57:00"
						}
						this.$refs.table.tableData.unshift(newData)
						this.closeDialog();
					}else{
						return false;
					}
				})
			},
			//编辑
			table_edit(row, index){
				this.editIndex = index;
				this.openDialog('edit');
				this.$nextTick(() => {
					this.form = {...row}
				});
			},
			//编辑提交
			editForm(){
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
						Object.assign(this.$refs.table.tableData[this.editIndex], this.form)
						this.closeDialog();
					}else{
						return false;
					}
				})
			},
			//查看
			table_show(row){
				this.openDialog('show');
				this.$nextTick(() => {
					this.form = {...row}
				});
			},
			upsearch(){
				var data = Object.assign({}, this.search, this.$refs.scFilterBar.getFilter());
				this.$refs.table.upData(data)
			},
			updata(val){
				var data = Object.assign({},this.search, val);
				this.$refs.table.upData(data)
			}
		}
	}
</script>
