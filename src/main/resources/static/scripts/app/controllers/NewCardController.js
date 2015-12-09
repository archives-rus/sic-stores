/**
 * Отвечает за создание новой карточки
 */
SP.controller('NewCardCtrl', function (Card, orgCard) {
	var me = this;
	me.edit = true;
	Card.newCard();
	me.result = orgCard;


	me.place = Card.newPlace();
});