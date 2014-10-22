Ext.define('storeplaces.store.OrgNamesStore', {
	extend: 'Ext.data.Store',
	alias: 'OrgNamesStore',
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