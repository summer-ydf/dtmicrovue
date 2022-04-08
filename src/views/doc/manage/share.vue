<template>
    <el-dialog title="分享文件" v-model="visible" width="28%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding" style="text-align: center">
                <el-form :model="form" ref="dialogForm" label-position="top">
                    <el-form-item label="分享对象">
                        <el-card shadow="never">
                            <sc-qr-code :text="form.fileUrl" :size="150" colorDark="#000" colorLight="#fff"></sc-qr-code>
                        </el-card>
                    </el-form-item>
                    <el-form-item label="分享链接" prop="fileUrl">
                        <el-input v-model="form.fileUrl" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="有效时间 (最长七天),单位/s" prop="exp">
                        <el-input type="number" v-model="form.exp" @keyup.enter="onkeyup($event)" placeholder="请输入过期时间设置，单位s" clearable></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <template #footer>
            <el-button @click="visible=false" >取 消</el-button>
            <el-button type="primary" @click="copy($event,form.fileUrl)">一键复制</el-button>
        </template>
    </el-dialog>
</template>

<script>
import Clipboard from 'clipboard'
export default {
    name: "share",
    emits: ['closed'],
    data() {
        return {
            visible: false,
            isSaveing: false,
            form: {
                id: "",
                bucket: "",
                objectName: "",
                fileUrl: "",
                exp: null
            }
        }
    },
    methods: {
        open(){
            this.visible = true
            return this
        },
        //一键复制
        copy(e, text) {
            const clipboard = new Clipboard(e.target, { text: () => text })
            clipboard.on('success', e => {
                this.$message.success("复制成功")
                // 释放内存
                clipboard.off('error')
                clipboard.off('success')
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 不支持复制
                this.$message.success("手机权限不支持复制功能")
                // 释放内存
                clipboard.off('error')
                clipboard.off('success')
                clipboard.destroy()
            })
            clipboard.onClick(e)
        },
        //更新链接
        async onkeyup(event) {
            if (this.form.exp === null || this.form.exp === 0) {
                this.$message.error("请输入有效时长")
                return
            }
            if (this.form.exp > 604800) {
                this.$message.error("有效时长不能大于七天")
                return
            }
            var res = await this.$API.common.file.shareFile.post(this.form);
            if (res.code === 2000) {
                this.$message.success("链接已更新")
                this.form.fileUrl = res.data
            } else {
                this.$alert(res.message, "提示", {type: 'error'})
            }
        },
        //表单注入数据
        setData(data){
            this.form.id = data.id
            this.form.fileUrl = data.fileUrl
            this.form.bucket = data.bucket
            this.form.objectName = data.objectName
        },
    }
}
</script>

<style scoped>

</style>
