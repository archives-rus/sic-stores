/** 
 * Дериктива элемента 'Наименование организации и её переименования'
 */
SP.directive('namesTable', [function () {
		return {
			templateUrl: 'directives/names-table.html',
			controller: 'NamesTableCtrl',
			controllerAs: 'ctrl',
			scope: {
				names: '=names'
			}};

	}]);

