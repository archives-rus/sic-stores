Ext.define('storeplaces.store.OrgNamesStore',{
	extend : 'Ext.data.Store',
	storeId : 'OrgNamesStore',
	autoLoad:true,
	model:'storeplaces.model.OrganizationName',
	proxy : {
		type : 'ajax',
		url:'servlet/QueryOrgNames',
		reader : {
			type : 'json'
		}
	}
});