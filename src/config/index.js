
const DEFAULT_CONFIG = {
	//标题
	APP_NAME: "SCUI",
	//版本号
	APP_VER: "1.0.2",
	//接口地址
	API_URL: ""
}

// 如果生产模式，就合并动态的APP_CONFIG
// public/config.js
if(process.env.NODE_ENV === 'production'){
	Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

module.exports = DEFAULT_CONFIG
