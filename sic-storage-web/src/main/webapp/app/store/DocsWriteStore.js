Ext.define('storeplaces.store.DocsWriteStore',{
	extend : 'Ext.data.Store',
	//storeId : 'DocsWriteStore',
	autoLoad:false,
	model : 'storeplaces.model.DocTableEntryWrite',
	proxy : {
		type : 'ajax',
		url:'servlet/QueryDocuments',
		reader : {
			type : 'json'
		}
	}
});