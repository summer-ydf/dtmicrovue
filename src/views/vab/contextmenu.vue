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
					<div style="height:1000px"></div>
					contextmenu
				</el-card>
			</el-col>
		</el-row>
	</el-main>

	<transition name="el-zoom-in-top">
		<div v-if="visible" ref="contextmenu" class="sc-contextmenu" :style="{left:left+'px',top:top+'px'}" @contextmenu.prevent="fun">
			<ul class="sc-contextmenu__menu">
				<li><span class="title"><i class="sc-contextmenu__icon"></i>返回(B)</span><span class="sc-contextmenu__suffix">Alt+←</span></li>
				<li><span class="title"><i class="sc-contextmenu__icon"></i>前进(O)</span><span class="sc-contextmenu__suffix">Alt+→</span></li>
				<li><span class="title"><i class="sc-contextmenu__icon el-icon-refresh"></i>重新加载(R)</span><span class="sc-contextmenu__suffix">Ctrl+R</span></li>
				<hr>
				<li><span class="title"><i class="sc-contextmenu__icon"></i>网页另存为(S)...</span></li>
				<li><span class="title"><i class="sc-contextmenu__icon"></i>复制网页地址</span></li>
				<hr>
				<li @mouseenter="openSubmenu($event)"  @mouseleave="closeSubmenu($event)">
					<span class="title"><i class="sc-contextmenu__icon"></i>切换兼容性模式</span>
					<span class="sc-contextmenu__suffix"><i class="el-icon-arrow-right"></i></span>
					<ul class="sc-contextmenu__menu">
						<li><span class="title"><i class="sc-contextmenu__icon"></i>二级菜单1</span></li>
						<li @mouseenter="openSubmenu($event)"  @mouseleave="closeSubmenu($event)">
							<span class="title"><i class="sc-contextmenu__icon"></i>二级菜单2</span>
							<span class="sc-contextmenu__suffix"><i class="el-icon-arrow-right"></i></span>
							<ul class="sc-contextmenu__menu">
								<li><span class="title"><i class="sc-contextmenu__icon"></i>三级菜单1</span></li>
								<li><span class="title"><i class="sc-contextmenu__icon"></i>三级菜单2</span></li>
								<li><span class="title"><i class="sc-contextmenu__icon"></i>三级菜单3333333333333333333</span></li>
							</ul>
						</li>
						<li><span class="title"><i class="sc-contextmenu__icon"></i>二级菜单3</span></li>
					</ul>
				</li>
				<hr>
				<li class="disabled"><span class="title"><i class="sc-contextmenu__icon"></i>属性(P)</span></li>
			</ul>
		</div>
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
			fun(){
				return false;
			},
			openMenu(e) {
				this.visible = true
				this.left = e.clientX + 1
				this.top = e.clientY + 1

				this.$nextTick(() => {
					var ex = e.clientX + 1
					var ey = e.clientY + 1
					var innerWidth = window.innerWidth
					var innerHeight = window.innerHeight
					var menuHeight = this.$refs.contextmenu.offsetHeight
					var menuWidth = this.$refs.contextmenu.offsetWidth
					//位置修正公示
					//left = (当前点击X + 菜单宽度 > 可视区域宽度 ? 可视区域宽度 - 菜单宽度 : 当前点击X)
					//top = (当前点击Y + 菜单高度 > 可视区域高度 ? 当前点击Y - 菜单高度 : 当前点击Y)
					this.left = ex + menuWidth > innerWidth ? innerWidth - menuWidth : ex
					this.top = ey + menuHeight > innerHeight ? ey - menuHeight : ey
				})

			},
			closeMenu() {
				this.visible = false;
			},
			openSubmenu(e){
				var menu = e.target.querySelector('ul')
				menu.style.display = 'inline-block'
				var rect = menu.getBoundingClientRect()
				var menuX = rect.left
				var menuY = rect.top
				var innerWidth = window.innerWidth
				var innerHeight = window.innerHeight
				var menuHeight = menu.offsetHeight
				var menuWidth = menu.offsetWidth
				if(menuX + menuWidth > innerWidth){
					menu.style.left = 'auto'
					menu.style.right = '100%'
				}
				if(menuY + menuHeight > innerHeight){
					menu.style.top = 'auto'
					menu.style.bottom = '0'
				}
			},
			closeSubmenu(e){
				var menu = e.target.querySelector('ul')
				menu.removeAttribute("style")
				menu.style.display = 'none'
			}
		}
	}
</script>

<style scoped>
	.sc-contextmenu {position: fixed;}

	.sc-contextmenu__menu {display: inline-block;min-width: 120px;border: 1px solid #e4e7ed;background: #fff;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);z-index: 3000;list-style-type: none;padding: 10px 0;}



	.sc-contextmenu__menu > hr {
		margin:5px 0;
		border: none;
		height: 1px;
		font-size: 0px;
		background-color: #ebeef5;
	}
	.sc-contextmenu__menu > li {
		margin:0;
		cursor: pointer;
		line-height: 30px;
		padding: 0 17px 0 10px;
		color: #606266;
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		text-decoration: none;
		position: relative;
	}
	.sc-contextmenu__menu > li:hover {
		background-color: #ecf5ff;
		color: #66b1ff;
	}
	.sc-contextmenu__menu > li.disabled {
		cursor: not-allowed;
		color: #bbb;
		background: transparent;
	}
	.sc-contextmenu__icon {
		display: inline-block;
		width: 14px;
		font-size: 14px;
		margin-right: 10px;
	}
	.sc-contextmenu__suffix {margin-left: 40px;color: #999;}

	.sc-contextmenu__menu li ul {position: absolute;top:0px;left:100%;display: none;margin: -10px 0;}
	/* .sc-contextmenu__menu li:hover > ul {display: inline-block;} */

</style>
