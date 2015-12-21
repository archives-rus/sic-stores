/**
 * Отвечает за создание новой карточки, а также редактирование и просмотр карточки по id
 */
SP.controller('NewCardCtrl', function (Card, orgCard, orgCardPage, $routeParams,
		$location, Search) {
	var me = this;
	function loadCard() { // Загружаем существующую карточку
		Card.get($routeParams.id, function () {
			me.data = orgCard;
			me.places = orgCard.places;
			me.loadPlace(0);
		});
	}

	function initCard() { // Создаем новую карточку
		Card.newCard();
		me.data = orgCard;
		me.places = orgCard.places;
	}
	me.loadPage = function (page) {
		page = page === undefined ? 0 : page;
		if ($routeParams.pos != page) {
			$location.path('/cards/' + page);
		} else {
			Search.loadOrgCard(page, function () {
				me.data = orgCard;
				me.places = orgCard.places;
				me.loadPlace(0);
				me.page = orgCardPage;
			});
		}
	};

	if (/^\/card\/edit\/[0-9]+/.test($location.path())) {
		me.edit = true;
		loadCard();
	} else if (/^\/newcard/.test($location.path())) {
		me.edit = true;
		initCard();
	} else if (/^\/cards\/[0-9]+/.test($location.path())) {
		me.edit = false;
		me.loadPage($routeParams.pos);
	} else { // Загружаем карточку для просмотра
		me.edit = false;
		loadCard();
	}

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
		me.places.push({docs: [], rewards: [], trips: []});
		me.loadPlace(me.places.length - 1);
	};
	me.remove = function () {
		var current = me.place.number;
		me.places.splice(current, 1);
		me.loadPlace(current);
	};
});
