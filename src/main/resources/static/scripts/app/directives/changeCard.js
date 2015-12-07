/** 
 * Карточка для отображения операции для ЖРИ 
 */
SP.directive('spChangeCard', function() {
	return {
		templateUrl: 'partials/directives/change-card.html',
		link: function(scope) {

		},
		scope: {
			data: '='
		}
	};
});