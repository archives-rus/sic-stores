Ext.define('storeplaces.model.DocTableEntryWrite',{
	extend:'Ext.data.Model',
	fields:[{
		name:'id',
		type:'int'
       /* defaultValue : null,
        convert : null*/
	},{
		name:'documentTypeId',
		type:'int'
	},{
		name:'dates',
		type:'string'
	},{
		name:'series',
		type:'string'
	}
	]
});