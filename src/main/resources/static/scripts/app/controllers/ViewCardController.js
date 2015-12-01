SP.controller('ViewCardCtrl', function (singleResult, Search) {
	var me = this;
//	me.result = singleResult; 
	me.result = {

	};
	me.loadPage = Search.loadSinglePage; 
});