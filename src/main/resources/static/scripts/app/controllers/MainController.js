SP.controller('MainCtrl',
		function (criteria, tableResult, Search, $location) {
			var me = this;
			// Критерии поиска
			me.crit = criteria;
			// результаты поиска
			me.result = tableResult;
			// первая ли страница
			me.first = function () {
				return tableResult.first === undefined || tableResult.first;
			};
			// последняя ли страница
			me.last = function () {
				return tableResult.last === undefined || tableResult.last;
			};
			// начальная запись
			me.start = function () {
				if (tableResult.numberOfElements)
					return tableResult.number * tableResult.size + 1;
				return "";
			};
			// последняя запись
			me.end = function () {
				var start = me.start();
				if (start)
					return start + tableResult.numberOfElements - 1;
				return "";
			};

			me.loadPage = Search.loadTablePage;
			me.viewCard = function(index) {
				$location.path('/view_card/' + index);
			};
		});