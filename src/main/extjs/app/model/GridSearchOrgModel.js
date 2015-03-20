Ext.define('storeplaces.model.GridSearchOrgModel', {
	extend: 'Ext.data.Model',
	fields: [{
			name: 'id',
			type: 'int'
		}, {
			name: 'orgId',
			type: 'int'
		}, {
			name: 'name',
			type: 'string'
		}, {
			name: 'archive',
			type: 'string'
		}, {
			name: 'fund',
			type: 'string'
		}, {
			name: 'dates',
			type: 'string'
		}]
});

