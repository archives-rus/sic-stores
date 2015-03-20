Ext.define('storeplaces.store.CardsStore', {
	extend: 'Ext.data.Store',
	storeId: 'CardsStore',
	autoLoad: false,
	singleton: true,
	pageSize: 1,
	fields: ['orgId'],
	proxy: {
		type: 'ajax',
		url: 'servlet/SearchOrganization',
		reader: {
			type: 'json',
			root: 'values',
			totalProperty: 'results'
		}
	}
});

