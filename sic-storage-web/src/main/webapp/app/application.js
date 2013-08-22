Ext.define('storeplaces.Application', {
    name: 'storeplaces',

    extend: 'Ext.app.Application',

    views: [
       'storeplaces.view.card.CStorePlace',
        'storeplaces.view.card.CStorePlaceView',
       'storeplaces.view.page.CLoginPage',
       'storeplaces.view.page.COrganizationPage',
        'storeplaces.view.page.CSearchPage',
        'storeplaces.view.page.COrganizationPageView'



    ],

    controllers: [
        'storeplaces.controller.StorePlaceCardController',
        'storeplaces.controller.OrgPageController',
        'storeplaces.controller.EnterFormController',
        'storeplaces.controller.SearchFormController'
    ],

    stores: [
        'storeplaces.store.StorageTypeStore','storeplaces.store.DocsReadStore','storeplaces.store.GridSearchOrgStore',
        'storeplaces.store.DocsWriteStore','storeplaces.store.DocTypesStore','storeplaces.store.DocArchiveStore','storeplaces.store.StoragePlaceStore'
    ]
});
