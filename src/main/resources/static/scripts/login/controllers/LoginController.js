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
				.error(function (data, status) {
					if (status === 404 && /\.map$/.test(data.path)) {
						// сюда сыпятся все ошибки по несуществующим файлам
						$window.location.href = '/index.html';
					} else {
						$scope.wrongauth = true;
						$timeout(function () {
							$scope.wrongauth = false;
						}, 3000);
					}
				});
	};
});