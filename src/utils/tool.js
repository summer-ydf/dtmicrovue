const tool = {
	/* localStorage */
	data : {
		set : function(table, settings){
			var _set = JSON.stringify(settings)
			return localStorage.setItem(table, _set);
		},
		get : function(table){
			return JSON.parse(localStorage.getItem(table));
		},
		remove : function(table){
			return localStorage.removeItem(table);
		},
		clear : function(){
			return localStorage.clear();
		}
	}
}

export default tool
