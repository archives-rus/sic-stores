SP.controller('ParentCtrl',
		function ($http, $window, $location, $timeout,
				$rootScope, Search) {
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
			 * Определяет является ли текущий url заданным
			 * @param {String} url заданный url
			 * @returns {Boolean} true если url === текущему
			 */
			me.isCurrent = function(url) {
				var currentUrl = $location.url();
				if (url === '/')
					return currentUrl === url || /^\/index\.html/.test(currentUrl);
				return currentUrl === url;
			};
			/**
			 * Очищает параметры поиска
			 */
			me.reset = Search.clearCriteria;
			/**
			 * Поиск информации об организациях
			 */
			me.search = Search.loadTablePage;
		});