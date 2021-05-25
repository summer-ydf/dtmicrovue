import API from "@/api";

/**
 * 自定义上传图片插件
 */
class MyUploadAdapter {
	constructor(loader) {
		this.loader = loader;
	}

	async upload() {
		const data = new FormData();
		data.append("file", await this.loader.file);
		const res = await API.default.upload.post(data)
		return {
			default: res.data.src,
		};
	}
}

export default MyUploadAdapter;
