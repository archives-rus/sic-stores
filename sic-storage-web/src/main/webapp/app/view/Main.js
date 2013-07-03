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

    items: [Ext.create('storeplaces.view.card.CStorePlace'),Ext.create('Ext.Button',{
    	text:'Просмотр',
    	id:'readOnlyMode'
    }),Ext.create('Ext.Button',{
    	text:'Редактирование',
    	id:'editMode'
    })]
});