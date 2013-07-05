Ext.define('storeplaces.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[

    ],

//    layout: {
//        type: 'fit'
//    },

    items: [Ext.create('storeplaces.view.Main')]
});
