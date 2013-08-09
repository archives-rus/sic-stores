Ext.define('storeplaces.store.DocArchiveStore',{
    extend : 'Ext.data.Store',
    storeId : 'DocArchiveStore',
    autoLoad:true,
    fields:['id','name'],
    //model: 'storeplaces.model.DocTypesModel',
    proxy : {
        type : 'ajax',
        url:'servlet/DescValuesProvider',
        reader : {
            type : 'json'
        },
        extraParams:{
            action:'getArchives'
        }
    }
});
