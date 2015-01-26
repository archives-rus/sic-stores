/**
 * Страница организации в режиме редактирования (добавления)
 */
Ext.define('storeplaces.view.page.COrganizationPage', {
	extend: 'Ext.form.Panel',
	requires: [
		'storeplaces.store.OrgNamesStore',
		'storeplaces.view.card.CStorePlace'
	],
	alias: 'COrganizationPage',
	minWidth: 1024,
	minHeight: 500,
	idFund: null,
	idCard: null,
	id: 'orgpage',
	xtype: 'corgpage',
	width: '100%',
	cls: 'pad10-20',
	initComponent: function () {
		var me = this,
				create = Ext.create;
		me.orgStore = create('OrgNamesStore');
		var toolBar = create('Ext.toolbar.Toolbar', {
			xtype: 'maintb',
			items: [{
					text: 'Сохранить',
					height: 25,
					cls: 'btnSave',
					action: 'orgCardSave'
				}, {
					text: 'Отменить',
					height: 25,
					cls: 'btnCancel',
					action: 'orgCardCancel'
				}, {
					text: 'Вернуться к результатам поиска',
					height: 25,
					cls: 'backToSrch',
					action: 'backSrchResult'
				},
				'->',
				{
					xtype: 'label',
					text: storeplaces.userName,
					baseCls: 'loginedUserText',
					flex: 0
				},
				{
					xtype: 'tbseparator',
					html: '|',
					baseCls: 'vertSeparator'
				}, {
					text: 'Выход',
					tooltip: 'Выход из системы',
					tooltipType: 'title',
					componentCls: 'quitButton',
					action: 'quit'
				}]
		});
		me.gridToolBar = create('Ext.toolbar.Toolbar', {
			items: [create('Ext.Button', {
					action: 'namesGridAdd',
					cls: 'addStr'
				}), create('Ext.Button', {
					action: 'namesGridDown',
					cls: 'upStr'
				}), create('Ext.Button', {
					action: 'namesGridUp',
					cls: 'downStr'
				})]
		});
		me.gridNames = create('Ext.grid.Panel', {
			store: me.orgStore,
			buttonAlign: 'center',
			plugins: [{ptype: 'cellediting', clicksToEdit: 1}],
			dockedItems: [me.gridToolBar],
			forceFit: true,
			width: '100%',
			minHeight: 80,
			maxHeight: 135,
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
							icon: 'img/emblem-unreadable.png',
							tooltip: 'Удалить',
							handler: function (grid, rowIndex, colIndex) {
								grid.getStore().remove(grid.getStore().getAt(rowIndex));
							}
						}]
				}]
		});

		var renamesFieldset = create('StyledFieldSet', {
			title: 'Наименование организации и её переименования',
			items: [me.gridNames]
		});
		var cbArchive = create('Ext.form.ComboBox', {
			fieldLabel: 'Архив',
			store: 'DocArchiveStore',
			name: 'archiveStoreOrg',
			editable: false,
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
//			disabled: true,
			height: 50,
			width: 620,
			labelWidth: 150
		});
		var tfDates = create('Ext.form.field.Text', {
			fieldLabel: 'Крайние даты фонда',
//			disabled: true,
			name: 'edgeDates',
			width: 440,
			labelWidth: 150
		});
		me.fundFieldset = create('StyledFieldSet', {
			title: 'Фондовая принадлежность',
			height: 150,
			layout: {
				type: 'table',
				columns: 2
			},
			items: [cbArchive, taFundName, tfFondNum, tfDates]
		});
		me.placesFieldSet = create('StyledFieldSet', {
			title: 'Места хранения',
			width: '100%',
			height: 370,
			cls: 'noscrl-x',
			autoScroll: true,
			margin: 20,
			items: [{
					xtype: 'storeplacecard'
				}]
		});
		var tbarStorePlace = create('Ext.toolbar.Toolbar', {
			items: [create('Ext.Button', {
					text: 'Добавить',
					cls: 'btnAdd',
					height: 25,
					action: 'addStorePlace'
				})]
		});
		me.areaFieldSets = create('StyledFieldSet', {
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
		me._btns = toolBar.items;
	},
	fromSearch: function () {
		var buttons = this._btns;
		buttons.getAt(2).show();
		buttons.getAt(1).hide();
	},
	fromView: function () {
		var buttons = this._btns;
		buttons.getAt(1).show();
		buttons.getAt(2).hide();
	},
	/**
	 * Устанавливает места хранения
	 * @param {Object[]} places список мест хранения
	 */
	setPlaces: function (places) {
		var fieldSet = this.placesFieldSet;
		fieldSet.removeAll(true);

		places.forEach(function (card) {
			fieldSet.add(Ext.create('CStorePlace', card));
		});

	},
	clear: function () {
		var me = this;
		me.orgStore.removeAll();
		me.placesFieldSet.removeAll();
		me.placesFieldSet.add(Ext.create('CStorePlace'));
		me.getForm().reset();
//		me.idFund = me.idCard = null;
	},
	/**
	 * Наполняет форму
	 * @param {Object} data имеет вид:
	 * 
	 * 	- archiveId {Number}
	 * 	- lastUpdateDate {String}
	 * 	- notes {String}
	 * 	- userName {String}
	 * 	- businessTripsInfo {String}
	 * 	- rewardsInfo {String}
	 * 	- notes {String}
	 * 	- names {Object[]} каждый объект содержит поля:
	 * 		- fullName ...
	 * 		
	 * 	- fund {Object} содержит поля:
	 * 	
	 * 		- id {Number}	
	 * 		- name {String}
	 * 		- num {Number}
	 * 		- prefix {Number}
	 * 		- suffix {Number}
	 * 		- dates {String}
	 * 		
	 * 	- storage {Object[]}
	 * 			
	 */
	setData: function (data) {
		var me = this,
				areaFieldSets = me.areaFieldSets.items,
				fundSet = me.fundFieldset.items,
				fund = data.fund;
		me.clear();

		me.orgStore.loadData(data.names);

		if (fund) {
			var fundNumber = fundSet.getAt(2).items;

			fundNumber.getAt(0).setValue(fund.prefix);
			fundNumber.getAt(1).setValue(fund.num);
			fundNumber.getAt(2).setValue(fund.suffix);

			fundSet.getAt(1).setValue(fund.name);
			fundSet.getAt(3).setValue(fund.dates);
			me.idFund = data.fund.id;
		}
		fundSet.getAt(0).setValue(data.archiveId);

		areaFieldSets.getAt(0).setValue(data.businessTripsInfo);
		areaFieldSets.getAt(1).setValue(data.rewardsInfo);
		areaFieldSets.getAt(2).setValue(data.notes);

		me.tfUser.setValue(data.userName);
		me.tfDateOfEdit.setValue(data.lastUpdateDate);

		if (data.storage.length) {
			me.setPlaces(data.storage);
		}


	}
});
