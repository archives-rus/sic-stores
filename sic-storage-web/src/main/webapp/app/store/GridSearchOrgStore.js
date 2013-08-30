Ext.define('storeplaces.store.GridSearchOrgStore',{
    extend : 'Ext.data.Store',
    storeId : 'GridSearchOrgStore',
    autoLoad:false,
    pageSize: 2,
    model:'storeplaces.model.GridSearchOrgModel',
    proxy : {
        type : 'ajax',
        url:'servlet/SearchOrganization',
        reader : {
            type : 'json',
            root :'values',
            totalProperty : 'results'
        }
    },
    listeners: {
        'load':function(store) {
            if (store.getCount()==0) Ext.Msg.alert('Внимание', 'Организации не найдены!');
        }
    }
});
