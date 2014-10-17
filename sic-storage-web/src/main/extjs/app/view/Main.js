Ext.define('storeplaces.view.Main', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.tab.Panel',
		'Ext.layout.container.Border'
	],
	//height:'100%',
	//height:200,
	autoScroll: true,
	xtype: 'app-main',
//    items:[Ext.create('storeplaces.view.page.CLoginPage')]
	initComponent: function() {
		var page = Ext.create('storeplaces.view.page.CSearchPage'),
				store = Ext.create('Ext.data.Store', {
					proxy: {
						type: 'localstorage',
						id: 'user'
					},
					fields: [
						{name: 'id', type: 'string'},
						{name: 'userId', type: 'int'},
						{name: 'name', type: 'string'},
						{name: 'access', type: 'auto'},
						{name: 'organization', type: 'int'}
					]});
		store.load({callback: function() {
				var userName = store.getById('current').get('name');
				page.down('toolbar').down('label').setText(userName);
				Ext.example.msg('Доброго времени суток', userName);
			}});
		this.items = [page];
		this.callParent();

		storeplaces.userStore = store;
	}
});

