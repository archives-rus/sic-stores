Ext.define('storeplaces.view.Viewport', {
    extend: 'Ext.container.Viewport',
    autoScroll:false,
    layout: {
        type: 'fit'
       },
    items:[Ext.create('storeplaces.view.Main'),Ext.create('storeplaces.view.Buffer')]
});
