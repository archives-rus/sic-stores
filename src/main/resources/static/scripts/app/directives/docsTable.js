/** 
 * Таблица для состава документов, сведений о награждениях и свединий о загранкомандировках
 */
SP.directive('spDocsTable', function ($rootScope) {
	return {
		templateUrl: 'partials/directives/docs-table.html',
		link: function (scope) {
			scope.docTypes = $rootScope.docTypes;
		},
		scope: {
			data: '=', // Object
			edit: '=', // Boolean
			title: '@', // String
			docType: '@' // String
		}
	};
});

