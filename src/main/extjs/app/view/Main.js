Ext.define('storeplaces.view.Main', {
	extend: 'Ext.container.Container',
	requires: [
		'storeplaces.view.page.CSearchPage',
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
	listeners: {
		afterrender: function () {
			storeplaces.alert('Доброго времени суток', storeplaces.fio);
		}
	},
	initComponent: function () {
		var me = this;
		me.callParent();
		me._lt = me.getLayout();

		me.setPage('CSearchPage');
	},
	constructor: function () {
		var msgContainer;
		storeplaces.alert = function (title, body) {
			if (!msgContainer) {
				msgContainer = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
			}
			var m = Ext.DomHelper.append(msgContainer, '<div class="msg"><h3>' + title + '</h3><p>'
					+ body + '</p></div>', true);
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
		me._lt.setActiveItem(pages[classOfPage]);
		return pages[classOfPage];
	},
	setPrev: function () {
		if (this._prv) {
			this._lt.setActiveItem(this._prv);
			return this._prv;
		}
	},
	getCurrentPage: function () {
		return this._lt.getActiveItem();
	}
});

Ext.Ajax.on('requestexception', function (conn, response) {
	if (response.status === 403) {
		window.location = "/qq-web/";
	}
});
