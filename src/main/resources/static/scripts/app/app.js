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
							}]
					};
				}

				$routeProvider
						.when('/new_card/:from', {
							templateUrl: 'partials/views/card.html',
							controller: 'NewCardCtrl',
							resolve: resolve("Создание карточки")
						})
						.when('/edit_card', {
							templateUrl: 'partials/views/card.html',
							controller: 'EditCardCtrl',
							resolve: resolve("Редактирование карточки")
						})
						.when('/view_card', {
							templateUrl: 'partials/views/view_card.html',
							controller: 'ViewCardCtrl',
							resolve: resolve("Просмотр карточки")
						})
						.otherwise({
							templateUrl: 'partials/views/main.html',
							controller: 'MainCtrl',
							resolve: resolve(null, true)
						});

				$locationProvider.html5Mode(true);
			}]);
