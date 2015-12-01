SP.controller('MainCtrl',
		function (criteria, tableResult, Search, $location) {
			var me = this;
			// Критерии поиска
			me.crit = criteria;
			// результаты поиска
			me.result = tableResult;

			me.loadPage = Search.loadTablePage;
			me.viewCard = function(index) {
				$location.path('/view_card/' + index);
			};
		});