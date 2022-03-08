<template>
	<el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="请选择左侧部门后操作" :image-size="100"></el-empty>
		</el-col>
		<template v-else>
			<el-col :lg="24">
				<h2>{{form.label || "新增部门"}}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="部门名称" prop="label">
						<el-input v-model="form.label" clearable placeholder="部门名称"></el-input>
						<div class="el-form-item-msg">同一个组织机构，部门名称唯一，不可重复</div>
					</el-form-item>
					<el-form-item label="上级部门" prop="parentId">
						<el-cascader v-model="form.parentId" :options="deptOptions" :props="deptProps" :show-all-levels="true" placeholder="顶级部门" clearable disabled></el-cascader>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save" :loading="loading">保 存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</template>
	</el-row>
</template>

<script>
export default {
	name: "save.vue",
	props: {
		dept: { type: Object, default: () => {} },
	},
	data(){
		return {
			form: {
				id: "",
				parentId: "",
				label: ""
			},
			deptOptions: [],
			deptProps: {
				value: 'id',
				label: 'label',
				checkStrictly: true
			},
			rules: [],
			loading: false
		}
	},
	watch: {
		dept: {
			handler(){
				this.deptOptions = this.treeToMap(this.dept)
			},
			deep: true
		}
	},
	methods: {
		//简单化菜单
		treeToMap(tree){
			const map = []
			tree.forEach(item => {
				var obj = {
					id: item.id,
					parentId: item.parentId,
					label: item.label,
					children: item.children&&item.children.length>0 ? this.treeToMap(item.children) : null
				}
				map.push(obj)
			})
			return map
		},
		//保存
		async save(){
			this.loading = true
			let res = await this.$API.system.dept.save.post(this.form)
			this.loading = false
			if(res.code === 2000){
				this.$message.success("保存成功")
			}else{
				this.$message.warning(res.message)
			}
		},
		//表单注入数据
		setData(data, pid){
			this.form = data
			this.form.parentId = pid
		}
	}
}
</script>

<style scoped>
h2 {font-size: 17px;color: #3c4a54;padding:0 0 30px 0;}
[data-theme="dark"] h2 {color: #fff;}
</style>
