/**
 * Отвечает за создание новой карточки
 */
SP.controller('NewCardCtrl', function (Card, orgCard) {
	var me = this;
	me.edit = true;
	Card.newCard();
	me.page = orgCard;
	me.data = orgCard.content[0];
	me.places = me.data.places;

	/**
	 *  Создает единицу страницы места хранения
	 * @param {Number} index индекс данных в data.places
	 */
	me.loadPlace = function (index) {
		var length = me.places.length;
		if (isNaN(index) || index < 0)
			index = 0;
		if (length > 0) {
			index = index < length ? index : length - 1;
			me.place = {
				totalElements: length,
				number: index,
				current: index + 1,
				totalPages: length,
				first: index === 0,
				last: index === length - 1,
				size: 1,
				content: me.places[index]
			};
		} else {
			me.place = undefined;
		}
	};

	me.add = function () {
		me.places.push({docs: []});
		me.loadPlace(me.places.length - 1);
	};
	me.remove = function () {
		var current = me.place.number;
		me.places.splice(current, 1);
		me.loadPlace(current);
	};
});
