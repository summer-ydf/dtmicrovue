<template>
    <el-main>
        <el-card shadow="never">
            <el-tabs tab-position="top">
                <el-tab-pane v-for="item in configData" :key="item.key" :label="item.title">
                    <el-form ref="form" :model="settingForm" label-width="100px" style="margin-top: 20px;">
                        <div v-for="m in item.models" :key="m.key">
                            <div v-if="m.type === 'input'">
                                <el-form-item :label="m.title">
                                    <el-input v-model="m.value" :placeholder="m.placeholder"></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="m.type === 'switch'">
                                <el-form-item :label="m.title">
                                    <el-switch v-model="m.value" active-value="1" inactive-value="0"></el-switch>
                                </el-form-item>
                            </div>
                            <div v-if="m.type === 'select'">
                                <el-form-item :label="m.title">
                                    <el-select v-model="m.value" :placeholder="m.placeholder">
                                        <el-option v-for="item in m.data" :key="item" :label="item" :value="item"> </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item>
                            <el-button type="primary" :loading="saveLoading" @click="submit()">保存配置</el-button>
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
            configData: [],
            settingForm: {},
            saveLoading: false
        }
    },
    created() {
        this.getConfigs()
    },
    methods: {
        async getConfigs() {
            var res = await this.$API.system.config.list.get();
            if (res.code === 2000) {
                this.configData = res.data
                console.log(this.configData)
            }
        },
        async submit() {
            this.configData.forEach((s) => {
                s.models.forEach((m) => {
                    this.settingForm[m.key] = m.value;
                });
            });
            this.saveLoading = true;
            var res = await this.$API.system.config.save.post(this.settingForm);
            this.saveLoading = false;
            if (res.code === 2000) {
                this.$message.success(res.message)
            } else {
                this.$alert(res.message, "提示", {type: 'error'})
            }
        }
    }
}
</script>

<style>
</style>
