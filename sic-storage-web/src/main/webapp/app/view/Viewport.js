Ext.define('storeplaces.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[

    ],

//    layout: {
//        type: 'fit'
//    },
    items:[Ext.create('storeplaces.view.Main'),Ext.create('storeplaces.view.Buffer')]
    /*initComponent : function() {
        window.vp = this;
        var mainLogin = [Ext.create('storeplaces.view.Main'),Ext.create('storeplaces.view.Buffer')]

        Ext.applyIf(this, {
            items : [mainLogin]
        });

        this.callParent(arguments);
    }    */
});
