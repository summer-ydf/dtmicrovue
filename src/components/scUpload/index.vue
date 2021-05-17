<template>
	<div class="sc-upload" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
		<div v-if="tempImg || img" class="sc-upload-file">
			<div class="mask">
				<span class="del" @click.stop="del"><i class="el-icon-delete"></i></span>
			</div>
			<el-image class="file" :src="tempImg || img" :preview-src-list="[img]" fit="cover" hide-on-click-modal append-to-body></el-image>
		</div>
		<div v-else class="sc-upload-uploader">
			<el-upload ref="upload" class="uploader" :accept="accept" :action="action" :show-file-list="false" :before-upload="before" :on-success="success" :on-error="error">
				<div class="file-empty">
					<i :class="icon"></i>
					<h4>{{title}}</h4>
				</div>
			</el-upload>
		</div>
		<el-input v-model="img" style="display:none"></el-input>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: { type: String, default: "" },
			action: { type: String, default: "#" },
			accept: { type: String, default: ".jpg, .png, .jpeg, .gif" },
			maxSize: { type: Number, default: 10 },
			title: { type: String, default: "上传" },
			icon: { type: String, default: "el-icon-plus" },
			multiple: { type: Boolean, default: false },
		},
		data() {
			return {
				loading: false,
				img: "",
				tempImg: ""
			}
		},
		watch:{
			modelValue(){
				this.img = this.modelValue;
			},
			img(){
				this.$emit('update:modelValue', this.img);
			}
		},
		mounted() {
			this.img = this.modelValue;
		},
		methods: {
			before(file){
				const maxSize = file.size / 1024 / 1024 < this.maxSize;
				if (!maxSize) {
					this.$message.warning('上传文件大小不能超过 10MB!');
					return false;
				}
				this.tempImg = URL.createObjectURL(file);
				this.loading = true;
			},
			success(res){
				this.loading = false;
				this.tempImg = "";
				if(res.code != 200){
					this.$message.warning(res.message || "上传文件未知错误")
				}else{
					this.img = res.data.src;
				}
				this.$emit('on-success', res)
			},
			error(err){
				this.$notify.error({
					title: '上传文件错误',
					message: err
				})
				this.loading = false;
				this.tempImg = "";
				this.img = ""
			},
			del(){
				this.img = ""
			}
		}
	}
</script>

<style>
	.sc-upload+.sc-upload {margin-left: 10px;}
</style>

<style scoped>
	.el-form-item.is-error .sc-upload-uploader {border: 1px dashed #F56C6C;}

	.sc-upload {width: 120px;height: 120px;display: inline-block;vertical-align: top;box-sizing: border-box;}

	.sc-upload-file {position: relative;width: 100%;height: 100%;}
	.sc-upload-file .mask {display: none;position: absolute;top:0px;right:0px;line-height: 1;z-index: 1;}
	.sc-upload-file .mask span {display: inline-block;width: 25px;height:25px;line-height: 23px;text-align: center;cursor: pointer;color: #fff;}
	.sc-upload-file .mask span i {font-size: 12px;}
	.sc-upload-file .mask .del {background: #F56C6C;}
	.sc-upload-file .file {width: 100%;height: 100%;}
	.sc-upload-file .file img {vertical-align: bottom;}
	.sc-upload-file:hover .mask {display: inline-block;}

	.sc-upload-uploader {border: 1px dashed #d9d9d9;box-sizing: border-box;width: 100%;height: 100%;}
	.sc-upload-uploader:hover {border: 1px dashed #409eff;}
	.sc-upload-uploader .uploader {width: 100%;height: 100%;}
	.sc-upload-uploader >>> .el-upload  {width: 100%;height: 100%;}

	.sc-upload-uploader .file-empty {width: 100%;height: 100%;line-height: 1;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.sc-upload-uploader .file-empty i {font-size: 28px;color: #8c939d;}
	.sc-upload-uploader .file-empty h4 {font-size: 12px;font-weight: normal;color: #8c939d;margin-top: 10px;}
</style>
