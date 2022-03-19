<template>
	<el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
		<el-container>
			<el-main class="nopadding">
				<el-scrollbar>
					<el-row class="drawer-table">
						<el-col :span="24">
                            <el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
                                <el-form-item label="角色名称" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入角色名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="角色别名" prop="alias">
                                    <el-input v-model="form.alias" placeholder="请输入角色别名" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="备注" prop="remark">
                                    <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
                                </el-form-item>
                            </el-form>
						</el-col>
					</el-row>
				</el-scrollbar>
			</el-main>
			<el-footer>
				<el-button v-if="mode!=='show'" :loading="isSaveing" @click="submit()" type="primary" size="small">保 存</el-button>
				<el-button size="small" @click="visible=false">取 消</el-button>
			</el-footer>
		</el-container>
	</el-drawer>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增',
					edit: '编辑'
				},
				visible: false,
				isSaveing: false,
				//表单数据
				form: {
					id:"",
					name: "",
					alias: "",
					remark: ""
				},
				//验证规则
				rules: {
					name: [
						{required: true, message: '请输入角色名称'}
					],
					alias: [
						{required: true, message: '请输入角色别名'}
					]
				}
			}
		},
		mounted() {

		},
		methods: {
			//显示
			open(mode='add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.isSaveing = true;
						var res = await this.$API.system.role.save.post(this.form);
						this.isSaveing = false;
						if(res.code === 2000){
							this.$emit('success', this.form, this.mode)
							this.visible = false;
							this.$message.success(res.message)
						}else{
							this.$alert(res.message, "提示", {type: 'error'})
						}
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.name = data.name
				this.form.alias = data.alias
				this.form.remark = data.remark
			}
		}
	}
</script>

<style>
</style>
