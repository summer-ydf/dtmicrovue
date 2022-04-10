<template>
	<el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
		<el-container>
			<el-main class="nopadding">
				<el-scrollbar>
					<el-row class="drawer-table">
						<el-col :span="24">
							<el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
								<el-form-item label="任务名称" prop="taskName">
									<el-input v-model="form.taskName" placeholder="请输入任务名称" clearable></el-input>
								</el-form-item>
								<el-form-item label="任务组" prop="taskGroupName" :disabled="mode==='edit'">
									<el-radio-group v-model="form.taskGroupName">
										<el-radio label="default">默认</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="任务类名" prop="jobClass">
									<el-input v-model="form.jobClass" placeholder="请输入任务类名" clearable></el-input>
								</el-form-item>
								<el-form-item label="表达式" prop="cronExpression">
                                    <el-input v-model="form.cronExpression" placeholder="请输入定时策略" clearable></el-input>
								</el-form-item>
								<el-form-item label="参数" prop="params">
									<el-input type="textarea" :rows="2" v-model="form.params" placeholder="请输入json格式的参数" clearable></el-input>
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
					add: '新增任务',
					edit: '编辑任务'
				},
				//表单数据
				form: {
					id:"",
					taskId: "",
					taskName: "",
					taskGroupName: "default",
					jobClass: "",
					cronExpression: "",
					status: 0,
					params: ""
				},
				//验证规则
				rules: {
					taskName: [
						{required: true, message: '请输入任务名称'}
					],
					jobClass: [
						{required: true, message: '请输入任务对象实例',trigger: 'blur'}
					],
					cronExpression: [
						{required: true, message: '请输入任务时间表达式'}
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
                        var res = null
                        if (this.form.id !== '') {
                            res = await this.$API.task.job.update.post(this.form);
                        }else {
                            res = await this.$API.task.job.save.post(this.form);
                        }
                        if (res !== null) {
                            this.saveLoading = false;
                            if(res.code === 2000){
                                this.$emit('success', this.form, this.mode)
                                this.visible = false;
                                this.$message.success(res.message)
                            }else{
                                this.$alert(res.message, "提示", {type: 'error'})
                            }
                        }
					}else{
						return false;
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.taskId = data.taskId
				this.form.taskName = data.taskName
				this.form.taskGroupName = data.taskGroupName
				this.form.jobClass = data.jobClass
				this.form.cronExpression = data.cronExpression
				this.form.params = data.params
				this.form.status = data.status
			},
		}
	}
</script>

<style scoped>

</style>
