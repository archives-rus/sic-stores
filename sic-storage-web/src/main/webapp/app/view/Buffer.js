Ext.define('storeplaces.view.Buffer', {
	extend: 'Ext.container.Container',
	hidden: true,
	autoScroll: true,
	xtype: 'buffer',
	items: [],
	initComponent: function() {
		window.buffer = this;
		this.callParent(arguments);
	}
});
