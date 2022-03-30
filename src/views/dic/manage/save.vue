<template>
	<el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
		<el-container>
			<el-main class="nopadding">
				<el-scrollbar>
					<el-row class="drawer-table">
						<el-col :span="24">
							<el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
								<el-form-item label="代码" prop="code">
									<el-input type="number" v-model="form.code" placeholder="请输入3位数字的代码" clearable></el-input>
								</el-form-item>
								<el-form-item label="名称" prop="name">
									<el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
								</el-form-item>
								<el-form-item label="类别" prop="category">
									<el-select v-model="form.category" placeholder="请选择类别" style="width: 100%">
										<el-option
											v-for="item in dicList"
											:key="item.code"
											:label="item.label"
											:value="item.code"
										>
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="状态" prop="enabled">
									<el-radio-group v-model="form.enabled">
										<el-radio :label="1">启用</el-radio>
										<el-radio :label="0">禁用</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</el-scrollbar>
			</el-main>
			<el-footer>
				<el-button v-if="mode!=='show'" :loading="saveLoading" @click="submit()" type="primary" size="small">保 存</el-button>
				<el-button size="small" @click="visible=false">取 消</el-button>
			</el-footer>
		</el-container>
	</el-drawer>
</template>

<script>
export default {
	name: "save",
	emits: ['success', 'closed'],
	data() {
		return {
			visible: false,
			saveLoading: false,
			mode: "add",
			titleMap: {
				add: '新增字典',
				edit: '编辑字典'
			},
			//表单数据
			form: {
				id:"",
				code: "",
				name: "",
				category: "",
				enabled: 1
			},
			//字典类别
			dicList: [
				{
					label: "基础字典",
					code: "baseType",
				}, {
					label: "公告字典",
					code: "noticeType",
				}, {
					label: "消息字典",
					code: "messageType",
				}, {
					label: "数据字典",
					code: "dataType",
				}
			],
			//验证规则
			rules: {
				code: [
					{required: true, message: '请输入代码'}
				],
				name: [
					{required: true, message: '请输入名称'}
				],
				category: [
					{required: true, message: '请选择分类'}
				],
			},
		}
	},
	methods: {
		//显示
		open(mode = 'add'){
			this.mode = mode;
			this.visible = true;
			return this
		},
		//表单提交方法
		submit(){
			this.$refs.dialogForm.validate(async (valid) => {
				if (valid) {
					this.saveLoading = true;
					var res = await this.$API.system.dic.save.post(this.form);
					this.saveLoading = false;
					if(res.code === 2000){
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						this.$message.success(res.message)
					}else{
						this.$alert(res.message, "提示", {type: 'error'})
					}
				}else{
					return false;
				}
			})
		},
		//表单注入数据
		setData(data){
			this.form.id = data.id
			this.form.code = data.code
			this.form.name = data.name
			this.form.category = data.category
			this.form.enabled = data.enabled ? 1 : 0
		},
	}
}
</script>

<style scoped>

</style>
