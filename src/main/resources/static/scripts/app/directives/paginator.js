SP.directive('spPaginator', function () {
	return {
		templateUrl: 'partials/directives/paginator.html',
		link: function (scope, el, attr) {
			scope.first = function () {

			};
			scope.last = function () {

			};
			scope.start = function () {

			};
			scope.end = function () {

			};
			scope.loadPage = function(page){

			};
		},
		scope: {
			data: '='
		}
	};
});