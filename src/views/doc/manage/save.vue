<template>
	<el-dialog title="上传文件" v-model="visible" width="25%" destroy-on-close @closed="$emit('closed')">
		<el-container>
			<el-main class="nopadding">
				<el-upload
					class="upload-demo"
					drag
					action="https://jsonplaceholder.typicode.com/posts/"
					multiple
				>
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">
						Drop file here or <em>click to upload</em>
					</div>
					<template #tip>
						<div class="el-upload__tip">
							jpg/png files with a size less than 500kb
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
	}
}
</script>

<style scoped>

</style>
