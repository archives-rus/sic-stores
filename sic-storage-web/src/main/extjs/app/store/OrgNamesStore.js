Ext.define('storeplaces.store.OrgNamesStore', {
	extend: 'Ext.data.Store',
	storeId: 'OrgNamesStore',
	singleton: true,
	autoLoad: false,
	model: 'storeplaces.model.OrganizationName',
	proxy: {
		type: 'ajax',
		url: 'servlet/QueryOrgNames',
		reader: {
			type: 'json'
		}
	}
});