var LSP = angular.module('LoginStorages', [])
		.config(['$httpProvider', function ($httpProvider) {
				$httpProvider.defaults.withCredentials = true;
				$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
			}]);