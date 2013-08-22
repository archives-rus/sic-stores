Ext.define('storeplaces.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    //height:'100%',
    //height:200,
    autoScroll:true,
    xtype: 'app-main',
    items:[Ext.create('storeplaces.view.page.CLoginPage')]
})
