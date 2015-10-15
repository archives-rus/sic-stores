SP.directive('spPaginator', [function() {
	return {
		templateUrl: 'partials/directives/paginator.html',
		controller: 'PaginatorCtrl',
		controllerAs: 'ctrl',
		scope: {
			loadPage: '&'
		}
	};
}]);