<template>
	<component :is="componentFile"></component>
</template>

<script>
	import { defineAsyncComponent, markRaw } from "vue"

	export default {
		props: {
			src: { type: String, default: "" }
		},
		data(){
			return {
				componentFile: null
			}
		},
		watch: {
			src(){
				this.render()
			}
		},
		mounted() {
			this.render()
		},
		methods: {
			render(){
				if(!this.src){
					this.componentFile = null
					return false
				}
				this.componentFile = markRaw(
					defineAsyncComponent({
						loader: () => import(`@/views/template/report/pages/${this.src}`),
						delay: 0,
						timeout: 10000,
						loadingComponent: { template: '<div>加载中</div>' },
						errorComponent:  { template: '<div>加载失败</div>' }
					})
				)
			}
		}
	}
</script>
