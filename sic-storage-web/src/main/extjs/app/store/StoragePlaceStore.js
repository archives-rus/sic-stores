Ext.define('storeplaces.store.StoragePlaceStore', {
	extend: 'Ext.data.Store',
	storeId: 'StoragePlaceStore',
	autoLoad: false,
	singleton: true,
	model: 'storeplaces.model.StoragePlace'
});
