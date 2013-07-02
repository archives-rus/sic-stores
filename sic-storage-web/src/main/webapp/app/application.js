Ext.define('storeplaces.Application', {
    name: 'storeplaces',

    extend: 'Ext.app.Application',

    views: [
       'storeplaces.view.card.CStorePlace'
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        'storeplaces.store.StorageTypeStore'
    ]
});
