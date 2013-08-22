Ext.define('storeplaces.view.page.COrganizationPage', {
	extend : 'Ext.form.Panel',
    autoScroll : true,
	minWidth : 1024,
    //height: '100%',
    minHeight: 500,
    //height: 880,
    height: 880,
    FIO : null,
	xtype : 'corgpage',
	width : '100%',
    oldData: null,
	//id : 'orgpage',
	placesFieldSet : null,
    areaFieldSets : null,
    tfUser : null,
    fundFieldset : null,
    tfDateOfEdit : null,
    orgStore : null,
    gridNames : null,
    gridToolBar : null,
    loadRecord:function(){
        var me = this;
        me.callParent();

    },
	initComponent : function() {
        //this.setHeight(600);
        this.orgStore =  Ext.create('storeplaces.store.OrgNamesStore');
        this.FIO = Ext.create('Ext.form.Label', {
            text : '',
            baseCls : 'loginedUserText',
            flex : 0
        });
		var toolBar = Ext.create('Ext.toolbar.Toolbar', {
                xtype : 'maintb',
                items : [Ext.create('Ext.Button', {
										text : 'Добавить',
										cls : "btnAdd",
                                        height:25,
										action : 'orgCardAdd'
									}), Ext.create('Ext.Button', {
										text : 'Редактировать',
                                        height:25,
										cls : 'btnEdit',
										action : 'orgCardEdit'
									}), Ext.create('Ext.Button', {
										text : 'Просмотр',
                                        height:25,
										cls : 'btnView',
										action : 'orgCardView'
									}), Ext.create('Ext.Button', {
										text : 'Сохранить',
                                        height:25,
										cls : 'btnSave',
										action : 'orgCardSave'
									}), Ext.create('Ext.Button', {
										text : 'Отменить',
                                        height:25,
										cls : 'btnCancel',
										action : 'orgCardCancel'
									}), Ext.create('Ext.Button', {
										text : 'Удалить',
                                        height:25,
										cls : 'btnDelete',
										action : 'orgCardDelete'
									}), '->',
                                        this.FIO,
							            Ext.create('Ext.toolbar.Separator', {
										html : '|',
										//id : 'vertSeparator',
										baseCls : 'vertSeparator'
									}), Ext.create('Ext.Button', {
										text : 'Выход',
										tooltip : 'Выход из системы',
										tooltipType : 'title',
										componentCls : 'quitButton',
                                        action:'quit'
										// cls:'quitButton',
										//id : 'quit'
									})]
				});

         var cardToolBar = Ext.create('Ext.toolbar.Paging', {
             //store:store,
             layout:{
               type: 'hbox',
               pack:'center'
             },
             beforePageText: 'Карточка',
             afterPageText: 'из {0}'
             //displayMsg: 'Пользователи {0} - {1} из {2}',
             //displayInfo: true
         });

		 gridToolBar = Ext.create('Ext.toolbar.Toolbar', {
					items : [Ext.create('Ext.Button', {
										//text : '+',
										action : 'namesGridAdd',
                                        cls:'addStr'
									}), Ext.create('Ext.Button', {
										//text : '^',
										action : 'namesGridUp',
                                        cls:'upStr'
									}), Ext.create('Ext.Button', {
										//text : '˅',
										action : 'namesGridDown',
                                        cls:'downStr'
									})]
				});

		 gridNames = Ext.create('Ext.grid.Panel', {
					store : this.orgStore,
                    buttonAlign:'center',
                    plugins : ['cellediting'],
                    dockedItems: [gridToolBar],
					forceFit : true,
					width : '100%',
					height : 115,
                    cls:'autoscrl-y',
					autoScroll : true,
					columns : [{
								text : 'ИД',
								dataIndex : 'id',
								hidden : true,
								hideable : false
							}, {
								text : 'Полное наименование и переименования',
								dataIndex : 'fullName',
                                editor : {
                                    xtype : 'textfield',
                                    allowBlank : false
                                }
							}, {
								text : 'Краткое наименование',
								dataIndex : 'shortName',
                                editor : {
                                xtype : 'textfield',
                                allowBlank : false
                                 }
							}, {
								text : 'Подчинённость',
								dataIndex : 'subordination',
                                editor : {
                                    xtype : 'textfield',
                                    allowBlank : false
                                }
							}, {
								text : 'Даты',
								dataIndex : 'dates',
                                editor : {
                                    xtype : 'textfield',
                                    allowBlank : false
                                }
							}, {
								text : 'Сортировка',
								dataIndex : 'sortOrder',
								hidden : true,
								hideable : false
							},
                            {
                                width : 40,
                                xtype : 'actioncolumn',
                                align:'center',
                                items : [{
                                    icon : 'resources/img/emblem-unreadable.png',
                                    tooltip : 'Удалить',
                                    handler : function(grid, rowIndex, colIndex) {
                                       grid.getStore().remove(grid.getStore().getAt(rowIndex));
                                    }
                                }]
                            }]
				})

		var renamesFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',
				{
					title : 'Наименование организации и её переименования',
					height : 150,
					items : [gridNames]
				});

        var cbArchive = Ext.create('Ext.form.ComboBox',  {
            fieldLabel : 'Архив',
            store: Ext.create('storeplaces.store.DocArchiveStore'),
            name : 'archiveStoreOrg',
            editable : false,
            // allowBlank : false,
            queryMode : 'local',
            displayField: 'name',
            valueField: 'id',
            emptyText : 'Не выбрано',
            width : 550,
            labelWidth : 100
        });

		var tfFondNum = Ext.create('storeplaces.view.lib.NumFond',{
					name : 'fund',
					width : 290,
					labelWidth : 100
				});

        tfFondNum.add(Ext.create('Ext.Button', {
            width:50,
            cls : "srch",
            action : 'srchFund'
        })) ;

		var taFundName = Ext.create('Ext.form.field.TextArea', {
					fieldLabel : 'Название фонда',
					name : 'fundName',
                    disabled: true,
					height : 50,
					width : 620,
                    labelWidth : 150
				});

		var tfDates = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Крайние даты фонда',
                    disabled: true,
					name : 'edgeDates',
					width : 440,
                    labelWidth : 150
				});

		this.fundFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
					title : 'Фондовая принадлежность',
					height : 150,
					layout : {
						type : 'table',
						columns : 2
					},
					items : [cbArchive, taFundName, tfFondNum, tfDates]
				});

		this.placesFieldSet = Ext.create('storeplaces.view.lib.StyledFieldSet',
				{
					title : 'Места хранения',
					width : '100%',
					height : 420,
					autoScroll : true,
                    margin: 20
				});

        var tbarStorePlace = Ext.create('Ext.toolbar.Toolbar', {
            items : [Ext.create('Ext.Button', {
                text : 'Добавить',
                cls : 'btnAdd',
                height:25,
                action : 'addStorePlace'
            })]
        });

		 this.areaFieldSets = Ext.create('storeplaces.view.lib.StyledFieldSet', {
					layout : 'fit',
					items : [Ext.create('Ext.form.field.TextArea', {
                                        name: 'zagranInfo',
                                        fieldLabel : 'Сведения о загранкомандировках',
										labelWidth : 200,
                                        height:50
									}), Ext.create('Ext.form.field.TextArea', {
										fieldLabel : 'Сведения о награждениях',
                                        name: 'goldInfo',
										labelWidth : 200,
                                        height:50
									}), Ext.create('Ext.form.field.TextArea', {
										fieldLabel : 'Примечание',
                                        name: 'noteInfo',
										labelWidth : 200,
                                        height:50
									})]
				});

        this.tfUser = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Имя пользователя',
            name : 'user',
            cls:'mar_auto brown-font',
            labelWidth : 150
        });

        this.tfUser.setDisabled(true);

        this.tfDateOfEdit = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Дата корректировки',
            name : 'dateOfEdit',
            cls:'mar_auto brown-font',
            labelWidth : 150
        });

        this.tfDateOfEdit.setDisabled(true);


		Ext.applyIf(this, {
            items : [toolBar,cardToolBar, renamesFieldset, this.fundFieldset,tbarStorePlace,
                this.placesFieldSet, this.areaFieldSets, this.tfUser,
                this.tfDateOfEdit]
        });

		this.callParent(arguments);

	}
});