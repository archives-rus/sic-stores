Ext.define('storeplaces.controller.EnterFormController', {
	extend: 'Ext.app.Controller',
	view: ['page.CLoginPage'],
	require: [
		'Ext.window.MessageBox',
		'Ext.tip.*'
	],
	init: function () {
		this.control({
			'enterpage button': {
				click: function (btn, eventObj) {
					switch (btn.action) {
						case 'enterForm':
							var tb = btn.up('toolbar');
							var form = tb.up('centerpage');
							var login = form.items.items[1].items.items[0].getRawValue();
							var password = form.items.items[1].items.items[1].getRawValue();
							/*login = 'admin';
							 password = 'pinguin';  */
							Ext.Ajax.request({
								url: 'servlet/Auth',
								params: {
									action: 'login',
									login: login,
									pass: password
								},
								success: function (action) {
									var isSuccess = Ext.decode(action.responseText).success;
									var isMsg = Ext.decode(action.responseText).msg;
									if (isSuccess)
									{
										var tb = storeplaces.mainView.setPage('CSearchPage').down('toolbar');
										var userName = tb.down('label');
										userName.setText(isMsg);
										storeplaces.alert('Доброго времени суток', isMsg);
									}
									else
										storeplaces.alert('Внимание!', isMsg);
								},
								failure: function (action) {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'enterForm':

							break;
						default:
							return;
							break;
					}

				}
			}
		});
	}
});
