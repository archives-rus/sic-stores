Ext.define('storeplaces.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    height:'100%',
    autoScroll:true,
    xtype: 'app-main',

//    layout: {
//        type: 'border'
//    },

//    items: [Ext.create('storeplaces.view.card.CStorePlace'),Ext.create('Ext.Button',{
//    	text:'Режим чтения',
//    	id:'loadViewDocsTable'
//    }),Ext.create('Ext.Button',{
//    	text:'Режим редактирования',
//    	id:'loadEditDocsTable'
//    })]

	//items:[Ext.create('storeplaces.view.page.COrganizationPage')]
    items:[Ext.create('storeplaces.view.page.CSearchPage')]
    //items:[Ext.create('storeplaces.view.page.CLoginPage')]
});