<!--
 * @Descripttion: 此文件由SCUI生成，典型的VUE增删改列表页面组件
 * @version: 1.0
 * @Author: SCUI AutoCode 模板版本 1.0.0-beta.1
 * @Date: <%= createDate %>
 * @LastEditors: (最后更新作者)
 * @LastEditTime: (最后更新时间)
-->

<template>
	<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="上级角色" prop="parentId">
					<el-cascader v-model="form.parentId" :options="groups" :props="groupsProps" :show-all-levels="false" clearable></el-cascader>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="排序" prop="sort">
					<el-input-number v-model="form.sort" controls-position="right" :min="1" style="width: 100%;"></el-input-number>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item label="角色名称" prop="label">
					<el-input v-model="form.label" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="角色别名" prop="alias">
					<el-input v-model="form.alias" clearable></el-input>
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
				//表单数据
				form: {
					id:"",
					label: "",
					alias: "",
					parentId: ""
				},
				//验证规则
				rules: {
					sort: [
						{required: true, message: '请输入排序'}
					],
					label: [
						{required: true, message: '请输入角色名称'}
					],
					alias: [
						{required: true, message: '请输入角色别名'}
					]
				},
			}
		},
		mounted(){

		},
		methods: {
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
				this.form.label = data.label
				this.form.alias = data.alias
				this.form.parentId = data.parentId
			
				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
