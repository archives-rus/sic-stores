Ext.define('storeplaces.store.GridSearchOrgStore',{
    extend : 'Ext.data.Store',
    storeId : 'GridSearchOrgStore',
    autoLoad:false,
    pageSize: 10,
    model:'storeplaces.model.GridSearchOrgModel',
    proxy : {
        type : 'ajax',
        url:'servlet/SearchOrganization',
        reader : {
            type : 'json'
        }
    },
    listeners: {
        'load':function(store) {
            if (store.getCount()==0) Ext.Msg.alert('Внимание', 'Архивы не найдены!');
        }
    }
});
