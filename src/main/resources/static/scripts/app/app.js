var SP = angular.module('Storages', ['ngRoute', 'ui.bootstrap'])
		.value('user', {})
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
							templateUrl: 'views/card.html',
							controller: 'NewCardCtrl',
							resolve: resolve("Создание карточки")
						})
						.when('/edit_card', {
							templateUrl: 'views/card.html',
							controller: 'EditCardCtrl',
							resolve: resolve("Редактирование карточки")
						})
						.when('/view_card', {
							templateUrl: 'views/view_card.html',
							controller: 'ViewCardCtrl',
							resolve: resolve("Просмотр карточки")
						})
						.otherwise({
							templateUrl: 'views/main.html',
							controller: 'MainCtrl',
							resolve: resolve(null, true)
						});

				$locationProvider.html5Mode(true);
			}]);
