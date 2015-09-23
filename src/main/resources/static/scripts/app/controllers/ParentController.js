SP.controller('ParentCtrl', ['$http', '$window',
	function ($http, $window) {
		this.logout = function () {
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