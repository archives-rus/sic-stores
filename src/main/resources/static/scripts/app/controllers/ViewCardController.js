SP.controller('ViewCardCtrl', function (singleResult, Search, $routeParams,
		$location) {
	var me = this;
	me.result = singleResult;
	me.loadPage = function (page) {
		page = page === undefined ? 0 : page;
		if ($routeParams.start !== page)
			$location.path('/view_card/' + page);
		else
			Search.loadSinglePage(page);
	};
	me.loadPage($routeParams.start);
});