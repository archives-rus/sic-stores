SP.controller('ShowMessageCtrl', ['$scope', 'message', 'title', '$modalInstance',
	function ($scope, message, title, $modalInstance) {
		$scope.message = message;
		$scope.title = title;
		$scope.ok = $modalInstance.close;
	}
]);