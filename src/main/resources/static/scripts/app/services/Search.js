/** 
 * Поиск организаций по критериям
 */
SP.service('Search', function ($http, criteria, tableResult, singleResult, ShowMessage) {

	var
			// Удаляет все свойства объекта
			clear = function (obj) {
				for (var o in obj)
					delete obj[o];
			},
			// Создает список параметров для запроса
			buildParams = function (start, limit) {
				return {
					criteria: criteria,
					page: start,
					size: limit
				};
			},
			limit = 10; // Ограничение кол-ва для одной страницы таблицы

	return {
		// Получает данные для одной страницы таблицы
		loadTablePage: function (numberOfPage) {
			var page = numberOfPage || 0;
			$http.get('/search/main', {
				params: buildParams(page, limit)
			}).success(function (data) {
				if (!data.totalElements) {
					clear(tableResult);
					ShowMessage.show('Внимание', 'Организации не найдены');
				} else {
					for (var o in data) {
						tableResult[o] = data[o];
					}
					tableResult.current = tableResult.number + 1;
				}
			}).error(function () {
				clear(tableResult);
				ShowMessage.show('Внимание', 'Организации не найдены');
			});
		},
		// Получает данные для карточки
		loadSinglePage: function (numberOfPage) {
			$http.get('/search/card', {
				params: buildParams(numberOfPage - 1, 1)
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
});


