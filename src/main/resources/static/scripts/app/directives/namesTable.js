/** 
 * Дериктива элемента 'Наименование организации и её переименования'
 */
SP.directive('spNamesTable', function () {
	return {
		templateUrl: 'partials/directives/names-table.html',
		link: function (scope) {
			scope.add = function() {

			};
			scope.up = function() {

			};
			scope.down = function() {

			};
		},
		scope: {
			data: '=', // Object
			edit: '=' // Boolean
		}
	};

});

