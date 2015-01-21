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
	xtype: 'corgpage',
	width: '100%',
	cls: 'pad10-20',
	areaFieldSets: null,
	tfUser: null,
	fundFieldset: null,
	tfDateOfEdit: null,
	orgStore: null,
	gridNames: null,
	gridToolBar: null,
	initComponent: function () {
		var me = this,
				create = Ext.create;
		me.orgStore = create('OrgNamesStore');
//		me.orgStore.load();
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
				}],
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
			var placeCard = Ext.create('CStorePlace'),
					cbAddr = placeCard.cbAddr,
					tfAddr = placeCard.tfAddr,
					tfPhone = placeCard.tfPhone,
					cbStorageType = placeCard.cbStorageType,
					taOrg = placeCard.taOrg,
					nfCount = placeCard.nfCount,
					yearInterval = placeCard.yearInterval,
					archStrg = card.archStrg || null;

			fieldSet.add(placeCard);

			if (archStrg) {
				placeCard.idArchStorage = archStrg.id;
				if (!archStrg.archiveId) {
					cbStorageType.setValue(2);
					taOrg.setValue(card.orgName);
					tfAddr.setValue(card.address);

				} else {
					cbStorageType.setValue(1);
					placeCard.cbArchive.setValue(archStrg.archiveId);
					cbAddr.setRawValue(card.address);
				}
			} else if (card.orgName) {
				cbStorageType.setValue(2);
				taOrg.setValue(card.orgName);
				tfAddr.setValue(card.address);
			}
			placeCard.idPlace = card.id; // id места хранения документов
			[tfPhone, nfCount, yearInterval].forEach(
					function (v) {
						v.setDisabled(false);
					});

			tfPhone.setValue(card.phone);
			nfCount.setValue(card.documentCount);
			yearInterval.setValue(card.beginYear, card.endYear);
			placeCard.taDocsContent.setValue(card.contents);

			Ext.Ajax.request({
				url: 'servlet/QueryDocuments?mode=EDIT&storageId=' + card.id,
				success: function (action) {
					placeCard.docGrid.columns[1].editor = Ext.create(
							'Ext.form.field.ComboBox', {
								store: 'DocTypesStore',
								valueField: 'id',
								displayField: 'name',
								blankText: 'Не выбран вид документа',
								emptyText: 'Не выбран',
								forceSelection: true,
								validateOnChange: false
							});
					placeCard.docGrid.getStore().loadData(Ext.decode(action.responseText));
				},
				failure: function () {
					Ext.msg.alert('Ошибка', 'Ошибка базы данных!');
				}
			});
		});

	}
});
