/** 
 * Контроллер для таблицы 'Наименование организации и её переименования'
 */
SP.controller('NamesTableCtrl', ['$scope',
		function ($scope) {
			var currentName = {},
					me = this;

			/**
			 * Удаляет строку из таблицы "Наименование организации и ее переименования"
			 * @param {Integer} index - порядковый номер строки (начинается с 0)
			 */
			me.removeName = function (index) {
				$scope.names.splice(index, 1);
				if (currentName.row === index)
					currentName = {};
				else if (currentName.row > index)
					--currentName.row;
			};
			/**
			 * Добавляет строку в таблицу
			 */
			me.addName = function () {
				$scope.names.push({fullName: '', shortName: '', owner: '', years: ''});
				me.setCurrentName($scope.names.length - 1, -1);
			};
			/**
			 * Двигает строку в таблице "Наименование организации и ее переименования" вверх
			 */
			me.upName = function () {
				if (currentName.row) {
					var obj = $scope.names.splice(currentName.row, 1);
					$scope.names.splice(--currentName.row, 0, obj[0]);
				}
			};
			/**
			 * Двигает строку в таблице "Наименование организации и ее переименования" вниз
			 */
			me.downName = function () {
				if ((currentName.row || currentName.row === 0) && currentName.row < $scope.names.length - 1) {
					var obj = $scope.names.splice(currentName.row, 1);
					$scope.names.splice(++currentName.row, 0, obj[0]);
				}
			};
			/**
			 * Устанавливает текущую выбранную строку
			 */
			me.setCurrentName = function (row, col) {
				currentName.row = row;
				currentName.col = col;
			};
			/**
			 * Возвращает стилевой класс для выбранной строки
			 */
			me.isCurrent = function (row) {
				return currentName.row === row ? 'current-name' : '';
			};
			/**
			 * Определяет является ячейка выбранной
			 */
			me.isSelected = function (row, col) {
				return currentName.row === row && currentName.col === col;
			};
			/**
			 * Выключает редактирование ячейки когда щелкнули мимо нее, т.е. не 
			 * на другой ячейки а где-то вне таблицы или на шапке таблицы.
			 * @param {Integer} row - ряд
			 * @param {Integer} col - колонка
			 */
			me.blurName = function (row, col) {
				if (currentName.row === row && currentName.col === col) {
					currentName.col = -1;
				}
			};
		}
]);


