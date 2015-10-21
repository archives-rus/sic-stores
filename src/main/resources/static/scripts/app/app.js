var SP = angular.module('Storages', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
		.constant('criteria', {}) // Критерии поиска
		.constant('tableResult', {}) // Результаты поиска для таблицы
		.constant('singleResult', {}) // Результаты поиска для одной карточки
		.config(['$routeProvider', '$locationProvider',
			function ($routeProvider, $locationProvider) {
				/**
				 * Дополнительные настройки для маршрутов
				 * @param {String} suffix - изменяемая часть заголовка вкладки браузера
				 * @param {Boolean} showHeader - показывать или нет заголовок страницы
				 * @returns {Object}
				 */
				function resolve(suffix, showHeader) {
					return {
						setTitle: ['$rootScope', function ($rootScope) {
								$rootScope.title = "Места хранения" + (suffix ? "::" + suffix : '');
								$rootScope.header = showHeader;
							}],
						topMenu: ['$rootScope', '$location', function ($rootScope, $location) {
								var dir = 'partials/menus/',
										url = $location.url();
								if (/^\/view_card\//.test(url)) {
									$rootScope.topMenu = dir + 'view_card.html';
								} else {
									switch ($location.url()) {
										case '/new_card/main':
											$rootScope.topMenu = dir + 'new_card_main.html';
											break;
										case '/edit_card':
										case '/new_card/view':
											$rootScope.topMenu = dir + 'edit_card.html';
											break;
										default:
											$rootScope.topMenu = dir + 'main.html';
									}
								}
							}]
					};
				}
				$routeProvider
						.when('/new_card/:from', {
							templateUrl: 'partials/views/card.html',
							controller: 'NewCardCtrl',
							controllerAs: 'nctrl',
							resolve: resolve("Создание карточки")
						})
						.when('/edit_card', {
							templateUrl: 'partials/views/card.html',
							controller: 'EditCardCtrl',
							controllerAs: 'ectrl',
							resolve: resolve("Редактирование карточки")
						})
						.when('/view_card/:start', {
							templateUrl: 'partials/views/view_card.html',
							controller: 'ViewCardCtrl',
							controllerAs: 'vctrl',
							resolve: resolve("Просмотр карточки")
						})
						.otherwise({
							templateUrl: 'partials/views/main.html',
							controller: 'MainCtrl',
							controllerAs: 'ctrl',
							resolve: resolve(null, true)
						});

				$locationProvider.html5Mode(true);
			}]);
