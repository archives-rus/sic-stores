SP.controller('MainCtrl', ['$scope', 'criteria', 'tableResult', 'Search',
	function ($scope, criteria, tableResult, Search) {
		$scope.criteria = criteria;
		$scope.result = tableResult;
	}]);