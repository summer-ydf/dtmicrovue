<template>
    <el-dialog title="操作日志" v-model="visible" width="50%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <div>
                    <el-divider content-position="left">请求地址：</el-divider>
                </div>
                <div>
                    <span>{{this.form.requestUrl}}</span>
                </div>
                <div>
                    <el-divider content-position="left">请求类名：</el-divider>
                </div>
                <div>
                    <span>{{this.form.requestMethodName}}</span>
                </div>
                <div>
                    <el-divider content-position="left">请求参数：</el-divider>
                </div>
                <div>
                    <pre>{{this.form.requestParam}}</pre>
                </div>
                <div>
                    <el-divider content-position="left">响应结果：</el-divider>
                </div>
                <div>
                    <pre>{{this.form.responseParam}}</pre>
                </div>
            </el-main>
        </el-container>
    </el-dialog>
</template>

<script>
export default {
    name: "see",
    emits: ['closed'],
    data() {
        return {
            visible: false,
            //表单数据
            form: {
                title: "",
                businessType: "",
                requestMethodName: "",
                requestMethodType: "",
                requestUserName: "",
                requestUrl: "",
                requestIp: "",
                requestParam: "",
                responseParam: "",
                status: 0,
                errorInfo: ""
            },
        }
    },
    methods: {
        open(){
            this.visible = true
            return this
        },
        //表单注入数据
        setData(data){
            this.form.requestMethodName = data.requestMethodName
            this.form.requestMethodType = data.requestMethodType
            this.form.requestUrl = data.requestUrl
            this.form.requestParam = JSON.parse(data.requestParam)
            this.form.responseParam = JSON.parse(data.responseParam)
        }
    }
}
</script>

<style scoped>

</style>
