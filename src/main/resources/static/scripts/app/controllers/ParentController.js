SP.controller('ParentCtrl', ['$http', '$window', '$location', 'user', '$timeout',
	function ($http, $window, $location, user, $timeout) {
		var me = this;
		$http.get('/userinfo').success(function (data) {
			for (var o in data)
				user[o] = data[o];
			me.fio = user.fio; 
			me.msg = true;
			$timeout(function() {
				me.msg = false;
			}, 1500);
		});

		/**
		 * Выполняет выход из системы
		 */
		me.logout = function () {
			$http({url: "/logout",
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
					.success(function () {
						$window.location.href = '/enter.html';
					});
		};
		/**
		 * Переключает основное меню в зависимости от контекста
		 */
		me.menu = function () {
			var dir = 'views/menu/';
			switch ($location.url()) {
				case '/new_card/main':
					return dir + 'new_card_main.html';
				case '/view_card':
					return dir + 'view_card.html';
				case '/edit_card':
				case '/new_card/view':
					return dir + 'edit_card.html';
				default:
					return dir + 'main.html';
			}
		};
	}]);