LSP.controller('LoginCtrl', function ($scope, $http, $httpParamSerializerJQLike,
		$window, $timeout) {
	$scope.cred = {};
	$scope.login = function () {
		$http({url: "/login",
			method: 'POST',
			data: $httpParamSerializerJQLike($scope.cred),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
				.success(function () {
					$window.location.href = '/index.html';
				})
				.error(function () {
					$scope.wrongauth = true;
					$timeout(function () {
						$scope.wrongauth = false;
					}, 3000);
				});
	};
});