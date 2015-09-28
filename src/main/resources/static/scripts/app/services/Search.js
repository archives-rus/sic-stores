/** 
 * Поиск организаций по критериям
 */
SP.service('Search', ['$http', 'criteria', 'tableResult', 'singleResult',
	'ShowMessage', function ($http, criteria, tableResult, singleResult, ShowMessage) {

		var
				// Удаляет все свойства объекта
				clear = function (obj) {
					for (var o in obj)
						delete obj[o];
				},
				// Создает список параметров для запроса
				// Combobox отдает объект, а нам нужно тольк id
				buildParams = function (start, limit) {
					var params = {};
					for (var o in criteria) {
						var param = criteria[o];
						if (param instanceof Object)
							params[o] = param.id;
						else
							params[o] = param;
					}
					params.start = start;
					if (limit)
						params.limit = limit;
					return params;
				},
				limit = 10; // Ограничение кол-ва для одной страницы таблицы

		return {
			// Получает данные для одной страницы таблицы
			loadTablePage: function (numberOfPage) {
				$http.get('/search/main', {
					params: buildParams(numberOfPage - 1, limit)
				}).success(function (data) {
					for (var o in data) {
						tableResult[o] = data[o];
					}
					if (!tableResult.totalElements)
						ShowMessage.show('Внимание', 'Организации не найдены');
				}).error(function () {
					clear(tableResult);
					ShowMessage.show('Внимание', 'Организации не найдены');
				});
			},
			// Получает данные для карточки
			loadSinglePage: function (numberOfPage) {
				$http.get('/search/card', {
					params: buildParams(numberOfPage - 1)
				}).success(function (data) {
					for (var o in data) {
						singleResult[o] = data[o];
					}
					if (!singleResult.totalElements) // Не должно быть такой ситуации никогда
						ShowMessage.show('Внимание', 'Ошибка получения данных');
				}).error(function () {
					clear(singleResult);
					ShowMessage.show('Внимание', 'Ошибка получения данных');
				});
			},
			// Очищает параметры и результаты поиска
			clearCriteria: function () {
				clear(criteria);
				clear(tableResult);
			}
		};
	}]);


