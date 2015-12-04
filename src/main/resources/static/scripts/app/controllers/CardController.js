/**
 * Контроллер просмотра карточки организации
 */
SP.controller('CardCtrl', function (orgCard, Search, storePlace,
		$routeParams, $location) {
	var me = this;
	me.result = orgCard;
	me.place = storePlace;
	me.loadPage = function (page) {
		page = page === undefined ? 0 : page;
		if ('last' === page) {
			page = orgCard.number;
		}
		if ($routeParams.start != page) {
			$location.path('/view_card/' + page);
		} else {
			Search.loadOrgCard(page);
			Search.loadStorePlace();
		}
	};
	me.loadPlace = Search.loadStorePlace;
	if (/view_card/.test($location.path())) { // Режим просмотра
		me.edit = false;
		me.loadPage($routeParams.start);
	} else { // Режим редактирования
		me.result = angular.copy(orgCard);
		me.place = angular.copy(storePlace);
		me.edit = true;
	}
});
