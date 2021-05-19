<template>
	<div class="sc-upload-multiple">

		<div class="sc-upload-list">
			<ul>
				<li v-for="(file, index) in defaultFileList" :key="index">
					<div v-if="file.status!='success'">
						loading
					</div>
					<div v-else>
						<div class="mask">
							<span class="del" @click.stop="del(index)"><i class="el-icon-delete"></i></span>
						</div>
						<el-image class="image" :src="file.url" :preview-src-list="preview" :initial-index="index" fit="cover" hide-on-click-modal append-to-body></el-image>
					</div>
				</li>
			</ul>
			{{defaultFileList}}
		</div>

		<div class="sc-upload-uploader">
			<el-upload ref="upload" class="uploader" :action="action" :accept="accept" multiple  :show-file-list="false" :before-upload="before" :on-progress="progress" :on-success="success" :on-change="change" :on-remove="remove" :on-error="error">
				<div class="file-empty">
					<i :class="icon"></i>
					<h4>{{title}}</h4>
				</div>
			</el-upload>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: { type: String, default: "" },
			action: { type: String, default: "#" },
			accept: { type: String, default: ".jpg, .png, .jpeg, .gif" },
			title: { type: String, default: "上传" },
			icon: { type: String, default: "el-icon-plus" }
		},
		data(){
			return {
				defaultFileList: this.toArr(this.modelValue)
			}
		},
		watch:{
			modelValue(val){
				this.defaultFileList = this.toArr(val)
			},
			defaultFileList: {
				handler(val){
					console.log(val);
					this.$emit('update:modelValue', this.toStr(val));
				},
				//deep: true
			}
		},
		computed: {
			preview(){
				return this.defaultFileList.map(v => v.url)
			}
		},
		mounted() {

		},
		methods: {
			//默认值转换为数组
			toArr(str){
				var _arr = [];
				var arr = str.split(",");
				arr.forEach(item => {
					if(item){
						_arr.push({
							name: "F",
							status: "success",
							url: item
						})
					}
				})
				return _arr;
			},
			//数组转换为原始值
			toStr(arr){
				var _arr = [];
				arr.forEach(item => {
					_arr.push(item.url)
				})
				var str = _arr.join(",")
				return str;
			},
			before(){

			},
			change(file){
				if(file.status =='ready'){
					file.aa = "123"
					file.url = URL.createObjectURL(file.raw);
					this.defaultFileList.push(file)
				}
			},
			success(res, file){
				file.url = res.data.src
			},
			progress(){

			},
			remove(){

			},
			error(err){
				this.$notify.error({
					title: '上传文件错误',
					message: err
				})
			},
			del(index){
				this.defaultFileList.splice(index, 1);
				this.$refs.upload.uploadFiles.splice(index-this.defaultFileList.length-1, 1);
			}
		}
	}
</script>

<style scoped>

	.sc-upload-multiple {display: inline-block;}



	.sc-upload-list li {list-style: none;    display: inline-block;width: 120px;height: 120px;}
	.sc-upload-list .image {width: 100%;height: 100%;}


	.sc-upload-uploader {border: 1px dashed #d9d9d9;width: 120px;height: 120px;display: inline-block;vertical-align: top;box-sizing: border-box;}
	.sc-upload-uploader:hover {border: 1px dashed #409eff;}
	.sc-upload-uploader .uploader {width: 100%;height: 100%;}
	.sc-upload-uploader:deep(.el-upload) {width: 100%;height: 100%;}

	.sc-upload-uploader .file-empty {width: 100%;height: 100%;line-height: 1;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.sc-upload-uploader .file-empty i {font-size: 28px;color: #8c939d;}
	.sc-upload-uploader .file-empty h4 {font-size: 12px;font-weight: normal;color: #8c939d;margin-top: 10px;}


</style>
