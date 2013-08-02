Ext.define('storeplaces.store.DocTypesStore',{
	extend : 'Ext.data.Store',
	storeId : 'DocTypesStore',
	autoLoad:false,
	//fields:['id','name'],
    model: 'storeplaces.model.DocTypesModel',
	proxy : {
		type : 'ajax',
		url:'servlet/DescValuesProvider',
		reader : {
			type : 'json'
		},
		extraParams:{
			action:'getDictValues',
			dict:'DOCUMENT_TYPE'
		}
	}
});