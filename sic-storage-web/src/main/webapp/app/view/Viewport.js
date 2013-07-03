Ext.define('storeplaces.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'storeplaces.view.Main',
        'Ext.grid.header.Container'
    ],

    layout: {
        type: 'vbox'
    },

    items: [Ext.create('storeplaces.view.Main')]
});
