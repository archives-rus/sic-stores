Ext.define('storeplaces.store.CardsStoreAll',{
    extend : 'Ext.data.Store',
    storeId : 'CardsStoreAll',
    autoLoad:false,
    fields: ['id'],
    proxy : {
        type : 'ajax',
        url:'servlet/SearchOrganization',
        reader : {
            type : 'json',
            root :'values'
        }
    }
});

