<template>
	<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item label="编码" prop="code">
					<el-input v-model="form.code" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="字典名称" prop="name">
					<el-input v-model="form.name" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="上级字典" prop="parentId">
					<el-cascader v-model="form.parentId" :options="dic" :props="dicProps" :show-all-levels="false" clearable></el-cascader>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default {
		props: {
			mode: { type: String, default: "add" }
		},
		data() {
			return {
				form: {
					id:"",
					name: "",
					code: "",
					parentId: ""
				},
				rules: {
					code: [
						{required: true, message: '请输入编码'}
					],
					name: [
						{required: true, message: '请输入字典名称'}
					]
				},
				dic: [],
				dicProps: {
					value: "id",
					label: "name",
					checkStrictly: true
				}
			}
		},
		mounted() {
			this.getDic()
		},
		methods: {
			//获取字典列表
			async getDic(){
				var res = await this.$API.dic.list.get();
				this.dic = res.data;
			},
			//表单提交方法
			submit(callback){
				this.$refs.dialogForm.validate((valid) => {
					if (valid) {
						callback(this.form)
					}else{
						return false;
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.name = data.name
				this.form.code = data.code
				this.form.parentId = data.parentId
			
				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
