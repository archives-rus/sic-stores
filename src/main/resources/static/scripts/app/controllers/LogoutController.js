SP.controller('LogoutCtrl', ['$scope', '$http', '$window',
	function ($scope, $http, $window) {
		$scope.logout = function () {
			$http({url: "/logout",
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
					.success(function () {
						$window.location.href = '/enter.html';
					});
		};
	}]);