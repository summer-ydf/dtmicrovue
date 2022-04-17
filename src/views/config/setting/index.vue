<template>
    <el-main>
        <el-card shadow="never">
            <el-tabs tab-position="top">
                <el-tab-pane v-for="item in configs" :label="item.title">
                    <el-form ref="form" :model="settingForm" label-width="100px" style="margin-top: 20px;">
                        <el-form-item v-for="m in item.models" :key="m.k" :label="m.title">
                            <el-input v-model="m.v" :placeholder="m.placeholder"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit()">保 存</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </el-main>
</template>

<script>
export default {
    name: 'system',
    data() {
        return {
            configs: [
                {
                    type: "1",
                    title: "微信公众号",
                    models: [
                        {
                            k: "wx.appid1",
                            v: "11",
                            title: "微信公众号1",
                            placeholder: "请输入应用ID"
                        },
                        {
                            k: "wx.appid2",
                            v: "12",
                            title: "微信公众号2",
                            placeholder: "请输入应用ID"
                        },
                    ]
                },
                {
                    type: "2",
                    title: "企业微信",
                    models: [
                        {
                            k: "wx.appid3",
                            v: "123456",
                            title: "微信公众号3",
                            placeholder: "请输入应用ID"
                        },
                        {
                            k: "wx.appid4",
                            v: "123456",
                            title: "微信公众号4",
                            placeholder: "请输入应用ID"
                        },
                    ]
                }
            ],
            settingForm: {
                enabled: false
            }
        }
    },
    methods: {
        submit() {
            this.configs.forEach((s) => {
                console.log(s.type)
                s.models.forEach((m) => {
                    this.settingForm[m.k] = m.v;
                });
            });
            console.log(JSON.stringify(this.settingForm))
        }
    }
}
</script>

<style>
</style>
