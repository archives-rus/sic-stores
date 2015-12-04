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
			scope.docTypes = $rootScope.docTypes;
			scope.getText = function (id, data) {
				if (data)
					for (var i = 0; i < data.length; ++i) {
						if (data[i].id === id)
							return data[i].fullValue;
					}
			};
			scope.isArchive = function () {
				if (scope.data)
					for (var i = 0; i < scope.places.length; ++i) {
						if (scope.places[i].id === scope.data.place)
							return scope.places[i].fullValue;
					}
			};
		}
	};
});

