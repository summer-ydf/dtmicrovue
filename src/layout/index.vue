<template>
	<Side v-if="!ismobile"></Side>
	<Side-m v-if="ismobile"></Side-m>
	<div class="aminui-body el-container">
		<Head></Head>
		<Tags v-if="!ismobile"></Tags>
		<div class="adminui-main" id="adminui-main">
			<router-view></router-view>
		</div>
	</div>
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

			}
		},
		computed:{
			ismobile(){
				return this.$store.state.global.ismobile
			}
		},
		created() {
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
			}
		}
	}
</script>
