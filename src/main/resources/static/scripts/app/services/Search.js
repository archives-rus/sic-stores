/** 
 * Поиск организаций по критериям
 */
SP.service('Search', function ($http, criteria, tableResult, criteriaJ,
		tableResultJ, orgCard, orgCardPage, storePlace, ShowMessage) {
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
			$http.get('/search/main', {
				params: buildParams(correctPageNumber(numberOfPage, tableResult.totalPages), limit)
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
				params: buildParams(correctPageNumber(numberOfPage, tableResult.totalElements), 1)
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
			var data = {
				totalElements: 1,
				numberOfElements: 1,
				number: 0,
				current: 1,
				totalPages: 1,
				first: true,
				last: true,
				size: 1,
				content: [{
						archive: 'Какой-то архив',
						level: 'Федеральный архив',
						date: '28.01.2015',
						type: 'Редактирование',
						user: 'Иванов И. И.',
						organization: 'Какая-то организация'
					}]
			};
			for (var o in data)
				tableResultJ[o] = data[o];
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


