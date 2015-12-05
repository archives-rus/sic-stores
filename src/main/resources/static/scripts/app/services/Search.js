/** 
 * Поиск организаций по критериям
 */
SP.service('Search', function ($http, criteria, tableResult, criteriaJ,
		tableResultJ, orgCard, storePlace, ShowMessage) {
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
	var testDataSingle = [],
			places = {};
	for (var i = 0; i < 5; ++i) {
		places[i] = [];
		if (i % 2 === 0) {
			for (var j = 0; j < 2; ++j) {
				var content;
				if (j === 0) {
					content = [{place: 1, archive: 87, level: 1, adres: 1,
							fond: {prefix: 1, number: 10, suffix: 'А', name: 'Мой крутой фонд'},
							phone: '+7 (495) 123-134-14',
							email: 'it@yandex.ru',
							startYear: '1940',
							endYear: '1974',
							shron: 'Новое архивохранилище',
							ucount: '134',
							dopInfo: 'Дополнительная информация',
							remark: 'А это разные примечания',
							docs: [{type: 124, startDate: '194' + i, endDate: '194' + (i + 2),
									opisNumber: 'Опись №' + (i + 1), docsCount: '10'},
								{type: 118, startDate: '194' + i, endDate: '194' + (i + 2),
									opisNumber: 'Опись №' + (i + 1), docsCount: '10'},
								{type: 111, startDate: '194' + i, endDate: '194' + (i + 2),
									opisNumber: 'Опись №' + (i + 1), docsCount: '10'}
							]
						}];
				} else {
					content = [{}];
				}
				places[i][j] = {
					totalElements: 2,
					number: j,
					current: j + 1,
					totalPages: 2,
					first: j === 0 ? true : false,
					last: j === 1 ? true : false,
					size: 1,
					content: content
				};
			}
		}
		testDataSingle[i] = {
			totalElements: 5,
			number: i,
			current: i + 1,
			totalPages: 5,
			first: i === 0 ? true : false,
			last: i === 4 ? true : false,
			size: 1,
			content: [{
					names: [{full: 'Полное 1_' + (i + 1), short: 'Короткое', sub: 'Подчиненность', date: '1940-1942'},
						{full: 'Полное 2_' + (i + 1), short: 'Короткое', sub: 'Подчиненность', date: '1940-1942'},
						{full: 'Полное 3_' + (i + 1), short: 'Короткое', sub: 'Подчиненность', date: '1940-1942'}],
					rewards: [{type: 1, startDate: '194' + i, endDate: '194' + (i + 2),
							opisNumber: 'Опись №' + (i + 1), docsCount: '10'},
						{type: 2, startDate: '194' + i, endDate: '194' + (i + 2),
							opisNumber: 'Опись №' + (i + 1), docsCount: '10'},
						{type: 1, startDate: '194' + i, endDate: '194' + (i + 2),
							opisNumber: 'Опись №' + (i + 1), docsCount: '10'}
					],
					trips: [{type: 1, startDate: '194' + i, endDate: '194' + (i + 2), opisNumber: 'Опись №' + (i + 1), docsCount: '10'},
						{type: 2, startDate: '194' + i, endDate: '194' + (i + 2), opisNumber: 'Опись №' + (i + 1), docsCount: '10'},
						{type: 1, startDate: '194' + i, endDate: '194' + (i + 2), opisNumber: 'Опись №' + (i + 1), docsCount: '10'}
					],
					user: 'Кузнецов О. И.',
					date: '28.03.2015'
				}]
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
		loadOrgCard: function (numberOfPage) {
			if (numberOfPage === undefined)
				numberOfPage = 0;
			var data = testDataSingle[numberOfPage];
			clear(orgCard);
			for (var o in data) {
				orgCard[o] = data[o];
			}

			/*
			 $http.get('/search/card', {
			 params: buildParams(numberOfPage - 1, 1)
			 }).success(function (data) {
			 for (var o in data) {
			 orgCard[o] = data[o];
			 }
			 if (!orgCard.totalElements) // Не должно быть такой ситуации никогда
			 ShowMessage.show('Внимание', 'Ошибка получения данных');
			 }).error(function () {
			 clear(orgCard);
			 ShowMessage.show('Внимание', 'Ошибка получения данных');
			 });
			 */
		},
		// Получает данные для места хранения
		loadStorePlace: function (numberOfPage) {
			if (numberOfPage === undefined)
				numberOfPage = 0;
			var data = places[orgCard.number][numberOfPage];
			clear(storePlace);
			for (var o in data) {
				storePlace[o] = data[o];
			}
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


