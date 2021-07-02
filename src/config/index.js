const DEFAULT_CONFIG = {
	//标题
	APP_NAME: "SCUI",

	//版本号
	APP_VER: "1.1.13",

	//接口地址
	API_URL: "",

	//MOCK接口地址
	MOCK_URL: "https://www.fastmock.site/mock/44c807475f7eeba73409792255781935/api",

	//布局 默认：default | 通栏：header
	LAYOUT: 'default',

	//菜单是否折叠
	MENU_IS_COLLAPSE: false,

	//是否开启多标签
	LAYOUT_TAGS: true,

	//控制台首页默认布局
	DEFAULT_GRID: {
		//默认分栏数量和宽度 例如 [24] [18,6] [8,8,8] [6,12,6]
		layout: [18, 6],
		//小组件分布，com取值:views/home/components 文件名
		copmsList: [
			[{ title: "模块1", com: 'C1' },{ title: "模块3", com: 'C3' }],
			[{ title: "模块2", com: 'C2' }],
			[]
		]
	}
}

// 如果生产模式，就合并动态的APP_CONFIG
// public/config.js
if(process.env.NODE_ENV === 'production'){
	Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

module.exports = DEFAULT_CONFIG
