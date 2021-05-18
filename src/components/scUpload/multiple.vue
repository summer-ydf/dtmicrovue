<template>
	<div class="">
		<div class="sc-upload-list">
			<ul>
				<li v-for="(file, index) in fileList" :key="index">
					<div v-if="file.status!='success'">
						loading
					</div>
					<div v-else>
						<div class="mask">
							<span class="del" @click.stop="del(index)"><i class="el-icon-delete"></i></span>
						</div>
						<el-image class="image" :src="file.url" :preview-src-list="[file.url]" fit="cover" hide-on-click-modal append-to-body></el-image>
					</div>
				</li>
			</ul>
		</div>

		<div class="sc-upload-uploader">
			<el-upload ref="upload" :action="action" :accept="accept" multiple :show-file-list="true" :file-list="defaultList" :before-upload="before" :on-success="success" :on-remove="remove" :on-error="error">
				<el-button size="small" type="primary">点击上传</el-button>
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
		},
		data(){
			return {
				defaultList: this.toArr(this.modelValue),
				fileList: []
			}
		},
		watch:{
			modelValue(){

			},
			fileList: {
				handler(val){
					this.$emit('update:modelValue', this.toStr(val));
				},
				deep: true
			}
		},
		mounted() {
			this.fileList = this.$refs.upload.uploadFiles

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
				console.log(this.$refs.upload.uploadFiles);
			},
			success(res, file){
				file.url = res.data.src
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
				this.fileList.splice(index, 1);
			}
		}
	}
</script>

<style scoped>
	.sc-upload-list li {list-style: none;    display: inline-block;width: 120px;height: 120px;}
	.sc-upload-list .image {width: 100%;height: 100%;}
</style>
