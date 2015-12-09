/** 
 * Таблица для состава документов, сведений о награждениях и свединий о загранкомандировках
 */
SP.directive('spDocsTable', function ($rootScope) {
	function setOrder(data) {
		data.forEach(function (it, i) {
			it.sort = i;
		});
	}
	return {
		templateUrl: 'partials/directives/docs-table.html',
		link: function (scope) {
			scope.getText = function (id) {
				if (scope.typeData)
					for (var i = 0; i < scope.typeData.length; ++i) {
						if (scope.typeData[i].id === id)
							return scope.typeData[i].fullValue;
					}
			};
			var current = undefined;
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
			edit: '=', // Boolean
			title: '@', // String
			docType: '@', // String
			typeData: '=' // Array
		}
	};
});

