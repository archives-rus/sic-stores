Ext.define('storeplaces.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'storeplaces.view.Main',
		'storeplaces.view.Buffer'
	],
	autoScroll: false,
	layout: {
		type: 'fit'
	},
	items: [Ext.create('storeplaces.view.Main'),
		Ext.create('storeplaces.view.Buffer')]
});
