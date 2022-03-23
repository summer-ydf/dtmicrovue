<template>
    <el-dialog title="数据权限设置" v-model="visible" width="30%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限范围" prop="dataScope">
                        <el-select v-model="form.dataScope" @change="changeScopeData">
                            <el-option label="全部数据权限" :value=1></el-option>
                            <el-option label="自定义数据权限" :value=2></el-option>
                            <el-option label="本部门数据权限" :value=3></el-option>
                            <el-option label="本部门及以下数据权限" :value=4></el-option>
                            <el-option label="仅本人数据权限" :value=5></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="form.dataScope === 2" label="数据权限" prop="remark">
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
				// 树形控件的属性绑定对象
				treeProps: {
					children: 'children',
					label: 'label'
				},
				// 默认选中的节点id值
				defKeys: [1000000204663981,1000001200689941],
                //验证规则
                rules: {

                }
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
            changeScopeData(v) {
                // alert(v)
            },
			handleNodeClick(data, checked) {
			},
			// 获取所有部门信息
			async getTreeData() {
				var res = await this.$API.system.dept.list.get();
				this.treeData = res.data
			},
            //表单提交方法
            async submit() {
                // 选中的子节点id
                let checkIds = this.$refs.dept.getCheckedKeys()
                let ids = []
                let treeNodes = this.$refs.dept.getCheckedNodes(false, true)
                // 选中子节点的父节点id
                for(var i = 0; i < treeNodes.length; i++) {
                    if(treeNodes[i].parentId !== '0') {
                        ids.push(treeNodes[i].parentId);
                    }
                }
                // 去重
                let parentIds = Array.from(new Set(ids));
                let menuIds = checkIds.concat(parentIds)
                let menuList = Array.from(new Set(menuIds));
                this.saveLoading = true;
                let data = {
                    roleId: this.form.roleId,
                    dataScope: this.form.dataScope,
                    deptIds: menuList
                }
                var res = await this.$API.system.role.saveRoleMenu.post(data);
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
            	console.log("数据======")
				console.log(JSON.stringify(data))
				this.form.id = data.id
				this.form.roleId = data.id
				this.form.roleName = data.name
				this.form.dataScope = data.dataScope
				//this.defKeys = data.deptIds
			}
        }
    }
</script>

<style scoped>

</style>
