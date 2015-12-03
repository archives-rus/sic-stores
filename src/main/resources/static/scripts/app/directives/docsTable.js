/** 
 * Таблица для состава документов, сведений о награждениях и свединий о загранкомандировках
 */
SP.directive('spDocsTable', function() {
	return {
		templateUrl: 'partials/directives/docs-table.html',
		scope: {
			data: '=', // Object
			edit: '=', // Boolean
			title: '@' // String
		}
	};
});

