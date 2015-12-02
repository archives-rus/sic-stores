/**
 * Контроллер просмотра карточки организации
 */
SP.controller('ViewCardCtrl', function (orgCard, Search, storePlace,
		$routeParams, $location) {
	var me = this;
	me.result = orgCard;
	me.place = storePlace;
	me.loadPage = function (page) {
		page = page === undefined ? 0 : page;
		if ($routeParams.start !== page)
			$location.path('/view_card/' + page);
		else {
			Search.loadOrgCard(page);
			Search.loadStorePlace();
		}
	};
	me.loadPlace = Search.loadStorePlace;
	me.loadPage($routeParams.start);
});