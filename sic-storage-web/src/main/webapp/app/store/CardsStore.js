Ext.define('storeplaces.store.CardsStore',{
    extend : 'Ext.data.Store',
    storeId : 'CardsStore',
    autoLoad:false,
    pageSize: 1,
    fields: ['id'],
    proxy : {
        type : 'ajax',
        url:'servlet/SearchOrganization',
        reader : {
            type : 'json',
            root :'values',
            totalProperty : 'results'
        }
    }
});

