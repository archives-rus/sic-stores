/** 
 * Сервис для работы с карточкой. Сохранить, удалить, создать новую.
 */
SP.service('Card', function ($http, orgCard, $location, $rootScope,
		orgCardPage, ShowMessage) {
	var requiredArchFields = {
		archive: 'Архив',
		level: 'Уровень архива',
		adres: 'Адрес архива',
		number: 'Номер фонда',
		fondName: 'Название фонда',
		startYear: 'Начальный год',
		endYear: 'Конечный год'
	},
	requiredOrgFields = {
		orgAdres: 'Адрес организации',
		startYear: 'Начальный год',
		endYear: 'Конечный год'
	},
	requiredNameFields = {
		full: 'Полное наименование и переименования',
		dates: 'Даты'
	},
	requiredDocFields = {
		type: 'Вид документа'
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
		// Проверяем наименования и переименования
		if (!orgCard.names.length) {
			fields.push('Требуется добавить наименование организации');
		} else {
			orgCard.names.forEach(function (it, i) {
				for (var o in requiredNameFields) {
					if (!it[o]) {
						fields.push("Наименование " + (i + 1) + ": " + requiredNameFields[o]);
					}
				}
			});
		}
		// Проверяем места хранения
		if (!orgCard.places.length) {
			fields.push('Требуется добавить место хранения');
		} else {
			orgCard.places.forEach(function (it, i) {
				var prefix = "Место " + (i + 1) + ': ';
				if (!it.type) {
					fields.push(prefix + 'Место хранения');
				} else {
					var placeType = getPlaceType(it.type);
					if (placeType === 'Архив') {
						for (var o in requiredArchFields) {
							if (!it[o]) {
								fields.push(prefix + requiredArchFields[o]);
							}
						}
					} else if (placeType === 'Организация') {
						for (var v in requiredOrgFields) {
							if (!it[v]) {
								fields.push(prefix + requiredOrgFields[v]);
							}
						}
					} else {
						fields.push(prefix + "Неизвестное место хранения");
					}
					var docs = it.docs;
					if (!docs.length) {
						fields.push(prefix + 'Требуется добавить состав документов');
					} else {
						docs.forEach(function (it, i) {
							for (var o in requiredDocFields) {
								if (!it[o]) {
									fields.push(prefix + "Состав документов " + (i + 1) + ": " + requiredDocFields[o]);
								}
							}
						});
					}
				}
			});
		}
		return fields.length;
	}

	return {
		newCard: function () {
			orgCard.names = [];
			orgCard.places = [];
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


