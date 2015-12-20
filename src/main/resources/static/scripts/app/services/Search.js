/** 
 * Поиск организаций по критериям
 */
SP.service('Search', function ($http, criteria, tableResult, criteriaJ,
		tableResultJ, orgCard, jCard, orgCardPage, jCardPage, $rootScope, ShowMessage) {
	var
			// Удаляет все свойства объекта
			clear = function (obj) {
				for (var o in obj)
					delete obj[o];
			},
			// Создает список параметров для запроса
			buildParams = function (start, limit, crit) {
				return {
					criteria: crit,
					page: start,
					size: limit
				};
			},
			// Возвращает корректный номер страницы
			correctPageNumber = function (page, total) {
				if (isNaN(page) || page < 0)
					page = 0;
				return Math.min(page, total > 0 ? total - 1 : 0);
			},
			limit = 10; // Ограничение кол-ва для одной страницы таблицы

	return {
		/**
		 * Получает данные для таблицы 
		 * @param {Number/String} numberOfPage - интересующая страница, отсчет идет с нуля
		 */
		loadTablePage: function (numberOfPage) {
			$rootScope.mainSearch = $http.get('/search/main', {
				params: buildParams(correctPageNumber(numberOfPage, tableResult.totalPages), limit, criteria)
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
		loadOrgCard: function (numberOfPage, success) {
			$http.get('/search/card', {
				params: buildParams(correctPageNumber(numberOfPage, tableResult.totalElements), 1, criteria)
			}).success(function (data) {
				var result = data.content[0];
				clear(orgCard);
				for (var o in result) {
					orgCard[o] = result[o];
				}
				delete data.content;
				for (var b in data) {
					orgCardPage[b] = data[b];
				}
				orgCardPage.current = orgCardPage.number + 1;
				if (!orgCardPage.totalElements) // Не должно быть такой ситуации никогда
					ShowMessage.show('Внимание', 'Ошибка получения данных');
				else if (success)
					success();
			}).error(function () {
				clear(orgCard);
				ShowMessage.show('Внимание', 'Ошибка получения данных');
			});
		},
		// Получает данные для таблицы ЖРИ
		loadTablePageJ: function (numberOfPage) {
			$rootScope.jrchSearch = $http.get('/search/jrch', {
				params: buildParams(correctPageNumber(numberOfPage, tableResultJ.totalPages), limit, criteriaJ)
			}).success(function (data) {
				if (!data.totalElements) {
					clear(tableResultJ);
					ShowMessage.show('Внимание', 'Операции не найдены');
				} else {
					for (var o in data) {
						tableResultJ[o] = data[o];
					}
					tableResultJ.current = tableResultJ.number + 1;
				}
			}).error(function () {
				clear(tableResultJ);
				ShowMessage.show('Внимание', 'Операции не найдены');
			});

		},
		// Получает данные для карточки ЖРИ
		loadJCard: function (numberOfPage, success) {
			$http.get('/search/jcard', {
				params: buildParams(correctPageNumber(numberOfPage, tableResultJ.totalElements), 1, criteriaJ)
			}).success(function (data) {
				var result = data.content[0];
				clear(jCard);
				for (var o in result) {
					jCard[o] = result[o];
				}
				delete data.content;
				for (var b in data) {
					jCardPage[b] = data[b];
				}
				jCardPage.current = jCardPage.number + 1;
				if (!jCardPage.totalElements) // Не должно быть такой ситуации никогда
					ShowMessage.show('Внимание', 'Ошибка получения данных');
				else if (success)
					success();
			}).error(function () {
				clear(jCard);
				ShowMessage.show('Внимание', 'Ошибка получения данных');
			});
		},
		// Очищает параметры и результаты поиска
		clearCriteria: function () {
			clear(criteria);
			clear(tableResult);
		},
		// Очищает параметры и результаты поиска для ЖРИ
		clearCriteriaJ: function () {
			clear(criteriaJ);
			clear(tableResultJ);
		}
	};
});


