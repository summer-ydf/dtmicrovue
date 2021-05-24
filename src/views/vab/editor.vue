<template>
	<el-main>
		<el-card shadow="never">
			<sc-editor v-model="html" placeholder="请输入"></sc-editor>
		</el-card>
	</el-main>
</template>

<script>
	import { defineAsyncComponent } from 'vue';
	const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));

	export default {
		name: "editor",
		components: {
			scEditor
		},
		data(){
			return {
				html: '<h2 style="text-align:center;"><span style="font-size:24px;">CKEditor 5</span></h2><p style="text-align:center;">SCUI 二次封装</p><p>&nbsp;</p><p>&nbsp;</p><p>关于富文本编辑器真的是个大坑，在选择的过程中我也走了不少弯路，基本上世面上几款主流的富文本编辑器都试过来了。</p><p>&nbsp;</p><p>先说下为什么选择ckeditor5作为SCUI的富文本默认编辑器，第一次用ckeditor是早期DEDECMS年代，它后台所使用的就是ckeditor，经过了近10年的更新也迭代到了5.0，而ckeditor官网的online builder(在线编译)是我最后选择它的原因。不用import各种样式、工具和插件，傻瓜式的操作生成出中文的自定义组件的属于自己的ckeditor5，它的文档也是相比的几款编辑器中最全，演示最多的，唯一不足的就是没有官方中文文档。最后它的几款增值服务真的非常牛(协同编辑等)，有兴趣的同学可以去它的 <a href="https://ckeditor.com/"><span style="color:hsl(210, 75%, 60%);">官网</span></a> 了解下。</p><p>&nbsp;</p><p>这次封装后支持v-model双向绑定模式，也开放了几个props</p><figure class="table" style="width:100%;"><table><tbody><tr><td style="background-color:hsl(0, 0%, 60%);padding:15px;width:200px;" colspan="3"><p style="text-align:center;"><span style="color:hsl(0, 0%, 100%);"><strong>props</strong></span></p></td></tr><tr><td style="background-color:hsl(0, 0%, 90%);padding:15px;width:200px;">v-model</td><td style="padding:15px;width:200px;">String</td><td style="padding:15px;">编辑器内的富文本</td></tr><tr><td style="background-color:hsl(0, 0%, 90%);padding:15px;">placeholder</td><td style="padding:15px;">String</td><td style="padding:15px;">属性提供可描述输入字段预期值的提示信息，默认为空</td></tr><tr><td style="background-color:hsl(0, 0%, 90%);padding:15px;">toolbar</td><td style="padding:15px;">Array</td><td style="padding:15px;">需要显示的头部工具，配置相当暴力直接，默认全部</td></tr><tr><td style="background-color:hsl(0, 0%, 90%);padding:15px;">disabled</td><td style="padding:15px;">Boolean</td><td style="padding:15px;">是否禁用编辑器</td></tr></tbody></table></figure><p>当前页面使用了异步加载组件，因为ckeditor5打包后的文件实在太大了（1M），采用异步加载可极大加快页面打开速度。正因为文件大小的关系，不再考虑将编辑器作为全局组件，毕竟使用频次比表单之类的要少很多。因为非常独立，耦合度基本为零，可随意删除，减少打包后的文件大小</p>'
			}
		}
	}
</script>

<style>
</style>
