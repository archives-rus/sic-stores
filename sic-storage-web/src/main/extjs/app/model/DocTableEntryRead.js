Ext.define('storeplaces.model.DocTableEntryRead',{
	extend:'Ext.data.Model',
	fields:[{
        name:'id',
        type:'int'
    },{
		name:'documentType',
		type:'string'
	},{
		name:'dates',
		type:'string'
	},{
		name:'series',
		type:'string'
	}, {
		name: 'caseCount',
		type: 'int'
	}]
	
});