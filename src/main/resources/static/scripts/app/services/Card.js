/** 
 * Сервис для работы с карточкой. Сохранить, удалить, создать новую.
 */
SP.service('Card', function ($http, orgCard, $httpParamSerializerJQLike) {
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
		save: function () {
			var card = orgCard.content[0];
			// TODO удалить пустые значения в местах хранения и таблицах
			// или это сделать на стороне сервера
			$http[card.id ? 'post' : 'put']({url: '/organization/save',
				data: $httpParamSerializerJQLike(card),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}})
					.success(function (data) {
						console.log(data);
					})
					.error(function (data) {
						console.log(data);
					});
		}
	};
});


