/**
 *  Панель для определяения места хранения на странице организации в режиме редактирования.
 */
Ext.define("storeplaces.view.card.CStorePlace", {
	extend: 'Ext.form.Panel',
	alias: 'CStorePlace',
	layout: 'absolute',
	xtype: 'storeplacecard',
	requires: [
		'Ext.grid.plugin.CellEditing',
		'storeplaces.store.DocTypesStore',
		'storeplaces.store.StoragePlaceStore',
		'Ext.form.field.Number'
	],
	addresStore: null,
	tfAddr: null,
	tfPhone: null,
	taOrg: null,
	taDocsContent: null,
	cbAddr: null,
	yearInterval: null,
	cbArchive: null,
	docGrid: null,
	idPlace: null,
	idArchStorage: null,
	minHeight: 320,
	height: 'auto',
	//width : 1150,
	width: '97%',
	docGridToolBar: null,
	fieldLabelWidth: 120,
	cls: 'storePlaceCard',
	margin: '10 15 10 15',
	currentMode: null,
	readOnlyMode: 'READ',
	editOnlyMode: 'EDIT',
	cbDocTypes: null,
	docTypeColumnEditor: null,
	gridReadOnlyColumns: [{
			text: 'Вид документа',
			dataIndex: 'documentType',
			flex: 3
		}, {
			text: 'Даты',
			dataIndex: 'dates',
			flex: 2
		}, {
			text: '№ описи',
			dataIndex: 'series',
			flex: 1
		}, {
			text: 'Количество дел',
			dataIndex: 'caseCount',
			flex: 1
		}],
	gridEditOnlyColumns: [{
			text: 'ИД',
			dataIndex: 'id',
			hidden: true,
			hideable: false
		}, {
			text: 'Вид документа',
			width: '60%',
			dataIndex: 'documentTypeId',
			editor: {
				xtype: 'combobox',
				store: 'DocTypesStore',
				valueField: 'id',
				displayField: 'name',
				blankText: 'Не выбран вид документа',
				emptyText: 'Не выбран',
				forceSelection: true,
				validateOnChange: false
			},
			renderer: function (value, store) {
				var editorComboStore = Ext.getStore('DocTypesStore');
				for (var i = 0; i < editorComboStore.getCount(); i++) {
					var obj = editorComboStore.getAt(i);
					if (obj.data.id === value) {
						return obj.data.name;
					}
				}
				return 'Не выбрано';
			}
		}, {
			text: 'Даты',
			width: '15%',
			dataIndex: 'dates',
			editor: {
				xtype: 'textfield',
				allowBlank: false
			}
		}, {
			text: '№ описи',
			width: '10%',
			dataIndex: 'series',
			editor: {
				xtype: 'textfield',
				allowBlank: false
			}
		}, {
			text: 'Количество дел',
			width: '10%',
			dataIndex: 'caseCount',
			editor: {
				xtype: 'numberfield',
				minValue: 0,
				hideTrigger: true,
				keyNavEnabled: false,
				mouseWheelEnabled: false,
				allowExponential: false,
				allowBlank: false
			}
		}, {
			width: '2%',
			xtype: 'actioncolumn',
			align: 'center',
			items: [{
					icon: 'img/emblem-unreadable.png',
					tooltip: 'Удалить',
					handler: function (grid, rowIndex, colIndex) {
						storeplaces.app
								.getController('storeplaces.controller.StorePlaceCardController')
								.removeFromDocGrid(grid, rowIndex, colIndex);
					}
				}]
		}],
	constructor: function (data) {
		if (data && !data.xtype)
			this._data = data;
		this.callParent();
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				addresses = createCmp('Ext.util.MixedCollection');
		me.docsWriteStore = createCmp('storeplaces.store.DocsWriteStore');
		var closeButton = createCmp('Ext.button.Button', {
			x: '98%',
			y: 0,
			height: 25,
			width: 25,
			action: 'deleteCard'
		});
		me.addressStore = createCmp('storeplaces.store.StoragePlaceStore');
		me.cbStorageType = createCmp('Ext.form.field.ComboBox', {
			name: 'storageType',
			fieldLabel: 'Место хранения',
			labelSeparator: '',
			labelWidth: 140, //me.fieldLabelWidth,
			store: 'StoreJournalType',
			width: 370,
			height: 22,
			valueField: 'id',
			displayField: 'valueFull',
			editable: false,
			allowBlank: false,
			queryMode: 'local',
			validateOnChange: false,
			blankText: 'Не выбранo место хранения',
			emptyText: 'Не выбрано',
			forceSelection: true,
			x: 5,
			y: 25,
			listeners: {
				change: function (combo, v) {
					var form = storeplaces.mainView.pages.COrganizationPage;
					if (v === 1) {
						var value = form.fundFieldset.items.items[0].getValue();
						if (value !== null)
							me.cbArchive.setValue(value);

						me.cbArchive.setVisible(true);
						me.taOrg.setVisible(false);
						me.cbAddr.setVisible(true);
						me.tfAddr.setVisible(false);
					} else if (v === 2) {
						var org = form.gridNames.getStore().getAt(0);
						if (!org) {
							Ext.Msg.alert("Ошибка", 'Для выбора этого пункта необходимо заполнить '
									+ 'таблицу "Наименование организации и её переименования"');
							combo.clearValue();
							return;
						}
						me.taOrg.setValue(org.get('fullName'));
						me.taOrg.setVisible(true);

						me.tfAddr.setVisible(true);

						me.cbArchive.setVisible(false);
						me.cbAddr.setVisible(false);
					} else {
						me.clear();
					}
				}
			}
		});

		me.cbDocTypes = createCmp('Ext.form.field.ComboBox', {
			store: 'DocTypesStore',
			valueField: 'id',
			displayField: 'name',
			blankText: 'Не выбран вид документа',
			emptyText: 'Не выбран',
			forceSelection: true,
			validateOnChange: false,
			queryMode: 'local'
		});

		me.taOrg = createCmp('Ext.form.field.TextArea', {
			name: 'orgName',
			fieldLabel: 'Название организации',
			hidden: true,
			height: 46,
			width: 530,
			labelWidth: 140, //me.fieldLabelWidth,
			x: 5,
			y: me.cbStorageType.y + me.cbStorageType.height + 5
		});

		me.cbArchive = createCmp('Ext.form.ComboBox', {
			fieldLabel: 'Архив',
			store: 'DocArchiveStore',
			name: 'archiveStoreCard',
			editable: false,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			emptyText: 'Не выбрано',
			hidden: true,
			width: 585,
			labelWidth: 140, //me.fieldLabelWidth,
			x: 5,
			y: me.cbStorageType.y + me.cbStorageType.height + 5,
			listeners: {
				change: function (cb, value) {
					if (value) {
						var data = addresses.getByKey(value);
						if (!data)
							Ext.Ajax.request({
								url: 'servlet/QueryArchStorage',
								params: {archiveId: value},
								success: function (action) {
									var d = Ext.decode(action.responseText);
									addresses.add(value, d);
									me.addressStore.loadData(d);
								},
								failure: function () {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
						else
							me.addressStore.loadData(data);
					}
				}
			}
		});

		me.nfCount = Ext.create('Ext.form.field.Text', {
			name: 'documentCount',
			fieldLabel: 'Количество ед. хр.',
			labelSeparator: '',
			height: 22,
			width: 300,
			labelWidth: 140, //me.fieldLabelWidth,
			x: 5,
			y: me.taOrg.y + me.taOrg.height + 5
		});

		me.tfAddr = Ext.create('Ext.form.field.Text', {
			name: 'address',
			fieldLabel: 'Адрес',
			labelSeparator: '',
			width: 490,
			hidden: true,
			height: 22,
			labelWidth: 100,
			x: 610,
			y: 25
		});

		me.cbAddr = Ext.create('Ext.form.ComboBox', {
			fieldLabel: 'Адрес',
			store: me.addressStore,
			editable: true,
			queryMode: 'local',
			displayField: 'address',
			valueField: 'id',
			emptyText: 'Не выбрано',
			width: 490,
			labelWidth: 100,
			x: 610,
			y: 25,
			listeners: {
				change: function (cb, value) {
					if (value) {
						var addr = cb.getStore().getById(value);
						if (addr)
							me.tfPhone.setValue(addr.get('phone'));
					}
				}
			}
		});

		me.tfPhone = Ext.create('Ext.form.field.Text', {
			name: 'phone',
			fieldLabel: 'Телефон',
			height: 22,
			width: 300,
			labelSeparator: '',
			labelWidth: 100,
			x: 610,
			y: me.tfAddr.y + me.tfAddr.height + 15
		});

		me.yearInterval = Ext.create('storeplaces.view.lib.YearInterval', {
			fieldLabel: 'Годы',
			width: 310,
			//labelWidth : me.fieldLabelWidth - 50,
			labelWidth: 100,
			x: 610, //x_,
			y: me.tfPhone.y + me.tfPhone.height + 15
		});

		me.docGridToolBar = Ext.create('Ext.toolbar.Toolbar', {
			items: [Ext.create('Ext.Button', {
					action: 'addDocRow',
					cls: 'addStr'
				})]
		});


		me.docGrid = Ext.create('Ext.grid.Panel', {
			store: me.docsWriteStore,
			x: 15,
			plugins: [{ptype: 'cellediting', clicksToEdit: 1}],
			dockedItems: me.docGridToolBar,
			y: me.nfCount.y + me.nfCount.height + 5,
			cls: 'mar_right15',
			height: 135,
			forceFit: true,
			columns: me.gridEditOnlyColumns
		});

		me.taDocsContent = Ext.create('Ext.form.field.TextArea', {
			name: 'contents',
			//labelWidth : me.fieldLabelWidth,
			labelWidth: 140,
			fieldLabel: 'Состав документов',
			height: 40,
			y: me.docGrid.y + me.docGrid.height + 5,
			x: 5,
			width: 1080 //- me.fieldLabelWidth
		});

		Ext.applyIf(me, {
			items: [me.cbStorageType, me.cbArchive, me.taOrg, me.nfCount, me.tfAddr, me.cbAddr,
				me.tfPhone, me.yearInterval, closeButton,
				me.docGrid, me.taDocsContent]
		});

		me.callParent(arguments);
		me.fill();
	},
	clear: function () {
		var me = this;
		me.taOrg.hide();
		me.cbArchive.hide();
		me.cbAddr.show();
		me.tfAddr.hide();
	},
	/**
	 * Наполняет карточку данными, если они есть
	 * data {Object} содержит поля:
	 * 	- address {String}
	 *  - contents {String}
	 *  - orgName {String}
	 *  - phone {String}
	 *  - documentCount {Number}
	 *  - beginYear {Number}
	 *  - endYear {Number}
	 * 	- id {Number}
	 * 	- archStrg {Object} содержит поля:
	 * 			
	 * 	  - address {String}
	 * 	  - archiveId {Number}
	 * 	  - id {Number}
	 */
	fill: function () {
		if (this._data) {
			var me = this,
					data = me._data,
					archStrg = data.archStrg;
			if (archStrg) {
				me.idArchStorage = archStrg.id;
				if (!archStrg.archiveId) {
					me.cbStorageType.setValue(2);
					me.taOrg.setValue(data.orgName);
					me.tfAddr.setValue(data.address);
				} else {
					me.cbStorageType.setValue(1);
					me.cbArchive.setValue(archStrg.archiveId);
					me.cbAddr.setRawValue(data.address);
				}
			} else if (data.orgName) {
				me.cbStorageType.setValue(2);
				me.taOrg.setValue(data.orgName);
				me.tfAddr.setValue(data.address);
			}
			me.idPlace = data.id;

			me.tfPhone.setValue(data.phone);
			me.nfCount.setValue(data.documentCount);
			me.yearInterval.setValue(data.beginYear, data.endYear);
			me.taDocsContent.setValue(data.contents);

			Ext.Ajax.request({
				url: 'servlet/QueryDocuments?mode=EDIT&storageId=' + data.id,
				success: function (action) {
					me.docGrid.columns[1].editor = Ext.create(
							'Ext.form.field.ComboBox', {
								store: 'DocTypesStore',
								valueField: 'id',
								displayField: 'name',
								blankText: 'Не выбран вид документа',
								emptyText: 'Не выбран',
								forceSelection: true,
								validateOnChange: false
							});
					me.docGrid.getStore().loadData(Ext.decode(action.responseText));
				},
				failure: function () {
					Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
				}
			});
		}
	},
	getErrors: function (errors) {
		var me = this,
				address;
		switch (me.cbStorageType.getValue()) {
			case 1:
				address = me.cbAddr.getRawValue();
				break;
			case 2:
				if (!me.taOrg.getValue())
					errors.push('заполнить название организации места хранения');
				address = me.tfAddr.getValue();
				break;
			default:
				errors.push('выбрать место хранения');
				return;
		}
		if (!address)
			errors.push('выбрать / заполнить адрес места хранения');
	}
});
