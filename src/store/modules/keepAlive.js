export default {
	state: {
		keepLiveRoute: []
	},
	mutations: {
		pushKeepLive(state, component){
			if(!state.keepLiveRoute.includes(component)){
				state.keepLiveRoute.push(component)
			}
		},
		removeKeepLive(state, component){
			var index = state.keepLiveRoute.indexOf(component);
			if(index !== -1){
				state.keepLiveRoute.splice(index, 1);
			}
		},
		clearKeepLive(state){
			state.keepLiveRoute = []
		}
	}
}
