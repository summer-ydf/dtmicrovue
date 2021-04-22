<template>
	<div class="adminui-tags">
		<ul>
			<li v-for="tag in tagList" v-bind:key="tag" :class="isActive(tag) ? 'active' : '' " @contextmenu.prevent="openContextMenu($event, tag)">
				<router-link :to="tag">
				{{ tag.meta.title }}
				<i v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop='closeSelectedTag(tag)'></i>
				</router-link>
			</li>
		</ul>
	</div>

	<ul v-if="contextMenuVisible" :style="{left:left+'px',top:top+'px'}" class="contextmenu" id="contextmenu">
		<li @click="refreshTab()">刷新</li>
		<hr>
		<li @click="closeTabs()" :class="contextMenuItem.meta.affix?'disabled':''">关闭标签</li>
		<li @click="closeOtherTabs()">关闭其他标签</li>
	</ul>

</template>

<style>
	.contextmenu {
		position: fixed;
		margin:0;
		border-radius: 4px;
		background: #fff;
		border: 1px solid #e4e7ed;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		z-index: 3000;
		list-style-type: none;
		padding: 10px 0;
	}
	.contextmenu hr {
		margin:5px 0;
		border: none;
		height: 1px;
		font-size: 0px;
		background-color: #ebeef5;
	}
	.contextmenu li {
		margin:0;
		cursor: pointer;
		line-height: 30px;
		padding: 0 17px;
		color: #606266;
	}
	.contextmenu li:hover {
		background-color: #ecf5ff;
		color: #66b1ff;
	}
	.contextmenu li.disabled {
		cursor: not-allowed;
		color: #bbb;
		background: transparent;
	}

</style>

<script>
	export default {
		name: "tags",
		data() {
			return {
				contextMenuVisible: false,
				contextMenuItem: null,
				left: 0,
				top: 0,
				tagList: []
			}
		},
		props: {},
		setup() {

		},
		watch: {
			$route(e) {
				this.addViewTags(e)
			},
			contextMenuVisible(value) {
				var _this = this;
				var cm = function(e){
					let sp = document.getElementById("contextmenu");
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
			this.addViewTags(this.$router.options.routes[0].children[0].children[0]);
			this.addViewTags(this.$route);
		},
		methods: {
			//增加tag
			addViewTags(route) {
				var ishas = this.tagList.some(item=>{
					if(item.path == route.path){
						return true
					}
				})
				if(!ishas){
					this.$store.commit("pushKeepLive",route.name)
					this.tagList.push(route)
				}
			},
			//高亮tag
			isActive(route) {
				return route.path === this.$route.path
			},
			//关闭tag
			closeSelectedTag(tag) {
				const newtagList = this.tagList.filter(item => item.path !== tag.path)
				this.tagList = newtagList;
				this.$store.commit("removeKeepLive", tag.name)
				if (this.isActive(tag)) {
					const latestView = newtagList.slice(-1)[0]
					if (latestView) {
						this.$router.push(latestView)
					} else {
						this.$router.push('/')
					}
				}
			},
			//tag右键
			openContextMenu(e, tag){
				this.contextMenuItem = tag;
				this.contextMenuVisible = true;
				this.left = e.clientX + 1;
				this.top = e.clientY + 1;
			},
			//关闭右键菜单
			closeMenu() {
				this.contextMenuItem = null;
				this.contextMenuVisible = false
			},
			//TAB 刷新
			refreshTab(){
				var nowTag = this.contextMenuItem;
				this.$router.push({
					path: nowTag.path
				})
				this.contextMenuVisible = false
			},
			//TAB 关闭
			closeTabs(){
				var nowTag = this.contextMenuItem;
				if(!nowTag.meta.affix){
					this.closeSelectedTag(nowTag)
					this.contextMenuVisible = false
				}
			},
			//TAB 关闭其他
			closeOtherTabs(){
				var nowTag = this.contextMenuItem;
				var tags = this.tagList;
				tags.forEach(tag => {
					if(tag.meta&&tag.meta.affix || nowTag.path==tag.path){
						return true
					}else{
						this.closeSelectedTag(tag)
					}
				})
				this.contextMenuVisible = false
			}
		}
	}
</script>
