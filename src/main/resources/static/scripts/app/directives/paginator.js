SP.directive('spPaginator', function () {
	return {
		templateUrl: 'partials/directives/paginator.html',
		link: function (scope, el, attr) {
			// первая ли страница
			scope.first = function () {
				var data = scope.data;
				return data.first === undefined || data.first;
			};
			// последняя ли страница
			scope.last = function () {
				var data = scope.data;
				return data.last === undefined || data.last;
			};
			// начальная запись
			scope.start = function () {
				var data = scope.data;
				if (data.numberOfElements)
					return data.number * data.size + 1;
				return "";
			};
			// последняя запись
			scope.end = function () {
				var start = scope.start();
				if (start)
					return start + scope.data.numberOfElements - 1;
				return "";
			};
		},
		scope: {
			data: '=',
			load: '&'
		}
	};
});
