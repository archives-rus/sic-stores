Ext.define('storeplaces.store.GridSearchOrgStore', {
	extend: 'Ext.data.Store',
	storeId: 'GridSearchOrgStore',
	singleton: true,
	autoLoad: false,
	pageSize: 10,
	model: 'storeplaces.model.GridSearchOrgModel',
	proxy: {
		type: 'ajax',
		url: 'servlet/SearchOrganization',
		reader: {
			type: 'json',
			root: 'values',
			totalProperty: 'results'
		}
	},
	listeners: {
		'load': function (store) {
			if (store.getCount() === 0 && store.currentPage !== 0 &&
					Ext.getStore('CardsStoreAll').getCount() !== 1)
				Ext.Msg.alert('Внимание', 'Организации не найдены!');
		}
	}
});
