SP.controller('ParentCtrl', ['$http', '$window', '$location',
	'$timeout', '$rootScope', 'criteria',
	function ($http, $window, $location, $timeout, $rootScope, criteria) {
		var me = this;

		$http.get('/userinfo').success(function (data) {
			$rootScope.user = data;
			me.msg = true;
			$timeout(function () {
				me.msg = false;
			}, 1500);
		});

		// Инициализируем справочники
		$http.get('/dict/archives').success(function (data) {
			$rootScope.archives = data;
		});
		$http.get('/dict/docTypes').success(function (data) {
			$rootScope.docTypes = data;
		});

		/**
		 * Очищает параметры поиска
		 */
		me.reset = function () {
			for (var o in criteria)
				delete criteria[o];
		};
		/**
		 * Выполняет выход из системы
		 */
		me.logout = function () {
			$http({url: "/logout",
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
					.success(function () {
						$window.location.href = '/enter.html';
					});
		};
		/**
		 * Переключает основное меню в зависимости от контекста
		 */
		me.menu = function () {
			var dir = 'views/menu/';
			switch ($location.url()) {
				case '/new_card/main':
					return dir + 'new_card_main.html';
				case '/view_card':
					return dir + 'view_card.html';
				case '/edit_card':
				case '/new_card/view':
					return dir + 'edit_card.html';
				default:
					return dir + 'main.html';
			}
		};
	}]);