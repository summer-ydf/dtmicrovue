<template>
    <el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-scrollbar>
                    <el-row class="drawer-table">
                        <el-col :span="24">
                            <el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
                                <el-form-item label="登录账号" prop="username">
                                    <el-input v-model="form.username" placeholder="请输入登录账号" clearable :disabled="mode==='edit'"></el-input>
                                </el-form-item>
                                <template v-if="mode==='add'">
                                    <el-form-item label="登录密码" prop="password">
                                        <el-input type="password" v-model="form.password" placeholder="请输入登录密码" clearable show-password></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="password2">
                                        <el-input type="password" v-model="form.password2" placeholder="请确认密码" clearable show-password></el-input>
                                    </el-form-item>
                                </template>
                                <el-form-item label="使用范围" prop="scope">
                                    <el-radio-group v-model="form.scope">
                                        <el-radio label="web">PC端</el-radio>
                                        <el-radio label="app">手机端</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="所属角色" prop="roleIds">
                                    <el-select v-model="form.roleIds" multiple placeholder="请选择用户角色" style="width: 100%">
                                        <el-option
                                            v-for="item in roles"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="deptName">
									<el-input @click="showDepartmentDialog(form.deptId)" v-model="form.deptName" placeholder="请选择部门"></el-input>
                                </el-form-item>
                                <el-form-item label="头像" prop="avatar">
                                    <sc-upload v-model="form.avatar" title="上传头像"></sc-upload>
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
	<department-dialog v-if="dialog.department" ref="departmentDialog"
					   @closed="dialog.department=false"
					   @dept-event="getDeptEvent"
					   :deptId="defKeys">
	</department-dialog>
</template>

<script>
	import departmentDialog from './department';
	export default {
		name: "update.vue",
		components: {departmentDialog},
		emits: ['success', 'closed'],
		data() {
			return {
				visible: false,
				saveLoading: false,
				mode: "add",
				titleMap: {
					add: '新增用户',
					edit: '编辑用户'
				},
				dialog: {
					department: false
				},
				// 默认选中值
				defKeys: [],
				//表单数据
				form: {
					id:"",
					username: "",
					password: "",
					avatar: "",
					scope: "",
					roleIds: [],
					deptId: "",
					deptName: ""
				},
				//角色数据
				roles:[],
				//验证规则
				rules: {
					username: [
						{required: true, message: '请输入登录账号'}
					],
					scope: [
						{required: true, message: '请输入使用范围'}
					],
					password: [
						{required: true, message: '请输入登录密码'},
						{validator: (rule, value, callback) => {
								if (this.form.password2 !== '') {
									this.$refs.dialogForm.validateField('password2');
								}
								callback();
							}}
					],
					password2: [
						{required: true, message: '请再次输入密码'},
						{validator: (rule, value, callback) => {
								if (value !== this.form.password) {
									callback(new Error('两次输入密码不一致!'));
								}else{
									callback();
								}
							}}
					],
					roleIds: [
						{required: true, message: '请选择所属角色',trigger: 'blur'}
					]
				},
			}
		},
		mounted() {
			this.getRole()
		},
		methods: {
			//显示
			open(mode = 'add'){
				this.mode = mode;
				this.visible = true;
				return this
			},
			//获取角色信息
			async getRole(){
				var res = await this.$API.system.role.findAll.get();
				this.roles = res.data;
			},
			//表单提交方法
			submit(){
				this.$refs.dialogForm.validate(async (valid) => {
					if (valid) {
						this.saveLoading = true;
						var res = await this.$API.system.user.save.post(this.form);
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
				this.form.username = data.username
				this.form.avatar = data.avatar
				this.form.scope = data.scope
				this.form.deptId = data.deptId
				this.form.deptName = data.deptName
				this.form.roleIds = data.roleIds
				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			},
			// 显示部门树
			showDepartmentDialog(id) {
				// 父组件向子组件传值
				this.defKeys = [id]
				this.dialog.department = true
				this.$nextTick(() => {
					this.$refs.departmentDialog.open()
				})
			},
			// 获取子组件选中的部门信息
			getDeptEvent(data) {
				this.form.deptId = data.id
				this.form.deptName = data.label
			}
		}
	}
</script>

<style scoped>

</style>
