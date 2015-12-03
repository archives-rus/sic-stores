/** 
 * Карточка места хранения
 */
SP.directive('spStoreCard', function ($rootScope) {
	return {
		templateUrl: 'partials/directives/store-card.html',
		scope: {
			data: '=',
			edit: '='
		},
		link: function (scope) {
			scope.archives = $rootScope.archives;
			scope.places = $rootScope.places;
			scope.levels = $rootScope.levels;
			scope.adreses = $rootScope.adreses;
		}
	};
});

