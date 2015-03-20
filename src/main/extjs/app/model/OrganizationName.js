Ext.define('storeplaces.model.OrganizationName',{
	extend:'Ext.data.Model',
	fields:[{
		name:'id',
		type:'int',
        defaultValue : null,
        convert : null
	},{
		name:'fullName',
		type:'string'
	},{
		name:'shortName',
		type:'string'
	},{
		name:'subordination',
		type:'string'
	},{
		name:'dates',
		type:'string'
	},{
		name:'sortOrder',
		type:'int'
	}
	]
})