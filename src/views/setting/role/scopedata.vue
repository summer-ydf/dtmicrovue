<template>
    <el-dialog title="数据权限设置" v-model="visible" width="30%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px">
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限范围" prop="scope">
                        <el-select v-model="form.scope" @change="changeScopeData">
                            <el-option label="全部数据权限" value="1"></el-option>
                            <el-option label="自定义数据权限" value="2"></el-option>
                            <el-option label="本部门数据权限" value="3"></el-option>
                            <el-option label="本部门及以下数据权限" value="4"></el-option>
                            <el-option label="仅本人数据权限" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="form.scope === '2'" label="数据权限" prop="remark">
                        <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <template #footer>
            <el-button @click="visible=false" >取 消</el-button>
            <el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        emits: ['success', 'closed'],
        data() {
            return {
                visible: false,
                isSaveing: false,
                //表单数据
                form: {
                    id:"",
                    name: "",
                    scope: "1",
                    remark: ""
                },
                //验证规则
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称'}
                    ]
                }
            }
        },
        methods: {
            open(){
                this.visible = true;
            },
            changeScopeData(v) {
                // alert(v)
            },
            //表单提交方法
            async submit() {
                // 选中的子节点id
                // let checkIds = this.$refs.menu.getCheckedKeys()
                // let ids = []
                // let treeNodes = this.$refs.menu.getCheckedNodes(false, true)
                // // 选中子节点的父节点id
                // for(var i = 0; i < treeNodes.length; i++) {
                //     if(treeNodes[i].parentId !== '0') {
                //         ids.push(treeNodes[i].parentId);
                //     }
                // }
                // // 去重
                // let parentIds = Array.from(new Set(ids));
                // let menuIds = checkIds.concat(parentIds)
                // let menuList = Array.from(new Set(menuIds));
                // this.saveLoading = true;
                // let data = {
                //     roleId: this.menuProps.roleId,
                //     menuIds: menuList
                // }
                // var res = await this.$API.system.role.saveRoleMenu.post(data);
                // this.saveLoading = false;
                // if (res.code === 2000) {
                //     this.$emit('success', this.form, this.mode)
                //     this.visible = false;
                //     this.$message.success(res.message)
                // } else {
                //     this.$alert(res.message, "提示", {type: 'error'})
                // }
            },
        }
    }
</script>

<style scoped>

</style>
