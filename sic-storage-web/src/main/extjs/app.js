Ext.application({
	name: 'storeplaces',
	extend: 'storeplaces.Application',
	autoCreateViewport: true,
	launch: function () {
		window.app = this;
	}

});
