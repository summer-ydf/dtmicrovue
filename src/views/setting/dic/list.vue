<template>
	<el-form :model="form" :rules="rules" ref="dialogForm" label-width="100px" label-position="left">
		<el-form-item label="所属字典" prop="dic">
			<el-cascader v-model="form.dic" :options="dic" :props="dicProps" :show-all-levels="false" clearable></el-cascader>
		</el-form-item>
		<el-form-item label="项名称" prop="name">
			<el-input v-model="form.name" clearable></el-input>
		</el-form-item>
		<el-form-item label="键值" prop="key">
			<el-input v-model="form.key" clearable></el-input>
		</el-form-item>
		<el-form-item label="是否有效" prop="yx">
			<el-switch v-model="form.yx" active-value="1" inactive-value="0"></el-switch>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		props: {
			mode: { type: String, default: "add" },
			params: { type: Object, default: () => {} }
		},
		data() {
			return {
				form: {
					id: "",
					dic: "",
					name: "",
					key: "",
					yx: "1"
				},
				rules: {
					dic: [
						{required: true, message: '请选择所属字典'}
					],
					name: [
						{required: true, message: '请输入项名称'}
					],
					key: [
						{required: true, message: '请输入键值'}
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
			if(this.params){
				this.form.dic = this.params.code
			}
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
				this.form.key = data.key
				this.form.yx = data.yx
				this.form.dic = data.dic
			}
		}
	}
</script>

<style>
</style>
