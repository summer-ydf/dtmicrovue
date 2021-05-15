<template>
	<div class="sc-upload">
		<div v-show="img!=''" class="sc-upload-file">
			<div class="mask">
				<span class="del" @click.stop="del"><i class="el-icon-delete"></i></span>
			</div>
			<el-image class="file" :src="img" :preview-src-list="[img]" hide-on-click-modal append-to-body></el-image>
		</div>
		<div v-show="img==''" class="sc-upload-uploader">
			<el-upload ref="upload" v-loading="loading" class="uploader" accept=".JPG, .PNG, .JPEG,.jpg, .png, .jpeg" action="https://www.fastmock.site/mock/44c807475f7eeba73409792255781935/api/upload" :show-file-list="false" :before-upload="before" :on-success="success" :on-error="error">
				<div class="file-empty">
					上传
				</div>
			</el-upload>
		</div>
		<el-input v-model="img" style="display:none"></el-input>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: { type: String, default: "" }
		},
		data() {
			return {
				loading: false,
				img: ""
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


		},
		methods: {
			before(file){
				this.img = URL.createObjectURL(file);
				this.loading = true;
			},
			success(res){
				this.loading = false;
				this.img = res.data.src;
			},
			error(err){
				console.log(err.message);
				this.loading = false;
				this.img = ""
			},
			del(){
				this.img = ""
			}
		}
	}
</script>

<style scoped>

	.el-form-item.is-error .sc-upload {border: 1px solid #F56C6C;}

	.sc-upload {width: 100px;height: 100px;}
	.sc-upload-file {position: relative;width: 100px;height: 100px;}
	.sc-upload-file .mask {display: none;position: absolute;top:0px;right:0px;line-height: 1;z-index: 1;}
	.sc-upload-file .mask span {display: inline-block;width: 25px;height:25px;line-height: 23px;text-align: center;cursor: pointer;color: #fff;}
	.sc-upload-file .mask span i {font-size: 12px;}
	.sc-upload-file .mask .del {background: #F56C6C;}
	.sc-upload-file .file {width: 100px;height: 100px;}
	.sc-upload-file .file img {vertical-align: bottom;}
	.sc-upload-file:hover .mask {display: inline-block;}


	.sc-upload-uploader {}
	.sc-upload-uploader .file-empty {width: 100px;height: 100px;background: #f5f5f5;}

</style>
