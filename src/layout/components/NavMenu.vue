<template>
	<div v-if="navMenus.length<=0" style="padding:20px;">
		<el-alert title="无子集菜单" center type="info" :closable="false"></el-alert>
	</div>
	<template v-for="navMenu in navMenus" v-bind:key="navMenu">
		<el-menu-item v-if="!navMenu.children" :index="navMenu.path">
			<a v-if="navMenu.meta&&navMenu.meta.target" :href="navMenu.path" :target="navMenu.meta.target" @click.stop='a'></a>
			<i v-if="navMenu.meta&&navMenu.meta.icon" :class="navMenu.meta.icon || 'el-icon-menu'"></i>
			<span>{{navMenu.meta.title}}</span>
		</el-menu-item>
		<el-submenu v-if="navMenu.children" :index="navMenu.path">
			<template #title>
				<i v-if="navMenu.meta&&navMenu.meta.icon" :class="navMenu.meta.icon || 'el-icon-menu'"></i>
				<span> {{navMenu.meta.title}}</span>
			</template>
			<NavMenu :navMenus="navMenu.children"></NavMenu>
		</el-submenu>
	</template>
</template>

<script>
	export default {
		name: 'NavMenu',
		props: ['navMenus'],
		data() {
			return {}
		},
		methods: {
			a(){}
		}
	}
</script>
