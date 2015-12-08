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
			['archives', 'docTypes', 'addresses', 'places', 'phones',
				'levels', 'rewardTypes', 'tripTypes'].forEach(function (it) {
				$http.get('/dict/' + it).success(function (data) {
					$rootScope[it] = data;
				});
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
			me.isCurrent = function (url) {
				var currentUrl = $location.url();
				if (url === '/jrch')
					return /jrch/.test(currentUrl);
				else if (url === '/reports')
					return /reports/.test(currentUrl);
				return !/jrch|reports/.test(currentUrl);
			};
			/**
			 * Очищает параметры поиска
			 */
			me.reset = Search.clearCriteria;
			/**
			 * Поиск информации об организациях
			 */
			me.search = Search.loadTablePage;
			/**
			 * Очищает параметры поиска ЖРИ
			 */
			me.jrchReset = Search.clearCriteriaJ;
			/**
			 * Поиск информации для ЖРИ
			 */
			me.jrchSearch = Search.loadTablePageJ;
		});