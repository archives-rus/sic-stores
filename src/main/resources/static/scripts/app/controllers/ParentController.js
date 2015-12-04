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
			// TODO: перенести в базу
			$rootScope.places = [{id: 1, fullValue: 'Архив'}, {id: 2, fullValue: 'Организация'}];
			$rootScope.levels = [{id: 1, fullValue: 'Федеральный архив'},
				{id: 2, fullValue: 'Государственный архив'},
				{id: 3, fullValue: 'Муниципальный архив'},
				{id: 4, fullValue: 'Ведомственный архив'},
				{id: 5, fullValue: 'Архивный отдел муниципального образования'}
			];
			$rootScope.adreses = {
				87: [{fullValue: 'ул. Пирогова', id: 1}, {fullValue: 'ул. Пометкина', id: 2}, {fullValue: 'ул. Хорошого', id: 3}],
				88: [{fullValue: 'ул. Пирогова, 3', id: 1}, {fullValue: 'ул. Пометкина, 4', id: 2}, {fullValue: 'ул. Хорошого, 5', id: 3}]
			};
			$rootScope.rewardTypes = [{id: 1, fullValue: '850 лет Москвы'}, {id: 2, fullValue: 'Герой Советского Союза'}];
			$rootScope.tripTypes = [{id: 1, fullValue: 'Командировочка'}, {id: 2, fullValue: 'Отчет'}];
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