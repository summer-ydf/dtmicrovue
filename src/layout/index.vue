<template>
	<Side></Side>

	<div class="aminui-body">
		<Head></Head>
		<Tags></Tags>
		<div class="adminui-main">
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
	</div>

</template>

<script>
	import Side from './components/side.vue';
	import Head from './components/head.vue';
	import Tags from './components/tags.vue';

	export default {
		name: 'index',
		setup() {},
		components: {
			Side,
			Head,
			Tags
		}
	}
</script>
