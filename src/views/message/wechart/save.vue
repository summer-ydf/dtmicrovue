<template>
    <el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-scrollbar>
                    <el-row class="drawer-table">
                        <el-col :span="24">
                            <el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
                                <el-form-item label="接收人" prop="receiverId">
                                    <el-input v-model="form.receiverId" placeholder="请输入接收人Openid" clearable></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-scrollbar>
            </el-main>
            <el-footer>
                <el-button v-if="mode!=='show'" :loading="saveLoading" @click="submit()" type="primary" size="small">保 存</el-button>
                <el-button size="small" @click="visible=false">取 消</el-button>
            </el-footer>
        </el-container>
    </el-drawer>
</template>

<script>
export default {
    name: "save",
    emits: ['success', 'closed'],
    data() {
        return {
            visible: false,
            saveLoading: false,
            mode: "add",
            titleMap: {
                add: '发送消息测试'
            },
            //表单数据
            form: {
                id:"",
                receiverId: ""
            },
            //验证规则
            rules: {
                receiverId: [
                    {required: true, message: '请输入接收人openid'}
                ],
            },
        }
    },
    methods: {
        //显示
        open(mode = 'add'){
            this.mode = mode;
            this.visible = true;
            return this
        },
        //表单提交方法
        submit(){
            this.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    this.saveLoading = true;
                    var res = await this.$API.message.msg.wx_send_message.post(this.form);
                    if (res !== null) {
                        this.saveLoading = false;
                        if(res.code === 2000){
                            this.$emit('success', this.form, this.mode)
                            this.visible = false;
                            this.$message.success(res.message)
                        }else{
                            this.$alert(res.message, "提示", {type: 'error'})
                        }
                    }
                }else{
                    return false;
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
