LSP.controller('LoginCtrl', ['$scope', '$http', '$httpParamSerializerJQLike',
	'$window', function ($scope, $http, $httpParamSerializerJQLike, $window) {
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
						$window.alert("неправильный логин/пароль");
					});
		};
	}]);