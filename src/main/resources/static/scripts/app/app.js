var SP = angular.module('Storages', ['ngRoute', 'ngAnimate', 'ui.bootstrap',
	'cgBusy', 'ngMask', 'ui.mask'])
		.constant('criteria', {}) // Критерии поиска
		.constant('criteriaJ', {}) // Критерии поиска для ЖРИ
		.constant('tableResult', {}) // Результаты поиска для таблицы
		.constant('tableResultJ', {}) // Результаты поиска для таблицы для ЖРИ
		.value('orgCard', {}) // Карточка организации
		.value('jCard', {}) // Карточка ЖРИ
		.value('orgCardPage', {}) // Данные для просмотра карточек в потоке
		.value('jCardPage', {}) // Данные для просмотра карточек ЖРИ в потоке
		.constant('storePlace', {}) // Результаты поиска места хранения для одной организации
		.config(function ($routeProvider, $locationProvider, $httpProvider) {
			$httpProvider.defaults.withCredentials = true;
			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
			/**
			 * Дополнительные настройки для маршрутов
			 * @param {String} suffix - изменяемая часть заголовка вкладки браузера
			 * @param {Boolean} showHeader - показывать или нет заголовок страницы
			 * @returns {Object}
			 */
			function resolve(suffix, stream) {
				return {
					setTitle: ['$rootScope', function ($rootScope) {
							$rootScope.title = "Места хранения" + (suffix ? "::" + suffix : '');
							$rootScope.stream = stream;
						}],
					topMenu: ['$rootScope', '$location', function ($rootScope, $location) {
							var dir = 'partials/menus/',
									url = $location.url();
							if (/^\/cards?\/[0-9]+/.test(url)) {
								$rootScope.topMenu = dir + 'view_card.html';
							} else if (/^\/jrchs\/[0-9]+/.test(url)) {
								$rootScope.topMenu = dir + 'view_jrch.html';
							} else {
								switch ($location.url()) {
									case '/newcard':
										$rootScope.topMenu = dir + 'newcard.html';
										break;
									case '/jrch':
										$rootScope.topMenu = dir + 'jrch.html';
										break;
									case '/reports':
										$rootScope.topMenu = dir + 'reports.html';
										break;
									case '/':
									case '/index.html':
										$rootScope.topMenu = dir + 'main.html';
										break;
								}
							}
						}]
				};
			}
			$routeProvider
					.when('/newcard', {
						templateUrl: 'partials/views/card.html',
						controller: 'NewCardCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Создание карточки")
					})
					.when('/card/edit/:id', {
						templateUrl: 'partials/views/card.html',
						controller: 'NewCardCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Редактирование карточки")
					})
					.when('/card/:id', {
						templateUrl: 'partials/views/card.html',
						controller: 'NewCardCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Просмотр карточки")
					})
					.when('/cards/:pos', {
						templateUrl: 'partials/views/card.html',
						controller: 'NewCardCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Просмотр карточки", true)
					})
					.when('/jrch', {
						templateUrl: 'partials/views/jrch.html',
						controller: 'JrchCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Журнал регистрации изменений")
					})
					.when('/reports', {
						templateUrl: 'partials/views/reports.html',
						controller: 'ReportsCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Отчеты")
					})
					.when('/jrchs/:pos', {
						templateUrl: 'partials/views/jrch_card.html',
						controller: 'JrchCardCtrl',
						controllerAs: 'ctrl',
						resolve: resolve("Просмотр журнала регистрации изменений")
					})
					.otherwise({
						templateUrl: 'partials/views/main.html',
						controller: 'MainCtrl',
						controllerAs: 'ctrl',
						resolve: resolve()
					});
			$locationProvider.html5Mode(true);
		})
		.run(function ($rootScope) {
			$rootScope.$on('$locationChangeSuccess', function (evt, current, prev) {
				if (/\/card\/edit\/[0-9]+$/.test(current)) {
					if (/\/cards\/[0-9]+$/.test(prev)) {
						$rootScope.topMenu = 'partials/menus/edit_card_stream.html';
					} else {
						$rootScope.topMenu = 'partials/menus/edit_card.html';
					}
				}
			});
		});

