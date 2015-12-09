/** 
 * Сервис для работы с карточкой. Сохранить, удалить, создать новую.
 */
SP.service('Card', function ($http, orgCard) {
	var pageble = {
		totalElements: 0,
		number: 0,
		current: 0,
		totalPages: 0,
		first: true,
		last: true,
		size: 0
	};
	return {
		newCard: function () {
			for (var o in pageble) {
				orgCard[o] = pageble[o];
			}
			orgCard.content = [{
					names: [],
					rewards: [],
					trips: [],
					places: []
				}];
		},
		newPlace: function () {
			var obj = {};
			for (var o in pageble) {
				obj[o] = pageble[o];
			}
			obj.content = [{docs: []}];
			return obj;
		},
		save: function () {
			console.log(orgCard);
		}
	};
});


