SP.controller('PaginatorCtrl', ['$scope', function ($scope) {
		var me = this,
			pages = me.pages || {};
		me.maxPages = 100;
		pages.last = pages.last || 1;
		me.pages = pages; 
		/**
		 * Позволяет вводить только правильные номера страниц
		 */
		me.pageChanged = function () {
			var currentPage;
			if (pages.current) {
				if (/^[1-9][0-9]*$/.test(pages.current) && ((currentPage = parseInt(pages.current)) <= me.maxPages)) {
					pages.last = currentPage;
				} else {
					pages.current = pages.last;
				}
			} else {
				pages.current = pages.last;
			} 
		};
		/**
		 * Переходит на следующую страницу
		 */
		me.nextPage = function () {
			$scope.loadPage(pages.last = pages.current = Math.min(pages.current + 1, me.maxPages));
		};
		/**
		 * Переходит на предыдующую страницу
		 */
		me.prevPage = function() {
			$scope.loadPage(pages.last = pages.current = Math.max(pages.current - 1, 1));
		};
		/**
		 * Переходит на первую страницу
		 */
		me.firstPage = function() {
			$scope.loadPage(pages.last = pages.current = 1);
		};
		/**
		 * Переходит на последнюю страницу
		 */
		me.lastPage = function() {
			$scope.loadPage(pages.last = pages.current = me.maxPages);
		};
		/**
		 * Указывает выбрана последняя страница или нет
		 */
		me.isFirst = function() {
			return pages.current <= 1;
		};
		/**
		 * Указывает выбрана первая страница или нет
		 */
		me.isLast = function() {
			return pages.current >= me.maxPages;
		};
	}]);