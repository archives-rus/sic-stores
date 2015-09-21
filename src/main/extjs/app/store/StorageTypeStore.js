Ext.define('storeplaces.store.StorageTypeStore', {
	extend: 'Ext.data.ArrayStore',
	singleton: true,
	fields: [{name: 'id', type: 'int'},
		{name: 'valueFull', type: 'string'}],
	storeId: 'StoreJournalType',
	data: [
		[1, "В архиве"],
		[2, "В организации"]
	]
});