Ext.define("storeplaces.view.card.CStorePlace", {
	extend : 'Ext.container.Container',
	layout : 'absolute',
	xtype : 'storeplacecard',
	requires : ['Ext.grid.plugin.CellEditing'],
	cbStorageType : null,
	tfAddr : null,
	tfPhone : null,
	taOrg : null,
	nfCount : null,
	taDocsContent : null,
	yearInterval : null,
	docGrid : null,
	minHeight : 350,
	height : 'auto',
	minWidth : 820,
	width : 820,
	docGridToolBar : null,
	fieldLabelWidth : 120,
	cls : 'storePlaceCard',
	currentMode : null,
	readOnlyMode : 'READ',
	editOnlyMode : 'EDIT',
	cbDocTypes : null,
	docTypeColumnEditor:null,
	gridReadOnlyColumns : [{
				text : 'Вид документа',
				dataIndex : 'documentType'
			}, {
				text : 'Даты',
				dataIndex : 'dates'
			}, {
				text : '№ описи',
				dataIndex : 'series'
			}],

	gridEditOnlyColumns : [{
				text : 'ИД',
				dataIndex : 'id',
				hidden : true,
				hideable : false
			}, {
				text : 'Вид документа',
				dataIndex : 'documentTypeId',
				editor : Ext.create('Ext.form.field.ComboBox', {
							store : Ext
									.create('storeplaces.store.DocTypesStore'),
							valueField : 'id',
							displayField : 'name',
							blankText : 'Не выбран вид документа',
							emptyText : 'Не выбран',
							forceSelection : true,
							validateOnChange : false
						}),
				renderer:function(value){
					var editorComboStore = this.ownerCt.gridEditOnlyColumns[1].editor.getStore();
					for (var i = 0;i<editorComboStore.getCount();i++){
						var obj = editorComboStore.getAt(i);
						if (obj.data.id==value){
							return obj.data.name;
						}
					}
					return 'value not found';
				}
			}, {
				text : 'Даты',
				dataIndex : 'dates',
				editor : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				text : '№ описи',
				dataIndex : 'series',
				editor : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				width : 30,
				xtype : 'actioncolumn',
				items : [{
					icon : 'resources/img/emblem-unreadable.png',
					tooltip : 'Удалить',
					handler : function(grid, rowIndex, colIndex) {
						if (window.app) {
							window.app
									.getController('storeplaces.controller.Main')
									.removeFromDocGrid(grid, rowIndex, colIndex);
						} else {
							console.log('window app is undefined!');
						}
					}
				}]
			}],
	setReadOnly : function(isReadOnly) {
		console.log('setReadOnly(): ' + isReadOnly);
		var me = this;
		me.cbStorageType.setDisabled(isReadOnly);
		me.tfAddr.setDisabled(isReadOnly);
		me.tfPhone.setDisabled(isReadOnly);
		me.taOrg.setDisabled(isReadOnly);
		me.nfCount.setDisabled(isReadOnly);
		me.yearInterval.setDisabled(isReadOnly);
		me.taDocsContent.setDisabled(isReadOnly);

		var readOnlyCls = 'sic-read-only';
		if (isReadOnly) {
			me.currentMode = me.readOnlyMode;

			me.tfAddr.addCls(readOnlyCls);
			me.cbStorageType.addCls(readOnlyCls);
			me.tfPhone.addCls(readOnlyCls);
			me.taOrg.addCls(readOnlyCls);
			me.nfCount.addCls(readOnlyCls);
			me.yearInterval.addCls(readOnlyCls);

			me.taDocsContent.addCls(readOnlyCls);

			me.docGrid.removeDocked(me.docGridToolBar, false);
			me.docGrid.reconfigure(Ext
							.getStore('storeplaces.store.DocsReadStore'),
					me.gridReadOnlyColumns);

		} else {
			me.currentMode = me.editOnlyMode;

			me.tfAddr.removeCls(readOnlyCls);
			me.cbStorageType.removeCls(readOnlyCls);
			me.tfPhone.removeCls(readOnlyCls);
			me.taOrg.removeCls(readOnlyCls);
			me.nfCount.removeCls(readOnlyCls);
			me.yearInterval.removeCls(readOnlyCls);
			me.taDocsContent.removeCls(readOnlyCls);

			me.docGrid.addDocked(me.docGridToolBar);
			me.docGrid.reconfigure(Ext
							.getStore('storeplaces.store.DocsWriteStore'),
					me.gridEditOnlyColumns);
		}

	},

	initComponent : function() {
		var x_ = 410;
		var me = this;

		var closeButton = Ext.create('Ext.Button', {
					text : 'X',
					x : 800,
					y : 0,
					height : 20,
					width : 20
				});

		me.cbStorageType = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel : 'Место хранения',
					labelSeparator : '',
					labelWidth : me.fieldLabelWidth,
					store : Ext.create('storeplaces.store.StorageTypeStore'),
					width : 300,
					height : 22,
					valueField : 'id',
					displayField : 'valueFull',
					editable : false,
					allowBlank : false,
					queryMode : 'local',
					validateOnChange : false,
					name : 'storagePlace',
					blankText : 'Не выбранo место хранения',
					emptyText : 'Не выбрано',
					forceSelection : true,
					x : 5,
					y : 25
				});

		me.cbDocTypes = Ext.create('Ext.form.field.ComboBox', {
					store : Ext.getStore('storeplaces.store.DocTypesStore'),
					valueField : 'id',
					displayField : 'name',
					blankText : 'Не выбран вид документа',
					emptyText : 'Не выбран',
					forceSelection : true,
					validateOnChange : false,
					queryMode : 'local'
				});

		me.taOrg = Ext.create('Ext.form.field.TextArea', {
					fieldLabel : 'Название организации',
					width : me.fieldLabelWidth,
					height : 46,
					width : 400,
					labelWidth : me.fieldLabelWidth,
					x : 5,
					y : me.cbStorageType.y + me.cbStorageType.height + 5
				});

		me.nfCount = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Количество ед. хр.',
					labelSeparator : '',
					height : 22,
					width : 200,
					labelWidth : me.fieldLabelWidth,
					x : 5,
					y : me.taOrg.y + me.taOrg.height + 5
				});

		me.tfAddr = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Адрес',
					labelSeparator : '',
					width : 400,
					height : 22,
					labelWidth : me.fieldLabelWidth - 50,
					x : x_,
					y : 25
				});

		me.tfPhone = Ext.create('Ext.form.field.Text', {
					fieldLabel : 'Телефон',
					height : 22,
					width : 300,
					labelSeparator : '',
					labelWidth : me.fieldLabelWidth - 50,
					x : x_,
					y : me.tfAddr.y + me.tfAddr.height + 15
				});

		me.yearInterval = Ext.create('storeplaces.view.lib.YearInterval', {
					fieldLabel : 'Годы',
					width : 300,
					labelWidth : me.fieldLabelWidth - 50,
					x : x_,
					y : me.tfPhone.y + me.tfPhone.height + 15
				});

		me.docGridToolBar = Ext.create('Ext.toolbar.Toolbar', {
					items : [Ext.create('Ext.Button', {
								text : 'Добавить',
								action : 'addDocRow'
							})]
				});

		// var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
		// clicksToEdit : 2
		// });

		me.docGrid = Ext.create('Ext.grid.Panel', {
					store : Ext.getStore('storeplaces.store.DocsReadStore'),
					x : 5,
					plugins : ['cellediting'],

					dockedItems : me.docGridToolBar,
					y : me.nfCount.y + me.nfCount.height + 5,
					width : 810,
					height : 150,
					forceFit : true,
					columns : me.gridReadOnlyColumns
				});

		me.taDocsContent = Ext.create('Ext.form.field.TextArea', {
					labelWidth : me.fieldLabelWidth,
					fieldLabel : 'Состав документов',
					height : 50,
					y : me.docGrid.y + me.docGrid.height + 5,
					x : 5,
					width : 820 - me.fieldLabelWidth
				});

		Ext.applyIf(me, {
					items : [me.cbStorageType, me.taOrg, me.nfCount, me.tfAddr,
							me.tfPhone, me.yearInterval, closeButton,
							me.docGrid, me.taDocsContent]
				});

		me.callParent(arguments);
	}
});