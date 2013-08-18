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
    //alias: 'widget.appMain',
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

<<<<<<< HEAD

    //items:[Ext.create('storeplaces.view.page.CSearchPage')]
	//items:[Ext.create('storeplaces.view.page.COrganizationPage')]
    items:[Ext.create('storeplaces.view.page.CLoginPage')]
=======
    items:[Ext.create('storeplaces.view.page.CSearchPage')]
	//items:[Ext.create('storeplaces.view.page.COrganizationPage')]
    //items:[Ext.create('storeplaces.view.page.CLoginPage')]
>>>>>>> 13bc5eeb227816bdf54408cef50bbd5751e52f0b
})
