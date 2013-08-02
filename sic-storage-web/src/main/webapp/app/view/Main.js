Ext.define('storeplaces.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    height:'100%',
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
	items:[Ext.create('storeplaces.view.page.COrganizationPage')]
    //items:[Ext.create('storeplaces.view.page.CSearchPage')]
=======
	//items:[Ext.create('storeplaces.view.page.COrganizationPage')]
    items:[Ext.create('storeplaces.view.page.CSearchPage')]
>>>>>>> 1adc03049b97d2b1199e6e76ca724f6f60728c88
    //items:[Ext.create('storeplaces.view.page.CLoginPage')]
})
