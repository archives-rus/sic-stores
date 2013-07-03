Ext.define('storeplaces.store.DocsWriteStore',{
	extend : 'Ext.data.Store',
	storeId : 'DocsWriteStore',
	autoLoad:true,
	model : 'storeplaces.model.DocTableEntryWrite',
	proxy : {
		type : 'ajax',
		url:'servlet/QueryDocuments',
		reader : {
			type : 'json'
		},
		params:{
			mode:'EDIT'
		}
	}
});