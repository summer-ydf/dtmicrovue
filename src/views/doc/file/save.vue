<template>
	<el-dialog title="上传文件" v-model="visible" width="27%" destroy-on-close @closed="$emit('closed')">
		<el-container>
			<el-main class="nopadding" style="text-align: center">
				<el-upload
					ref="upload"
					drag
					:action="uploadUrl"
					:data="{bucketName:bucketName}"
                    :headers="importHeaders"
					:limit="1"
					:auto-upload="false"
                    :beforeUpload="beforeUpload"
					:on-success="handleSuccess"
				>
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">
						 <em>将文件拖拽到特定区域上传 或 点击上传</em>
					</div>
					<template #tip>
						<div class="el-upload__tip">
							文件大小限制： 最大不能超过1G
						</div>
					</template>
				</el-upload>
			</el-main>
		</el-container>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'
import config from "@/config"
import tool from "@/utils/tool";
export default {
	name: "save",
	emits: ['closed'],
	components: {
		UploadFilled
	},
	data() {
		return {
			visible: false,
            // 上传携带token
            importHeaders: "",
			// 上传地址
			uploadUrl: "",
			// 携带参数
			bucketName: "default"
		}
	},
    created() {
        let token = tool.data.get("TOKEN");
        if (token) {
            let tokenValue = config.TOKEN_PREFIX + token
            this.importHeaders = {"Authorization" : tokenValue}
        }
    },
    methods: {
		open(){
			this.visible = true
			return this
		},
		submit() {
			this.uploadUrl = `${config.DOC_URL}/file/uploadFile`
			this.$nextTick(() => {
				this.$refs.upload.submit()
			})
		},
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 1024
            if(!isLt2M) {
                this.$message.warning("注意：上传文件大小不能超过1G!");
            }
            return isLt2M
        },
		handleSuccess(response) {
            this.$emit('success')
            this.visible = false;
            this.$message.success("上传成功")
		}
	}
}
</script>

<style scoped>

</style>
