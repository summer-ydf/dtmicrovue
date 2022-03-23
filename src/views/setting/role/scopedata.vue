<template>
    <el-dialog title="数据权限设置" v-model="visible" width="25%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限范围" prop="dataScope">
                        <el-select v-model="form.dataScope">
                            <el-option label="全部数据权限" :value=1></el-option>
                            <el-option label="自定义数据权限" :value=2></el-option>
                            <el-option label="本部门数据权限" :value=3></el-option>
                            <el-option label="本部门及以下数据权限" :value=4></el-option>
                            <el-option label="仅本人数据权限" :value=5></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="form.dataScope === 2" label="数据权限" prop="dataScope">
						<el-tree ref="dept"
								 node-key="id"
								 :data="treeData"
								 :default-checked-keys="defKeys"
								 :props="treeProps"
								 :default-expand-all="true"
								 @check-change="handleNodeClick"
								 show-checkbox>
						</el-tree>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <template #footer>
            <el-button @click="visible=false" >取 消</el-button>
            <el-button type="primary" :loading="saveLoading" @click="submit()">保 存</el-button>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        emits: ['success', 'closed'],
        data() {
            return {
                visible: false,
				saveLoading: false,
                //表单数据
                form: {
                    id:"",
                    roleName: "",
                    roleId: "",
                    dataScope: 1,
                    deptIds: []
                },
				treeData: [],
				//树形控件的属性绑定对象
				treeProps: {
					children: 'children',
					label: 'label'
				},
				//默认选中的字节点id值（后台筛选过滤）
				defKeys: [],
                //验证规则
                rules: {}
            }
        },
		created() {
			this.getTreeData()
		},
        methods: {
            open(){
                this.visible = true
                return this
            },
			handleNodeClick(data, checked) {
			},
			//获取所有部门信息
			async getTreeData() {
				var res = await this.$API.system.dept.list.get();
				this.treeData = res.data
			},
            //表单提交方法
            async submit() {
                let ids = []
				if(this.form.dataScope === 2) {
					// 1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
					let treeNodes = this.$refs.dept.getCheckedNodes(false, true)
					for(var i = 0; i < treeNodes.length; i++) {
						if(treeNodes[i].parentId !== '0') {
							ids.push(treeNodes[i].id);
						}
					}
				    if (ids.length <= 0) {
						this.$message.error("请选择数据权限！")
						return
					}
				}
                this.saveLoading = true;
                let data = {
                    roleId: this.form.roleId,
                    dataScope: this.form.dataScope,
                    deptIds: ids
                }
                var res = await this.$API.system.role.saveRoleDataScope.post(data);
                this.saveLoading = false;
                if (res.code === 2000) {
                    this.$emit('success', this.form, this.mode)
                    this.visible = false;
                    this.$message.success(res.message)
                } else {
                    this.$alert(res.message, "提示", {type: 'error'})
                }
            },
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.roleId = data.id
				this.form.roleName = data.name
				this.form.dataScope = data.dataScope
				this.defKeys = data.deptIds
			}
        }
    }
</script>

<style scoped>

</style>
