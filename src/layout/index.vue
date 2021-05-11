<template>
	<Side v-if="!ismobile"></Side>

	<div class="aminui-body el-container">
		<Head @mobile-nav="mobileNav"></Head>
		<Tags v-if="!ismobile"></Tags>
		<div class="adminui-main" id="adminui-main">
			<router-view></router-view>
		</div>
	</div>

	<el-drawer ref="mobileNavBox" title="移动端菜单" :size="240" v-model="mobileNavBox" direction="ltr" :with-header="false" append-to-body destroy-on-close>
		<SideM></SideM>
	</el-drawer>

</template>

<script>
	import Side from './components/side.vue';
	import SideM from './components/sideM.vue';
	import Head from './components/head.vue';
	import Tags from './components/tags.vue';

	export default {
		name: 'index',
		components: {
			Side,
			SideM,
			Head,
			Tags
		},
		data() {
			return {
				mobileNavBox: false
			}
		},
		computed:{
			ismobile(){
				return this.$store.state.global.ismobile
			}
		},
		mounted() {
			this.onLayoutResize();
			window.addEventListener('resize', this.onLayoutResize);
		},
		methods: {
			onLayoutResize(){
				const clientWidth = document.body.clientWidth;
				if(clientWidth < 992){
					this.$store.commit("SET_ismobile", true)
				}else{
					this.$store.commit("SET_ismobile", false)
				}
			},
			mobileNav(){
				this.mobileNavBox = true
			}
		}
	}
</script>
