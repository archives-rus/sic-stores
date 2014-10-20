Ext.define('storeplaces.Application', {
	name: 'storeplaces',
	extend: 'Ext.app.Application',
	requires: [
		'storeplaces.view.Main',
		'storeplaces.view.Buffer',
		'storeplaces.view.lib.NumFond',
		'storeplaces.view.lib.StyledFieldSet',
		'storeplaces.store.DocArchiveStore',
		'storeplaces.store.DocTypesStore',
		'storeplaces.store.OrgNamesStore',
		'storeplaces.store.CardsStoreAll',
		'storeplaces.store.CardsStore',
		'storeplaces.store.GridSearchOrgStore',
		'storeplaces.store.StorageTypeStore'
	],
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
		'storeplaces.controller.SearchFormController',
		'storeplaces.controller.OrgPageFunc'
	],
	stores: [
		'storeplaces.store.DocsReadStore',
		'storeplaces.store.DocsWriteStore'
	]
});


