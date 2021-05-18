<template>
	<el-main>

		<el-card shadow="never" header="基础示例">
			<sc-upload v-model="imgurl" :action="uploadUrl"></sc-upload>
			<sc-upload v-model="avatar" :action="uploadUrl"></sc-upload>
			<sc-upload v-model="avatar" title="上传头像" icon="el-icon-picture-outline" :action="uploadUrl"></sc-upload>
		</el-card>

		<el-card shadow="never" header="在验证表单中使用">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="身份证" class="imglist" required>
					<el-col>
						<el-form-item prop="img1">
							<sc-upload v-model="form.img1" title="人像面" :action="uploadUrl"></sc-upload>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item prop="img2">
							<sc-upload v-model="form.img2" title="国徽面" :action="uploadUrl"></sc-upload>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="日期" prop="date">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">保存</el-button>
				    <el-button @click="resetForm">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card shadow="never" header="多选">
			<sc-upload-multiple v-model="imgs" :action="uploadUrl"></sc-upload-multiple>
			<el-input v-model="imgs"></el-input>
		</el-card>

	</el-main>
</template>

<script>
	import multiple from '@/components/scUpload/multiple'

	export default {
		name: 'upload',
		components: {
			scUploadMultiple: multiple
		},
		data() {
			return {
				uploadUrl: this.$API.demo.upload.url,
				imgurl: "images/avatar.jpg",
				avatar: "",
				imgs: "images/avatar.jpg,images/avatar2.gif,images/avatar3.gif",
				form: {
					img1: "",
					img2: "",
					date: ""
				},
				rules: {
					img1: [
						{required: true, message: '请上传', trigger: 'blur'}
					],
					img2: [
						{required: true, message: '请上传', trigger: 'blur'}
					],
					date: [
						{required: true, message: '请选择日期', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			submitForm(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						alert('submit!');
					}else{
						return false;
					}
				})
			},
			resetForm(){
				this.$refs.ruleForm.resetFields();
			}
		}
	}
</script>

<style scoped>
	.el-card+.el-card {margin-top: 15px;}

	.imglist {margin-bottom:0;}
	.imglist .el-col+.el-col {margin-left: 10px;}
</style>
