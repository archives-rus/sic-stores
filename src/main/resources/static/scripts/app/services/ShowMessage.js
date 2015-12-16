/**
 * Выводит сообщение в модальном окне
 * @param {String} title - заголовок окна
 * @param {String} message - сообщение окна
 */
SP.service('ShowMessage', function ($modal) {
	var ShowMessageController = function ($scope, message, title, $modalInstance) {
		$scope.message = message;
		$scope.title = title;
		$scope.ok = $modalInstance.close;
		$scope.isArray = function() {
			return message instanceof Array;
		};
	};

	ShowMessageController.$inject = ['$scope', 'message', 'title', '$modalInstance'];


	return {
		show: function (title, message) {
			$modal.open({
				animation: true,
				templateUrl: 'partials/services/message.html',
				controller: ShowMessageController,
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
});