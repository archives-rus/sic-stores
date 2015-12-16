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
			scope.addresses = function(id) {
				for(var i = 0, max = $rootScope.addresses.length; i < max; ++i) {
					var item = $rootScope.addresses[i];
					if (item.id === id)
						return item.values;
				} 
			};
			scope.phones = function(id) {
				for(var i = 0, max = $rootScope.phones.length; i < max; ++i) {
					var item = $rootScope.phones[i];
					if (item.id === id)
						return item.values;
				} 
			};
			scope.docTypes = $rootScope.docTypes;
			scope.rewardTypes = $rootScope.rewardTypes;
			scope.tripTypes = $rootScope.tripTypes;
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
						if (scope.places[i].id === scope.data.type)
							return scope.places[i].fullValue;
					}
			};
		}
	};
});

