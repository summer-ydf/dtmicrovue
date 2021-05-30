<template>
	<div class="adminui-topbar">
		<div class="left-panel">
			<div class="menu-collapse hidden-sm-and-down" @click="$store.commit('TOGGLE_menuIsCollapse')">
				<i class="el-icon-s-fold"></i>
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right" class="hidden-sm-and-down">
				<template v-for="(item) in breadList" v-bind:key="item" >
					<el-breadcrumb-item v-if="item.path !='/'">{{item.meta.title}}</el-breadcrumb-item>
				</template>
			</el-breadcrumb>
		</div>
		<div class="center-panel"></div>
		<div class="right-panel">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				breadList: []
			}
		},
		created() {
			this.getBreadcrumb();
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
		},
		methods: {
			getBreadcrumb(){
				let matched = this.$route.matched;
				this.breadList = matched;
			}
		}
	}
</script>
