Ext.define('storeplaces.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'storeplaces.view.Main'
	],
	autoScroll: false,
	layout: {
		type: 'fit'
	},
	items: [storeplaces.mainView = Ext.create('storeplaces.view.Main')]
});
