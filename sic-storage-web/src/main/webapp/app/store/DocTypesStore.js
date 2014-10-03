Ext.define('storeplaces.store.DocTypesStore', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	singleton: true,
	storeId: 'DocTypesStore',
	model: 'storeplaces.model.DocTypesModel',
	proxy: {
		type: 'ajax',
		url: 'servlet/DescValuesProvider',
		reader: {
			type: 'json'
		},
		extraParams: {
			action: 'getDictValues',
			dict: 'DOCUMENT_TYPE'
		}
	}
});
