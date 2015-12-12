/** 
 * Сервис для работы с карточкой. Сохранить, удалить, создать новую.
 */
SP.service('Card', function ($http, orgCard, $location) {
	var initCard = {
			names: [],
			rewards: [],
			trips: [],
			places: []
		};
	function clearCard() {
		for (var o in orgCard) {
			delete orgCard[o];
		}
	}
	return {
		newCard: function () {
			clearCard();
			for (var o in initCard) {
				orgCard[o] = initCard[o];
			}
		},
		save: function () {
			// TODO удалить пустые значения в местах хранения и таблицах
			// или это сделать на стороне сервера

			$http[orgCard.id ? 'put' : 'post']('/organization/save' 
					+ (orgCard.id ? '/' + orgCard.id : ''), orgCard)
					.success(function (id) {
						$location.path('/card/' + id);
					})
					.error(function (data) {
						console.log(data);
					});
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
			;
		}
	};
});


