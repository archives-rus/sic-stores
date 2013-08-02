Ext.define('storeplaces.view.page.COrganizationPage', {
	extend : 'Ext.form.Panel',
    autoScroll : true,
	minWidth : 1024,
	xtype : 'corgpage',
	width : '100%',
	id : 'orgpage',
	placesFieldSet : null,
    gridNames : null,
    gridToolBar : null,
	initComponent : function() {
		var toolBar = Ext.create('Ext.toolbar.Toolbar', {
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

							Ext.create('Ext.form.Label', {
										html : 'Пользователь П.П.',
										baseCls : 'loginedUserText',
										flex : 0
									}), Ext.create('Ext.toolbar.Separator', {
										html : '|',
										id : 'vertSeparator',
										baseCls : 'vertSeparator'
									}), Ext.create('Ext.Button', {
										text : 'Выход',
										tooltip : 'Выход из системы',
										tooltipType : 'title',
										componentCls : 'quitButton',
                                        action:'quit',
										// cls:'quitButton',
										id : 'quit'
									})]
				});

         var cardToolBar = Ext.create('Ext.toolbar.Paging', {
             //store:store,
             layout:{
               type: 'hbox',
               pack:'center'
             },
             beforePageText: 'Карточка',
             afterPageText: 'из {0}',
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
					store : Ext.getStore('storeplaces.store.OrgNamesStore'),
                    buttonAlign:'center',
                    dockedItems: [gridToolBar],
					forceFit : true,
					width : '100%',
					height : 180,
					autoScroll : true,
					columns : [{
								text : 'ИД',
								dataIndex : 'id',
								hidden : true,
								hideable : false
							}, {
								text : 'Полное наименование и переименования',
								dataIndex : 'fullName'
							}, {
								text : 'Краткое наименование',
								dataIndex : 'shortName'
							}, {
								text : 'Подчинённость',
								dataIndex : 'subordination'
							}, {
								text : 'Даты',
								dataIndex : 'dates'
							}, {
								text : 'Сортировка',
								dataIndex : 'sortOrder',
								hidden : true,
								hideable : false
							}]
				})

		var renamesFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',
				{
					title : 'Наименование организации и её переименования',
					height : 160,
					items : [gridNames]
				});

		var tfArchive = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Архив',
					name : 'archive',
					width : 500,
					labelWidth : 100
				});

		var tfFondNum = Ext.create('storeplaces.view.lib.NumFond',{
					name : 'fund',
					//width : 270,
					labelWidth : 100
				});

		var taFundName = Ext.create('Ext.form.field.TextArea', {
					fieldLabel : 'Название фонда',
					name : 'fundName',
					height : 50,
					width : 690,
                    labelWidth : 150
				});

		var tfDates = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Крайние даты фонда',
					name : 'edgeDates',
					width : 440,
                    labelWidth : 150
				});

		var fundFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
					title : 'Фондовая принадлежность',
					height : 150,
					layout : {
						type : 'table',
						columns : 2
					},
					items : [tfArchive, taFundName, tfFondNum, tfDates]
				});

		this.placesFieldSet = Ext.create('storeplaces.view.lib.StyledFieldSet',
				{
					title : 'Места хранения',
					width : '100%',
					height : 420,
					autoScroll : true,
                    margin: 20,
					items : [Ext.create('Ext.toolbar.Toolbar', {
								items : [Ext.create('Ext.Button', {
											text : 'Добавить',
											cls : 'btnAdd',
                                            height:25,
											id : 'addStorePlace',
											action : 'addStorePlace'
										})]
							})]
				});
        this.placesFieldSet.add(Ext.create('storeplaces.view.card.CStorePlace'));

		var areaFieldSets = Ext.create('storeplaces.view.lib.StyledFieldSet', {
					layout : 'fit',
					items : [Ext.create('Ext.form.field.TextArea', {
										fieldLabel : 'Сведения о загранкомандировках',
										labelWidth : 200
									}), Ext.create('Ext.form.field.TextArea', {
										fieldLabel : 'Сведения о награждениях',
										labelWidth : 200
									}), Ext.create('Ext.form.field.TextArea', {
										fieldLabel : 'Примечание',
										labelWidth : 200
									})]
				});

		var tfUser = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Имя пользователя',
					name : 'user'
				});

		tfUser.setDisabled(true);

		var tfDateOfEdit = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Дата корректировки',
					name : 'dateOfEdit'
				});

		tfDateOfEdit.setDisabled(true);


		Ext.applyIf(this, {
            items : [toolBar,cardToolBar, renamesFieldset, fundFieldset,
                this.placesFieldSet, areaFieldSets, tfUser,
                tfDateOfEdit]
        });

		this.callParent(arguments);

	}
});