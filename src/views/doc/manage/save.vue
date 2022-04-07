<template>
	<el-dialog title="上传文件" v-model="visible" width="25%" destroy-on-close @closed="$emit('closed')">
		<el-container>
			<el-main class="nopadding" style="text-align: center">
				<el-upload
					class="upload-demo"
					drag
					:action="uploadUrl"
					:auto-upload="false"
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
export default {
	name: "save",
	emits: ['closed'],
	components: {
		UploadFilled
	},
	data() {
		return {
			visible: false,
			uploadUrl: ""
		}
	},
	methods: {
		open(){
			this.visible = true
			return this
		},
		submit() {
			this.uploadUrl = '/upload'
			this.$nextTick(() => {
				this.$refs.upload.submit()
			})
		}
	}
}
</script>

<style scoped>

</style>
