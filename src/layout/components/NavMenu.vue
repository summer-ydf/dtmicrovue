<template>
	<label v-for="navMenu in navMenus" v-bind:key="navMenu">
		<el-menu-item v-if="!navMenu.children" :index="navMenu.path">
			<i v-if="navMenu.meta&&navMenu.meta.icon" :class="navMenu.meta.icon || 'el-icon-menu'"></i>
			<span>{{navMenu.name}}</span>
		</el-menu-item>

		<el-submenu v-if="navMenu.children" :index="navMenu.path">
			<template #title>
				<i v-if="navMenu.meta&&navMenu.meta.icon" :class="navMenu.meta.icon || 'el-icon-menu'"></i>
				<span> {{navMenu.name}}</span>
			</template>
			<NavMenu :navMenus="navMenu.children"></NavMenu>
		</el-submenu>
	</label>
</template>

<script>
	export default {
		name: 'NavMenu',
		props: ['navMenus'],
		data() {
			return {}
		},
		methods: {}
	}
</script>