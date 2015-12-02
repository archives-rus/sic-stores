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
			// Возвращает корректный номер страницы
			correctPageNumber = function (page) {
				if (isNaN(page) || page < 0)
					page = 0;
				return Math.min(page, tableResult.totalPages > 0 ? tableResult.totalPages - 1 : 0);
			},
			limit = 10; // Ограничение кол-ва для одной страницы таблицы
	// Тестовые данные---------------------------
	var testDataSingle = [];
	for (var i = 0; i < 5; ++i) {
		testDataSingle[i] = {
			totalElements: 5,
			number: i,
			current: i + 1,
			totalPages: 5,
			first: i === 0 ? true : false,
			last: i === 4 ? true : false,
			size: 1,
			names: [{full: 'Полное 1_' + (i + 1), short: 'Короткое', sub: 'Подчиненность', date: '1940-1942'},
				{full: 'Полное 1_' + (i + 1), short: 'Короткое', sub: 'Подчиненность', date: '1940-1942'},
				{full: 'Полное 1_' + (i + 1), short: 'Короткое', sub: 'Подчиненность', date: '1940-1942'}
			]
		};
	}
	// -------------------------------------------
	return {
		/**
		 * Получает данные для таблицы 
		 * @param {Number/String} numberOfPage - интересующая страница, отсчет идет с нуля
		 */
		loadTablePage: function (numberOfPage) {
			$http.get('/search/main', {
				params: buildParams(correctPageNumber(numberOfPage), limit)
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
			if (numberOfPage === undefined)
				numberOfPage = 0;
			var data = testDataSingle[numberOfPage];
			for (var o in data) {
				singleResult[o] = data[o];
			}

			/*
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
			 */
		},
		// Очищает параметры и результаты поиска
		clearCriteria: function () {
			clear(criteria);
			clear(tableResult);
		}
	};
});


