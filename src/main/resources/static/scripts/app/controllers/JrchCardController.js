/**  
 * Просомтр журнала регистрации изменений
 */
SP.controller('JrchCardCtrl', function (jCard, jCardPage, Search,
		$routeParams, $location) {
	var me = this;

	me.loadPage = function (page) {
		page = page === undefined ? 0 : page;
		if ($routeParams.pos != page) {
			$location.path('/jrchs/' + page);
		} else {
			Search.loadJCard(page, function () {
				me.data = jCard;
				me.page = jCardPage;
				me.show = true;
				me.changeShow();
			});
		}
	};

	me.changeShow = function () {
		me.show = !me.show;
		if (me.show)
			me.title = "Скрыть историю изменений";
		else
			me.title = "Показать историю изменений";
	};
	me.loadPage($routeParams.pos);
});


