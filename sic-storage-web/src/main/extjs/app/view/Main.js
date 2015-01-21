Ext.define('storeplaces.view.Main', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.tab.Panel',
		'Ext.layout.container.Border',
		'Ext.DomHelper',
		'Ext.String'
	],
	//height:'100%',
	//height:200,
	autoScroll: true,
	xtype: 'app-main',
//    items:[Ext.create('storeplaces.view.page.CLoginPage')]
	initComponent: function () {
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
		store.load({callback: function () {
				var userName = store.getById('current').get('name');
				storeplaces.userName = userName;
				page.down('toolbar').down('label').setText(userName);
				Ext.onReady(function () {
					storeplaces.alert('Доброго времени суток', userName);
				});
			}});
		this.items = [page];
		this.callParent();

		storeplaces.userStore = store;

	},
	constructor: function () {
		var msgContainer;
		storeplaces.alert = function (title) {
			if (!msgContainer) {
				msgContainer = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
			}
			var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append(msgContainer, '<div class="msg"><h3>' + title + '</h3><p>' + s + '</p></div>', true);
			m.hide();
			m.slideIn('t').ghost("t", {delay: 1000, remove: true});
		};
		this.callParent();
	},
	setPage: function(page, save) {
		if (save) {
			this.items.getAt(0).hide();
		} else {
			this.removeAll(true);
		}
		this.insert(0, page);
	},
	returnPage: function() {
		if (this.items.getCount() < 2) {
			console.log("Not found previous page");
			return;
		}	
		this.remove(this.getAt(0), true);
		this.getAt(0).show();
	}
});

Ext.Ajax.on('requestexception', function (conn, response) {
	if (response.status === 403) {
		try {
			storeplaces.userStore.removeAll(true);
		} finally {
			window.location = "/qq-web/";
		}
	}
});
