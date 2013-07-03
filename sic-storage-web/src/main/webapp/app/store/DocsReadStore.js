Ext.define('storeplaces.store.DocsReadStore',{
	extend : 'Ext.data.Store',
	storeId : 'DocsReadStore',
	autoLoad:true,
	model : 'storeplaces.model.DocTableEntryRead',
	proxy : {
		type : 'ajax',
		url:'servlet/QueryDocuments',
		reader : {
			type : 'json'
		},
		params:{
			mode:'VIEW'
		}
	}
});