var LSP = angular.module('LoginStorages', ['ngAnimate', 'ui.bootstrap'])
		.config(['$httpProvider', function ($httpProvider) {
				$httpProvider.defaults.withCredentials = true;
				$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
			}]);