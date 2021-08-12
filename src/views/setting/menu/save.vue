<template>
	<el-row :gutter="20">
		<el-col :xl="12" :lg="16">

			<h2>{{form.meta.title || "新增菜单"}}</h2>
			<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
				<el-form-item label="显示名称" prop="meta.title">
					<el-input v-model="form.meta.title" clearable placeholder="菜单显示名字"></el-input>
				</el-form-item>
				<el-form-item label="上级菜单" prop="parent">
					<el-cascader v-model="form.parent" :options="menu" :props="menuProps" :show-all-levels="false" clearable></el-cascader>
					<div class="el-form-item-msg">这里还有点问题！el-cascader的props的label 现暂只支持字符串还未支持自定义函数 </div>
				</el-form-item>
				<el-form-item label="类型" prop="meta.type">
					<el-radio-group v-model="form.meta.type">
						<el-radio-button label="menu">菜单</el-radio-button>
						<el-radio-button label="iframe">Iframe</el-radio-button>
						<el-radio-button label="link">外链</el-radio-button>
						<el-radio-button label="button">按钮</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="别名" prop="name">
					<el-input v-model="form.name" clearable placeholder="菜单别名"></el-input>
					<div class="el-form-item-msg">系统唯一且与内置组件名一致，否则导致缓存失效。如类型为Iframe的菜单，别名将代替源地址显示在地址栏</div>
				</el-form-item>
				<el-form-item label="菜单图标" prop="meta.icon">
					<sc-icon-select v-model="form.meta.icon" clearable></sc-icon-select>
				</el-form-item>
				<el-form-item label="路由地址" prop="path">
					<el-input v-model="form.path" clearable placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="重定向" prop="redirect">
					<el-input v-model="form.redirect" clearable placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="菜单高亮" prop="active">
					<el-input v-model="form.active" clearable placeholder=""></el-input>
					<div class="el-form-item-msg">子节点或详情页需要高亮的上级菜单路由地址</div>
				</el-form-item>
				<el-form-item label="视图" prop="component">
					<el-autocomplete v-model="form.component" :fetch-suggestions="querySearch" :debounce="10" clearable placeholder=""></el-autocomplete>
					<div class="el-form-item-msg">如父节点、链接或Iframe等没有视图的菜单不需要填写</div>
				</el-form-item>
				<el-form-item label="颜色" prop="color">
					<el-color-picker v-model="form.color" :predefine="predefineColors"></el-color-picker>

				</el-form-item>
				<el-form-item label="是否隐藏" prop="meta.hidden">
					<el-checkbox v-model="form.meta.hidden">隐藏菜单</el-checkbox>
					<el-checkbox v-model="form.meta.hiddenBreadcrumb">隐藏面包屑</el-checkbox>
					<div class="el-form-item-msg">菜单不显示在导航中，但用户依然可以访问，例如详情页</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">保 存</el-button>
				</el-form-item>
			</el-form>

		</el-col>
		<el-col :xl="12" :lg="8">
			<el-alert title="温馨提示" class="tips">
				<p>
					<b>排序和位置：</b>
					可以通过拖拽菜单树来完成排序和更改位置的操作
				</p>
				<p>
					<b>别名：</b>
					系统唯一且与内置组件名一致，当类型为菜单时充当路由name，当类型为按钮时充当权限标识，当类型为Iframe和外链时充当http://链接地址
				</p>
				<p>
					<b>视图：</b>
					如父节点、链接或Iframe等没有视图的菜单不需要填写。视图地址需在VUE源码中@/views/中相对应的地址，前缀不需要填写“/”
				</p>
			</el-alert>
		</el-col>
	</el-row>

</template>

<script>
	import scIconSelect from '@/components/scIconSelect'

	export default {
		components: {
			scIconSelect
		},
		props: {
			menu: { type: Object, default: () => {} },
		},
		data(){
			return {
				form: {
					parent: "",
					name: "",
					path: "",
					component: "",
					redirect: "",
					meta:{
						title: "",
						icon: "",
						active: "",
						color: "",
						type: "menu"
					}
				},
				menuProps: {
					value: 'name',
					label: 'name',
					checkStrictly: true
				},
				predefineColors: [
					'#ff4500',
					'#ff8c00',
					'#ffd700',
					'#67C23A',
					'#00ced1',
					'#409EFF',
					'#c71585'
				],
				rules: {},
				views: []
			}
		},
		mounted() {
			this.views = this.getViews();
		},
		methods: {
			//表单注入数据
			setData(data, pid){
				this.form = data
				this.form.parent = pid
				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			},
			//获取所有视图组件
			getViews(){
				const filesUrl = []
				//不知道为什么 require.context 会引起Webpack会一并把结果都打包进来使得此文件过大
				// let files = require.context('@/views', true, /\.vue$/)
				// files.keys().forEach(file => {
				// 	// 如需删除index? .replace(/\/index$/, "")
				// 	filesUrl.push({
				// 		value: file.replace(/^\.\/(.*)\.\w+$/, '$1')
				// 	})
				// })
				return filesUrl;
			},
			querySearch(queryString, cb){
				var results = this.getViews();
				results = results.filter(item => item.value.indexOf(queryString) !== -1)
				cb(results)
			}
		}
	}
</script>

<style scoped>
	h2 {font-size: 17px;color: #3c4a54;padding:0 0 30px 0;}
	.tips {line-height: 1.8;padding:20px;}
	.tips p {margin-bottom: 10px;}
</style>
