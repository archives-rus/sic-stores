/** 
 * Директива элемента 'Наименование организации и её переименования'
 */
SP.directive('spNamesTable', function () {
	function setOrder(data) {
		data.forEach(function (it, i) {
			it.sort = i;
		});
	}
	return {
		templateUrl: 'partials/directives/names-table.html',
		link: function (scope) {
			var current;
			scope.add = function () {
				scope.data.push({sort: scope.data.length});
			};
			scope.up = function () {
				if (current !== undefined && current !== 0) {
					var tmp = scope.data.splice(current--, 1)[0];
					scope.data.splice(current, 0, tmp);
					setOrder(scope.data);
				}
			};
			scope.down = function () {
				if (current !== undefined && current !== scope.data.length - 1) {
					var tmp = scope.data.splice(current++, 1)[0];
					scope.data.splice(current, 0, tmp);
					setOrder(scope.data);
				}
			};
			scope.remove = function (index) {
				scope.data.splice(index, 1);
				var max = scope.data.length;
				if (index < max)
					current = index;
				else if (max > 0)
					current = max - 1;
				else
					current = undefined;
			};
			scope.setCurrent = function (index) {
				current = index;
			};
			scope.isCurrent = function (index) {
				return current === index;
			};
		},
		scope: {
			data: '=', // Object
			edit: '=' // Boolean
		}
	};
});

