/** 
 * Сервис для работы с карточкой. Сохранить, удалить, создать новую.
 */
SP.service('Card', function ($http, orgCard, $location, $rootScope,
		orgCardPage, ShowMessage) {
	var initCard = {
		names: [],
		rewards: [],
		trips: [],
		places: []
	},
	requiredArchFields = {
		archive: 'Архив',
		level: 'Уровень архива',
		adres: 'Адрес архива',
		number: 'Номер фонда',
		fondName: 'Назание фонда',
		startYear: 'Начальный год',
		endYear: 'Конечный год'
	},
	requiredOrgFields = {
		orgAdres: 'Адрес организации'
	},
	fields;

	/**
	 * Возвращает текст для идентификатора типа Места хранения
	 * @param {Number} id идентификатор места хранения
	 * @returns текстовое обазначение места хранения
	 */
	function getPlaceType(id) {
		var places = $rootScope.places;
		for (var i = 0, max = places.length; i < max; ++i) {
			if (places[i].id === id)
				return places[i].fullValue;
		}
	}

	function clearCard() {
		for (var o in orgCard) {
			delete orgCard[o];
		}
	}

	/**
	 * Проверяет на заполнение обязательных полей.
	 * Заполняет список незаполненных полей.
	 * @returns длину списка незаполненных полей
	 */
	function validateCard() {
		fields = [];
		orgCard.places.forEach(function (it, i) {
			if (!it.type) {
				fields.push(i + 1 + ': Место хранения');
			} else {
				var place = getPlaceType(it.type);
				if (place === 'Архив') {
					for (var o in requiredArchFields) {
						if (!it[o]) {
							fields.push(i + 1 + ": " + requiredArchFields[o]);
						}
					}
				} else if (place === 'Организация') {
					for (var v in requiredOrgFields) {
						if (!it[v]) {
							fields.push(i + 1 + ": " + requiredOrgFields[v]);
						}
					}
				} else {
					fields.push(i + 1 + ": Неизвестное место хранения");
				}
			}
		});
		return fields.length;
	}

	return {
		newCard: function () {
			clearCard();
			for (var o in initCard) {
				orgCard[o] = initCard[o];
			}
		},
		save: function (stream) {
			// TODO удалить пустые значения в местах хранения и таблицах
			// или это сделать на стороне сервера
			if (validateCard()) {
				ShowMessage.show('Обязательные поля для заполнения', fields);
			} else {
				delete orgCard.updateDate;
				delete orgCard.user;
				$http[orgCard.id ? 'put' : 'post']('/organization/save' + (orgCard.id ? '/' + orgCard.id : ''), orgCard)
						.success(function (id) {
							if (stream)
								$location.path('/cards/' + orgCardPage.number);
							else
								$location.path('/card/' + id);
						})
						.error(function (data) {
							ShowMessage.show('Ошибка сохранения карточки', data);
						});
			}
		},
		get: function (id, success) {
			$http.get('/organization/' + id)
					.success(function (data) {
						for (var o in data) {
							orgCard[o] = data[o];
						}
						if (success)
							success();
					})
					.error(function (data) {
						console.log(data);
					});
		}
	};
});


