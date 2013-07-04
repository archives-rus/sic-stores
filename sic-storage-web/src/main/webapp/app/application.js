Ext.define('storeplaces.Application', {
    name: 'storeplaces',

    extend: 'Ext.app.Application',

    views: [
       'storeplaces.view.card.CStorePlace'
    ],

    controllers: [
        'storeplaces.controller.Main'
    ],

    stores: [
        'storeplaces.store.StorageTypeStore','storeplaces.store.DocsReadStore','storeplaces.store.DocsWriteStore'
    ]
});
