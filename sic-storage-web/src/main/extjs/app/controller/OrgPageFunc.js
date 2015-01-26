
Ext.define('storeplaces.controller.OrgPageFunc', {
	extend: 'Ext.app.Controller',
	alias: 'OrgPageFunc',
	onLaunch: function () {
	},
	moveNext: function mvN(id) {
		var myOrgPage = storeplaces.mainView.setPage('COrganizationPageView');
		myOrgPage.idCard = id;

		Ext.Ajax.abortAll();

		Ext.Ajax.request({
			url: 'servlet/QueryOrganization',
			params: {
				id: id,
				mode: 'VIEW'
			},
			success: function (action) {
				myOrgPage.setData(Ext.decode(action.responseText));
			},
			failure: function (req) {
				if (!req.aborted)
					Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
			}
		});
	}
});


