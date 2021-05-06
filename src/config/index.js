
const DEFAULT_CONFIG = {
	//标题
	APP_NAME: "SCUI",
	//版本号
	APP_VER: "0.0.0",
	//接口地址
	API_URL: ""
}

//如果有外部APP_CONFIG就合并
if(APP_CONFIG){
	Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

module.exports = DEFAULT_CONFIG
