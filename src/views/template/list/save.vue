<!--
 * @Descripttion: 文件描述
 * @version: 1.0
 * @Author: 编写作者
 * @Date: 创建时间
 * @LastEditors: 最后更新作者
 * @LastEditTime: 最后更新时间
-->

<template>
	<div class="sc-page-header">
		<div class="sc-page-header__title">
			<h2>新开标签页面</h2>
			<p>可用于非常复杂的表单提交，如一些较为简单的表单提交应使用dialog或者drawer更合适</p>
		</div>
	</div>
	<el-main>
		<el-card shadow="never">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
					<div class="el-form-item-msg" data-v-b33b3cf8="">组件名字以sc开头，并坚持以“小驼峰”命名规则</div>
				</el-form-item>
				<el-form-item label="缩略图" prop="img">
					<sc-upload v-model="form.img" title="上传缩略图"></sc-upload>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio-button label="1">数据</el-radio-button>
						<el-radio-button label="2">表单</el-radio-button>
						<el-radio-button label="3">样式</el-radio-button>
						<el-radio-button label="4">其他</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="负责人" prop="name">
					<el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="进度" prop="img">
					<el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium">保 存</el-button>
				</el-form-item>
			</el-form>
		</el-card>

	</el-main>
</template>

<script>
	export default {
		name: 'list-save',
		data() {
			return {
				id: this.$route.params.id,
				form: {
					name: "",
					type: "1"
				},
				rules: {

				}
			}
		},
		mounted() {
			if(this.id){
				this.$store.commit("updateViewTags", {
					path: this.$route.path,
					meta: {
						title:"详情ID="+this.id
					}
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.sc-page-header {background: #fff;border-bottom: 1px solid #e6e6e6;padding:25px 25px;}
	.sc-page-header__title h2 {font-size: 17px;color: #3c4a54;font-weight: bold;}
	.sc-page-header__title p {font-size: 13px;color: #999;margin-top: 15px;}
</style>
