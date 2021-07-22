<!--
 * @Descripttion: 右键简单组件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月22日16:31:14
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" @contextmenu.prevent="openMenu($event)">
					contextmenu
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" @contextmenu.prevent="openMenu($event)">
					contextmenu
				</el-card>
			</el-col>
		</el-row>
	</el-main>

	<transition name="el-zoom-in-top">
		<ul v-if="visible" ref="contextmenu" class="sc-contextmenu" :style="{left:left+'px',top:top+'px'}">
			<li><i></i>返回(B)</li>
			<li><i></i>前进(O)</li>
			<li><i class="el-icon-refresh"></i>重新加载(R)</li>
			<hr>
			<li><i></i>网页另存为(S)...</li>
			<li><i></i>复制网页地址</li>
			<hr>
			<li><i></i>切换兼容性模式</li>
		</ul>
	</transition>

</template>

<script>
	export default {
		name: 'contextmenu',
		data() {
			return {
				visible: false,
				top: 0,
				left: 0
			}
		},
		watch: {
			visible(value) {
				var _this = this;
				var cm = function(e){
					let sp = _this.$refs.contextmenu
					if(sp&&!sp.contains(e.target)){
						_this.closeMenu()
					}
				}
				if (value) {
					document.body.addEventListener('click', e=>cm(e))
				}else{
					document.body.removeEventListener('click',  e=>cm(e))
				}
			}
		},
		mounted() {

		},
		methods: {
			openMenu(e) {
				console.log(e);
				this.visible = true;
				this.left = e.clientX + 1;
				this.top = e.clientY + 1;
			},
			closeMenu() {
				this.visible = false;
			}
		}
	}
</script>

<style scoped>
	.sc-contextmenu {display: inline-block;position: fixed;border: 1px solid #e4e7ed;background: #fff;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);z-index: 3000;list-style-type: none;padding: 10px 0;}
	.sc-contextmenu hr {
		margin:5px 0;
		border: none;
		height: 1px;
		font-size: 0px;
		background-color: #ebeef5;
	}
	.sc-contextmenu li {
		margin:0;
		cursor: pointer;
		line-height: 30px;
		padding: 0 17px 0 10px;
		color: #606266;
	}
	.sc-contextmenu li:hover {
		background-color: #ecf5ff;
		color: #66b1ff;
	}
	.sc-contextmenu li.disabled {
		cursor: not-allowed;
		color: #bbb;
		background: transparent;
	}
	.sc-contextmenu li i {
		display: inline-block;
		width: 14px;
		font-size: 14px;
		margin-right: 10px;
	}
</style>
