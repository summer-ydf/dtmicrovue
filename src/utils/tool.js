const tool = {
	/* localStorage */
	data: {
		set(table, settings) {
			var _set = JSON.stringify(settings)
			return localStorage.setItem(table, _set);
		},
		get(table) {
			var data = localStorage.getItem(table);
			try {
				data = JSON.parse(data)
			} catch (err) {
				return null
			}
			return data;
		},
		remove(table) {
			return localStorage.removeItem(table);
		},
		clear() {
			return localStorage.clear();
		}
	},
	/* Fullscreen */
	screen(element){
		var isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
		if(isFull){
			if(document.exitFullscreen) {
				document.exitFullscreen();
			}else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}else{
			if(element.requestFullscreen) {
				element.requestFullscreen();
			}else if(element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			}else if(element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			}
		}
	}
}

export default tool
