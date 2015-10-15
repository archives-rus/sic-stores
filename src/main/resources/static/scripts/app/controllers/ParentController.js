SP.controller('ParentCtrl',
		function ($http, $window, $location, $timeout, $rootScope, Search) {
			var me = this;

			$http.get('/userinfo').success(function (data) {
				$rootScope.user = data;
				me.msg = true;
				$timeout(function () {
					me.msg = false;
				}, 2000);
			});

			// Инициализируем справочники
			$http.get('/dict/archives').success(function (data) {
				$rootScope.archives = data;
			});
			$http.get('/dict/docTypes').success(function (data) {
				$rootScope.docTypes = data;
			});

			/**
			 * Выполняет выход из системы
			 */
			me.logout = function () {
				$http({url: "/logout",
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).success(function () {
					$window.location.href = '/enter.html';
				});
			};
			/**
			 * Переключает основное меню в зависимости от контекста
			 */
			me.menu = function () {
				var dir = 'partials/views/menu/';
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
			/**
			 * Очищает параметры поиска
			 */
			me.reset = Search.clearCriteria;
			/**
			 * Поиск информации об организациях
			 */
			me.search = function () {
				Search.loadTablePage(1);
			};
		});