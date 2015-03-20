Ext.application({
	name: 'storeplaces',
	extend: 'storeplaces.Application',
	launch: function () {
		storeplaces.app = this;
		Ext.Ajax.request({
			url: '/qq-web/rest/userinfo',
			success: function (response) {
				var authRes = Ext.decode(response.responseText);
				storeplaces.fio = authRes.name;

				Ext.create('storeplaces.view.Viewport');
			},
			failure: function () {
				Ext.Msg.alert("Ошибка", "Невозможно получить данные о пользователе.",
						function () {
							window.location = "/qq-web/";
						});
			}
		});
	}

});
