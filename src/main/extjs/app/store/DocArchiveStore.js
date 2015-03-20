Ext.define('storeplaces.store.DocArchiveStore', {
	extend: 'Ext.data.Store',
	storeId: 'DocArchiveStore',
	singleton: true,
	autoLoad: true,
	fields: ['id', 'name'],
	proxy: {
		type: 'ajax',
		url: 'servlet/DescValuesProvider',
		reader: {
			type: 'json'
		},
		extraParams: {
			action: 'getArchives'
		}
	}
});
