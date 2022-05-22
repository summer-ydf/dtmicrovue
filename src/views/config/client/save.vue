<template>
    <el-drawer :title="titleMap[mode]" v-model="visible" :size="400" append-to-body destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-scrollbar>
                    <el-row class="drawer-table">
                        <el-col :span="24">
                            <el-form :model="form" :rules="rules" :disabled="mode==='show'" ref="dialogForm" label-width="80px">
                                <el-form-item label="客户端ID" prop="clientId">
                                    <el-input v-model="form.clientId" placeholder="请输入客户端ID" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="密钥" prop="clientSecret">
                                    <el-input v-model="form.clientSecret" placeholder="请输入客户端密钥" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="访问域" prop="scope">
                                    <el-input v-model="form.scope" placeholder="请输入访问域" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="授权模式" prop="authorizedGrantTypesArray">
                                    <el-select v-model="form.authorizedGrantTypesArray" multiple placeholder="请选择授权模式" style="width: 100%">
                                        <el-option
                                            v-for="item in grantTypes"
                                            :key="item.code"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="认证时效" prop="accessTokenValidity">
                                    <el-input v-model.number="form.accessTokenValidity" placeholder="请输入认证令牌时效，单位/s" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="刷新时效" prop="refreshTokenValidity">
                                    <el-input v-model.number="form.refreshTokenValidity" placeholder="请输入刷新令牌时效，单位/s" clearable></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-scrollbar>
            </el-main>
            <el-footer>
                <el-button :loading="isSaveing" @click="submit()" type="primary" size="small">保 存</el-button>
                <el-button size="small" @click="visible=false">取 消</el-button>
            </el-footer>
        </el-container>
    </el-drawer>
</template>

<script>
export default {
    emits: ['success', 'closed'],
    data() {
        return {
            mode: "add",
            titleMap: {
                add: '新增',
                edit: '编辑'
            },
            visible: false,
            isSaveing: false,
            // 授权模式
            grantTypes: [
                {code: 1, value: 'password',label: "密码模式"},
                {code: 2, value: 'refresh_token',label: "刷新令牌"},
                {code: 3, value: 'captcha',label: "验证码模式"},
                {code: 4, value: 'sms_code',label: "手机验证码模式"},
                {code: 5, value: 'wechat',label: "微信模式"},
                {code: 6, value: 'id_card',label: "身份证模式"},
                {code: 7, value: 'authorization_code',label: "授权码模式"}
            ],
            //表单数据
            form: {
                clientId: "",
                clientSecret: "",
                scope: "all",
                authorizedGrantTypesArray: [],
                accessTokenValidity: 3600,
                refreshTokenValidity: 7200
            },
            //验证规则
            rules: {
                clientId: [
                    {required: true, message: '请输入客户端ID'}
                ],
                clientSecret: [
                    {required: true, message: '请输入客户端密钥'}
                ],
                scope: [
                    {required: true, message: '请输入访问域'}
                ],
                authorizedGrantTypesArray: [
                    {required: true, message: '请选择授权模式',trigger: 'blur'}
                ],
                accessTokenValidity: [
                    {required: true, message: '请输入认证令牌时效'},
                    {type: "number", message: "必须为整数" }
                ],
                refreshTokenValidity: [
                    {required: true, message: '请输入刷新令牌时效'},
                    {type: "number", message: "必须为整数" }
                ]
            }
        }
    },
    mounted() {

    },
    methods: {
        //显示
        open(mode='add'){
            this.mode = mode;
            this.visible = true;
            return this
        },
        //表单提交方法
        submit(){
            this.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    this.isSaveing = true;
                    var res = await this.$API.system.client.save.post(this.form);
                    this.isSaveing = false;
                    if(res.code === 2000){
                        this.$emit('success', this.form, this.mode)
                        this.visible = false;
                        this.$message.success(res.message)
                    }else{
                        this.$alert(res.message, "提示", {type: 'error'})
                    }
                }
            })
        },
        //表单注入数据
        setData(data){
            this.form.clientId = data.clientId
            this.form.clientSecret = data.clientSecret
            this.form.scope = data.scope
            this.form.accessTokenValidity = data.accessTokenValidity
            this.form.refreshTokenValidity = data.refreshTokenValidity
            this.form.authorizedGrantTypesArray = data.authorizedGrantTypes.split(',')
        }
    }
}
</script>

<style>
</style>
