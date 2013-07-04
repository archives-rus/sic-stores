Ext.define('storeplaces.store.DocsReadStore',{
	extend : 'Ext.data.Store',
	storeId : 'DocsReadStore',
	autoLoad:false,
	model : 'storeplaces.model.DocTableEntryRead',
	proxy : {
		type : 'ajax',
		url:'servlet/QueryDocuments',
		reader : {
			type : 'json'
		}
	}
});