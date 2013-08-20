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
=======

>>>>>>> 9638a3acd09afc85245769fe103ebb6962b91c98

    //items:[Ext.create('storeplaces.view.page.CSearchPage')]
	//items:[Ext.create('storeplaces.view.page.COrganizationPage')]
    items:[Ext.create('storeplaces.view.page.CLoginPage')]
})
