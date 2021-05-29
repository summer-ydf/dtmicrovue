module.exports = {
	//设置为空打包后不分更目录还是多级目录
	publicPath:'',
	//build编译后存放静态文件的目录
	//assetsDir: "static",

	// build编译后不生成资源MAP文件
	productionSourceMap: false,

	devServer: {
		open: false, //运行后自动打开游览器
		port: 2800 //挂载端口
	},

	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
	},

	configureWebpack: config => {
		//性能提示
		config.performance = {
			hints: false
		}
		config.optimization = {
			splitChunks: {
				chunks: "async",
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
					//第三方库抽离
					vendor: {
						name: "modules",
						test: /[\\/]node_modules[\\/]/,
						priority: -10
					},
					tinymce: {
						name: "tinymce",
						test: /[\\/]node_modules[\\/]tinymce[\\/]/
					},
					echarts: {
						name: "echarts",
						test: /[\\/]node_modules[\\/]echarts[\\/]/
					}
				}
			}
		}
	}

}
