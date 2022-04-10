<template>
	<el-dialog title="角色权限设置" v-model="visible" width="20%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-tree ref="menu"
                         node-key="id"
                         :data="menu.list"
                         :default-checked-keys="menu.checked"
                         :props="menu.props"
                         :default-expand-all="false"
                         @check-change="handleNodeClick"
                         show-checkbox>
                </el-tree>
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
        props: {
            menuProps: {
                roleId: String,
                defKeys: Array
            }
        },
		data() {
			return {
				visible: false,
                saveLoading: false,
				menu: {
					list: [],
					checked: [],
					props: {
						label: (data)=>{
							return data.meta.title
						}
					}
				},
				group: {
					list: [],
					checked: [],
					props: {}
				},
			}
		},
		mounted() {
			this.getMenu()
            this.menu.checked = this.menuProps.defKeys
		},
		methods: {
			open(){
				this.visible = true;
			},
			async getMenu(){
				var res = await this.$API.system.menu.list.get();
				this.menu.list = res.data;
			},
            handleNodeClick(data, checked) {
            },
            //表单提交方法
            async submit() {
			    // 选中的子节点id
                let checkIds = this.$refs.menu.getCheckedKeys()
                let ids = []
                let treeNodes = this.$refs.menu.getCheckedNodes(false, true)
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
                    roleId: this.menuProps.roleId,
                    menuIds: menuList
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
		}
	}
</script>

<style scoped>

</style>
