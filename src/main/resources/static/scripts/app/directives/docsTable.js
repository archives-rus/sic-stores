/** 
 * Таблица для состава документов, сведений о награждениях и свединий о загранкомандировках
 */
SP.directive('spDocsTable', function ($rootScope) {
	return {
		templateUrl: 'partials/directives/docs-table.html',
		link: function (scope) {
			scope.docTypes = $rootScope.docTypes;
			scope.getText = function (id) {
				if (scope.typeData)
					for (var i = 0; i < scope.typeData.length; ++i) {
						if (scope.typeData[i].id === id)
							return scope.typeData[i].fullValue;
					}
			};
		},
		scope: {
			data: '=', // Object
			edit: '=', // Boolean
			title: '@', // String
			docType: '@', // String
			typeData: '=' // Array
		}
	};
});

