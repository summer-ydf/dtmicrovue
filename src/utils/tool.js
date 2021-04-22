const tool = {
	/* localStorage */
	data: {
		set: function(table, settings) {
			var _set = JSON.stringify(settings)
			return localStorage.setItem(table, _set);
		},
		get: function(table) {
			var data = localStorage.getItem(table);
			try {
				data = JSON.parse(data)
			} catch (err) {
				return null
			}
			return data;
		},
		remove: function(table) {
			return localStorage.removeItem(table);
		},
		clear: function() {
			return localStorage.clear();
		}
	}
}

export default tool
