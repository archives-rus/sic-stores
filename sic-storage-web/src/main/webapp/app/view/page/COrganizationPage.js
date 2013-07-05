Ext.define('storeplaces.view.page.COrganizationPage',{
	extend:'Ext.form.Panel',

	minWidth:1024,
	xtype:'corgpage',
	width:'100%',
	id:'orgpage',
	placesFieldSet:null,
	initComponent:function(){
		
		var toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[
				Ext.create('Ext.Button',{
					text:'Добавить',
					cls:'btnAdd',
					action:'orgCardAdd'
				}),
				Ext.create('Ext.Button',{
					text:'Редактировать',
					cls:'btnEdit',
					action:'orgCardEdit'
				}),
				Ext.create('Ext.Button',{
					text:'Просмотр',
					cls:'btnView',
					action:'orgCardView'
				}),
				Ext.create('Ext.Button',{
					text:'Сохранить',
					cls:'btnSave',
					action:'orgCardSave'
				}),
				Ext.create('Ext.Button',{
					text:'Отменить',
					cls:'btnCancel',
					action:'orgCardCancel'
				}),
				Ext.create('Ext.Button',{
					text:'Удалить',
					cls:'btnDelete',
					action:'orgCardDelete'
				})
			]
		});
		
		var gridToolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[Ext.create('Ext.Button',{
				text:'+',
				action:'namesGridAdd'
			}),Ext.create('Ext.Button',{
				text:'^',
				action:'namesGridUp'
			}),Ext.create('Ext.Button',{
				text:'˅',
				action:'namesGridDown'
			})
			]
		});
		
		var gridNames = Ext.create('Ext.grid.Panel',{
			store:Ext.getStore('toreplaces.store.OrgNamesStore'),
			dockedItems:gridToolBar,
			forceFit:true,
			width:'100%',
			height:180,
			autoScroll:true,
			columns:[{
				text:'ИД',
				dataIndex:'id',
				hidden:true,
				hideable:false
			},{
				text:'Полное наименование и переименования',
				dataIndex:'fullName'
			},{
				text:'Краткое наименование',
				dataIndex:'shortName'
			},{
				text:'Подчинённость',
				dataIndex:'subordination'
			},{
				text:'Даты',
				dataIndex:'dates'
			},{
				text:'Сортировка',
				dataIndex:'sortOrder',
				hidden:true,
				hideable:false
			}]
		})
		
		
		var renamesFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',{
			title:'Наименование организации',
			height:200,
			items:[gridNames]
		});
		
		
		var tfArchive = Ext.create('Ext.form.field.Text',{
			fieldLabel:'Архив',
			name:'archive',
			width:350,
			labelWidth:100
		});
		
		var tfFondNum = Ext.create('Ext.form.field.Text',{
			fieldLabel:'№ фонда',
			name:'fund',
			width:350,
			labelWidth:100
		});
		
		var taFundName = Ext.create('Ext.form.field.TextArea',{
			fieldLabel:'Название фонда',
			name:'fundName',
			height:30,
			width:'100%'
		});
		
		var tfDates = Ext.create('Ext.form.field.Text',{
			fieldLabel:'Крайние даты фонда',
			name:'edgeDates',
			width:'100%'
		});
		
		var fundFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',{
			title:'Фондовая принадлежность',
			height:100,
			layout:{
				type:'table',
				columns:2
			},
			items:[
				tfArchive,taFundName,tfFondNum,tfDates
			]
		});

		this.placesFieldSet = Ext.create('storeplaces.view.lib.StyledFieldSet',{
			title:'Места хранения',
			width:'100%',
			height:400,
			autoScroll:true,
			items:[Ext.create('Ext.toolbar.Toolbar',{
				items:[Ext.create('Ext.Button',{
					text:'Добавить',
					cls:'btnAdd',
					id:'addStorePlace',
					action:'addStorePlace'
				})]
			})]
		});
		
		
		var areaFieldSets = Ext.create('storeplaces.view.lib.StyledFieldSet',{
			layout:'fit',
			items:[
				Ext.create('Ext.form.field.TextArea',{
					fieldLabel:'Сведения о загранкомандировках',
					labelWidth:200
				}),
				Ext.create('Ext.form.field.TextArea',{
					fieldLabel:'Сведения о награждениях',
					labelWidth:200
				}),
				Ext.create('Ext.form.field.TextArea',{
					fieldLabel:'Примечание',
					labelWidth:200
				})
			]
		});
		
		var tfUser = Ext.create('Ext.form.field.Text',{
			fieldLabel:'Имя пользователя',
			name:'user'
		});
		
		tfUser.setDisabled(true);
		
		var tfDateOfEdit = Ext.create('Ext.form.field.Text',{
			fieldLabel:'Дата корректировки',
			name:'dateOfEdit'
		});
		
		tfDateOfEdit.setDisabled(true);
		
		Ext.applyIf(this,{
			items:[toolBar,renamesFieldset,fundFieldset,this.placesFieldSet,areaFieldSets,tfUser,tfDateOfEdit]
		});
		
		this.callParent(arguments);
		
	}
});