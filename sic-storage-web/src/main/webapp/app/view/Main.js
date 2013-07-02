Ext.define('storeplaces.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

//    layout: {
//        type: 'border'
//    },

    items: [Ext.create('storeplaces.view.card.CStorePlace')]
});