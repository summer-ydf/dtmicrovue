export default {
	state: {
		viewTags: []
	},
	mutations: {
		pushViewTags(state, route){
			let target = state.viewTags.find((item) => item.path === route.path)
			let isName = route.name
			if(!target && isName){
				state.viewTags.push(route)
			}
		},
		removeViewTags(state, route){
			state.viewTags.forEach((item, index) => {
				if (item.path === route.path){
					state.viewTags.splice(index, 1)
				}
			})
		},
		updateViewTags(state, route){
			state.viewTags.forEach((item) => {
				if (item.path == route.path){
					item = Object.assign(item, route)
				}
			})
		},
		clearViewTags(state){
			state.viewTags = []
		}
	}
}
