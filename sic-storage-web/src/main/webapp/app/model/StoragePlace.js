Ext.define('storeplaces.model.StoragePlace',{
	extend:'Ext.data.Model',
	fields:[{
		name:'id',
		type:'int'
	},{
		name:'storageType',
		type:'string'
	},{
		name:'archive',
		type:'string'
	},{
		name:'orgName',
		type:'string'
	},{
		name:'address',
		type:'string'
	},{
		name:'documentCount',
		type:'string'
	},{
		name:'beginYear',
		type:'int'
	},{
		name:'endYear',
		type:'int'
	},{
		name:'contents',
		type:'string'
	},{
        name:'phone',
        type:'string'
    }]
});