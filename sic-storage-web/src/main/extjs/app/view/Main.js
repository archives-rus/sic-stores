Ext.define('storeplaces.view.Main', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.tab.Panel',
		'Ext.layout.container.Border',
		'Ext.layout.container.Card',
		'Ext.DomHelper',
		'Ext.String'
	],
	autoScroll: true,
	xtype: 'app-main',
	layout: 'card',
	pages: {},
	initComponent: function () {
		var me = this,
				store = Ext.create('Ext.data.Store', {
					proxy: {
						type: 'localstorage',
						id: 'user'
					},
					fields: [{name: 'id', type: 'string'},
						{name: 'userId', type: 'int'},
						{name: 'name', type: 'string'},
						{name: 'access', type: 'auto'},
						{name: 'organization', type: 'int'}
					]});
		me.callParent();
		storeplaces.userStore = store;
		me._lt = me.getLayout();

		store.load({callback: function () {
				var userName = store.getById('current').get('name');
				storeplaces.userName = userName;
				me.setPage('CSearchPage');
				Ext.onReady(function () {
					storeplaces.alert('Доброго времени суток', userName);
				});
			}});

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
	setPage: function (classOfPage) {
		var me = this,
				pages = me.pages;
		if (!pages[classOfPage]) {
			pages[classOfPage] = Ext.create(classOfPage);
			me.add(pages[classOfPage]);
		}
		me._prv = me._lt.getActiveItem();
		return me._lt.setActiveItem(pages[classOfPage]);
	},
	setPrev: function () {
		if (this._prv)
			return this._lt.setActiveItem(this._prv);
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
