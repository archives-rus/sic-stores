/**
 * Выводит сообщение в модальном окне
 * @param {String} title - заголовок окна
 * @param {String} message - сообщение окна
 */
SP.service('ShowMessage', ['$modal', function ($modal) {
		return {
			show: function (title, message) {
				$modal.open({
					animation: true,
					templateUrl: 'views/dialogs/message.html',
					controller: 'ShowMessageCtrl',
					resolve: {
						title: function () {
							return title;
						},
						message: function () {
							return message;
						}
					}
				});
			}};
	}]);