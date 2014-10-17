Ext.define('storeplaces.view.page.COrganizationPage', {
	extend: 'Ext.form.Panel',
	// autoScroll : true,
	minWidth: 1024,
	minHeight: 500,
	FIO: null,
	idFund: null,
	idCard: null,
	xtype: 'corgpage',
	width: '100%',
	oldData: null,
	cls: 'pad10-20',
	placesFieldSet: null,
	areaFieldSets: null,
	tfUser: null,
	fundFieldset: null,
	tfDateOfEdit: null,
	orgStore: null,
	gridNames: null,
	gridToolBar: null,
	initComponent: function() {
		var me = this,
				create = Ext.create;
		me.orgStore = Ext.getStore('OrgNamesStore');
		me.orgStore.load();
		me.FIO = create('Ext.form.Label', {
			text: '',
			baseCls: 'loginedUserText',
			flex: 0
		});
		var toolBar = create('Ext.toolbar.Toolbar', {
			xtype: 'maintb',
			items: [
				create('Ext.Button', {
					text: 'Сохранить',
					height: 25,
					cls: 'btnSave',
					action: 'orgCardSave'
				}), create('Ext.Button', {
					text: 'Отменить',
					height: 25,
					cls: 'btnCancel',
					action: 'orgCardCancel'
				}),
				create('Ext.Button', {
					text: 'Вернуться к результатам поиска',
					height: 25,
					cls: 'backToSrch',
					action: 'backSrchResult',
					hidden: true
				}),
				'->',
				me.FIO,
				create('Ext.toolbar.Separator', {
					html: '|',
					baseCls: 'vertSeparator'
				}),
				create('Ext.Button', {
					text: 'Выход',
					tooltip: 'Выход из системы',
					tooltipType: 'title',
					componentCls: 'quitButton',
					action: 'quit'
							// cls:'quitButton',
							//id : 'quit'
				})]
		});
		me.gridToolBar = create('Ext.toolbar.Toolbar', {
			items: [create('Ext.Button', {
					//text : '+',
					action: 'namesGridAdd',
					cls: 'addStr'
				}), create('Ext.Button', {
					//text : '^',
					action: 'namesGridDown',
					cls: 'upStr'
				}), create('Ext.Button', {
					//text : '˅',
					action: 'namesGridUp',
					cls: 'downStr'
				})]
		});
		me.gridNames = create('Ext.grid.Panel', {
			store: me.orgStore,
			buttonAlign: 'center',
			plugins: ['cellediting'],
			dockedItems: [me.gridToolBar],
			forceFit: true,
			width: '100%',
			height: 115,
			cls: 'autoscrl-y',
			autoScroll: true,
			columns: [{
					text: 'ИД',
					dataIndex: 'id',
					hidden: true,
					hideable: false
				}, {
					text: 'Полное наименование и переименования',
					dataIndex: 'fullName',
					width: '40%',
					editor: {
						xtype: 'textfield',
						allowBlank: false
					}
				}, {
					text: 'Краткое наименование',
					dataIndex: 'shortName',
					width: '28%',
					editor: {
						xtype: 'textfield',
						allowBlank: false
					}
				}, {
					text: 'Подчинённость',
					dataIndex: 'subordination',
					width: '15%',
					editor: {
						xtype: 'textfield',
						allowBlank: false
					}
				}, {
					text: 'Даты',
					dataIndex: 'dates',
					editor: {
						xtype: 'textfield',
						allowBlank: false,
						width: '15%'
					}
				}, {
					text: 'Сортировка',
					dataIndex: 'sortOrder',
					hidden: true,
					hideable: false
				},
				{
					width: '2%',
					xtype: 'actioncolumn',
					align: 'center',
					items: [{
							icon: 'resources/img/emblem-unreadable.png',
							tooltip: 'Удалить',
							handler: function(grid, rowIndex, colIndex) {
								grid.getStore().remove(grid.getStore().getAt(rowIndex));
							}
						}]
				}]
		})

		var renamesFieldset = create('storeplaces.view.lib.StyledFieldSet',
				{
					title: 'Наименование организации и её переименования',
					height: 150,
					items: [me.gridNames]
				});
		var cbArchive = create('Ext.form.ComboBox', {
			fieldLabel: 'Архив',
			store: 'DocArchiveStore',
			name: 'archiveStoreOrg',
			editable: false,
			// allowBlank : false,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			emptyText: 'Не выбрано',
			width: 550,
			labelWidth: 100
		});
		var tfFondNum = create('storeplaces.view.lib.NumFond', {
			name: 'fund',
			width: 290,
			labelWidth: 100
		});
		tfFondNum.add(create('Ext.Button', {
			width: 30,
			cls: "srch",
			action: 'srchFund'
		}));
		var taFundName = create('Ext.form.field.TextArea', {
			fieldLabel: 'Название фонда',
			name: 'fundName',
			disabled: true,
			height: 50,
			width: 620,
			labelWidth: 150
		});
		var tfDates = create('Ext.form.field.Text', {
			fieldLabel: 'Крайние даты фонда',
			disabled: true,
			name: 'edgeDates',
			width: 440,
			labelWidth: 150
		});
		me.fundFieldset = create('storeplaces.view.lib.StyledFieldSet', {
			title: 'Фондовая принадлежность',
			height: 150,
			layout: {
				type: 'table',
				columns: 2
			},
			items: [cbArchive, taFundName, tfFondNum, tfDates]
		});
		me.placesFieldSet = create('storeplaces.view.lib.StyledFieldSet',
				{
					title: 'Места хранения',
					width: '100%',
					height: 370,
					cls: 'noscrl-x',
					autoScroll: true,
					margin: 20
				});
		var tbarStorePlace = create('Ext.toolbar.Toolbar', {
			items: [create('Ext.Button', {
					text: 'Добавить',
					cls: 'btnAdd',
					height: 25,
					action: 'addStorePlace'
				})]
		});
		me.areaFieldSets = create('storeplaces.view.lib.StyledFieldSet', {
			layout: 'fit',
			items: [create('Ext.form.field.TextArea', {
					name: 'zagranInfo',
					fieldLabel: 'Сведения о загранкомандировках',
					labelWidth: 200,
					height: 33
				}), create('Ext.form.field.TextArea', {
					fieldLabel: 'Сведения о награждениях',
					name: 'goldInfo',
					labelWidth: 200,
					height: 33
				}), create('Ext.form.field.TextArea', {
					fieldLabel: 'Примечание',
					name: 'noteInfo',
					labelWidth: 200,
					height: 33
				})]
		});
		me.tfUser = create('Ext.form.field.Text', {
			fieldLabel: 'Имя пользователя',
			name: 'user',
			disabled: true,
			cls: 'brown-font dis-style',
			labelWidth: 150
		});
		me.tfDateOfEdit = create('Ext.form.field.Text', {
			fieldLabel: 'Дата корректировки',
			name: 'dateOfEdit',
			disabled: true,
			cls: 'brown-font dis-style',
			labelWidth: 150
		});
		var userDate = create('Ext.container.Container', {
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'center'
			},
			items: [me.tfUser, me.tfDateOfEdit]

		});
		Ext.applyIf(me, {
			items: [toolBar, renamesFieldset, me.fundFieldset, tbarStorePlace,
				me.placesFieldSet, me.areaFieldSets, userDate]
		});
		me.callParent(arguments);
	}
});
