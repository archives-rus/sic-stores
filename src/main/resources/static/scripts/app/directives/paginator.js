SP.directive('spPaginator', [function() {
	return {
		templateUrl: 'directives/paginator.html',
		controller: 'PaginatorCtrl',
		controllerAs: 'ctrl',
		scope: {
			loadPage: '&'
		}
	};
}]);