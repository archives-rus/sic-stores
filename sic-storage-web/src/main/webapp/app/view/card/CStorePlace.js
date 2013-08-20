Ext.define("storeplaces.view.card.CStorePlace", {
	extend : 'Ext.form.Panel',
	layout : 'absolute',
	xtype : 'storeplacecard',
    alias: 'widget.storeplacecard',
	requires : ['Ext.grid.plugin.CellEditing'],
	cbStorageType : null,
	tfAddr : null,
	tfPhone : null,
	taOrg : null,
	nfCount : null,
	taDocsContent : null,
    cbAddr         :null,
	yearInterval : null,
    cbArchive : null,
	docGrid : null,
	minHeight : 340,
	height : 'auto',
	//width : 1150,
    width : '98%',
	docGridToolBar : null,
	fieldLabelWidth : 120,
	cls : 'storePlaceCard',
	currentMode : null,
	readOnlyMode : 'READ',
	editOnlyMode : 'EDIT',
	cbDocTypes : null,
	docTypeColumnEditor : null,
	gridReadOnlyColumns : [{
				text : 'Вид документа',
				dataIndex : 'documentType',
                flex:3
			}, {
				text : 'Даты',
				dataIndex : 'dates',
                flex:2
			}, {
				text : '№ описи',
				dataIndex : 'series',
                flex:1
			}],

	gridEditOnlyColumns : [{
				text : 'ИД',
				dataIndex : 'id',
				hidden : true,
				hideable : false
			}, {
				text : 'Вид документа',
                width:750,
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
				renderer : function(value) {
					var editorComboStore = this.ownerCt.gridEditOnlyColumns[1].editor
							.getStore();
					for (var i = 0; i < editorComboStore.getCount(); i++) {
						var obj = editorComboStore.getAt(i);
						if (obj.data.id == value) {
							return obj.data.name;
						}
					}
					return 'value not found';
				}
			}, {
				text : 'Даты',
                width:170,
				dataIndex : 'dates',
				editor : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				text : '№ описи',
                width:100,
                dataIndex : 'series',
				editor : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				width : 40,
				xtype : 'actioncolumn',
				items : [{
					icon : 'resources/img/emblem-unreadable.png',
					tooltip : 'Удалить',
					handler : function(grid, rowIndex, colIndex) {
						if (window.app) {
							window.app
									.getController('storeplaces.controller.StorePlaceCardController')
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
		me.yearInterval.setDisableed(isReadOnly);
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
		var x_ = 580;
		var me = this;
		var closeButton = Ext.create('Ext.Button', {
					//text : 'X',
					x : '98%',
					y : 0,
					height : 25,
					width : 25,
                    action:'deleteCard'
				});

		me.cbStorageType = Ext.create('Ext.form.field.ComboBox', {
					name : 'storageType',
					fieldLabel : 'Место хранения',
					labelSeparator : '',
					labelWidth : 140, //me.fieldLabelWidth,
					store : Ext.create('storeplaces.store.StorageTypeStore'),
					width : 370,
					height : 25,
					valueField : 'id',
					displayField : 'valueFull',
					editable : false,
					allowBlank : false,
					queryMode : 'local',
					validateOnChange : false,
					blankText : 'Не выбранo место хранения',
					emptyText : 'Не выбрано',
					forceSelection : true,
					x : 5,
					y : 25,
                    listeners:{
                       // 'select': getPlaceId()
                        'select': function(){
                             if (this.getValue()== 1)
                                {
                                    me.cbAcrhive.setVisible(true);
                                    me.taOrg.setVisible(false);
                                    me.cbDocTypes.setDisabled(false);
                                    me.nfCount.setDisabled(false);
                                  //  me.tfAddr.setDisabled(false);
                                    me.cbAddr.setDisabled(false);
                                    me.tfPhone.setDisabled(false);
                                    me.yearInterval.setDisabled(false);
                                }
                                else if (this.getValue()== 2)
                                 {
                                     me.cbAcrhive.setVisible(false);
                                     me.taOrg.setVisible(true);
                                     me.cbDocTypes.setDisabled(false);
                                     me.nfCount.setDisabled(false);
                                    // me.tfAddr.setDisabled(false);
                                     me.cbAddr.setDisabled(false);
                                     me.tfPhone.setDisabled(false);
                                     me.yearInterval.setDisabled(false);
                                 }
                        }
                    }
				});

		me.cbDocTypes = Ext.create('Ext.form.field.ComboBox', {
					store : Ext.getStore('storeplaces.store.DocTypesStore'),
					valueField : 'id',
					displayField : 'name',
                    disabled:true,
					blankText : 'Не выбран вид документа',
					emptyText : 'Не выбран',
					forceSelection : true,
					validateOnChange : false,
					queryMode : 'local'
				});

		me.taOrg = Ext.create('Ext.form.field.TextArea', {
					name : 'orgName',
					fieldLabel : 'Название организации',
                    hidden:true,
					width : me.fieldLabelWidth,
					height : 46,
					width : 530,
					labelWidth : 140, //me.fieldLabelWidth,
					x : 5,
					y : me.cbStorageType.y + me.cbStorageType.height + 5
				});

        var myStore = Ext.create('storeplaces.store.StoragePlaceStore');

        me.cbAcrhive = Ext.create('Ext.form.ComboBox',  {
                        fieldLabel : 'Архив',
                        store: Ext.create('storeplaces.store.DocArchiveStore'),
                        name : 'archiveStoreCard',
                        editable : false,
                        // allowBlank : false,
                        queryMode : 'local',
                        displayField: 'name',
                        valueField: 'id',
                        emptyText : 'Не выбрано',
                        hidden:true,
                        width : 300,
                        labelWidth : 140, //me.fieldLabelWidth,
                        x : 5,
                        y : me.cbStorageType.y + me.cbStorageType.height + 5,
                        listeners:{
                            'select': function(){
                                var archiveId = this.getValue();
                                Ext.Ajax.request({
                                    url: 'servlet/QueryArchStorage',
                                    params : {
                                        'archiveId':archiveId
                                    },
                                    success: function(action){
                                       /* var isId  = Ext.decode(action.responseText).id;
                                        var isArchiveId  = Ext.decode(action.responseText).archiveId;
                                        var isAddress  = Ext.decode(action.responseText).address;
                                        var isPhone  = Ext.decode(action.responseText).phone; */
                                        //  var mass = new Array();
                                        var mass = Ext.decode(action.responseText);
                                        myStore.loadData(mass);

                                        //myStore.loadData(mass);
                                        //mass.forEach( function(item){ alert(item.address); } );


                                    },
                                    failure : function(action) {
                                        Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                    }
                                });
                            }
                        }
        });

		me.nfCount = Ext.create('Ext.form.field.Text', {
					name : 'documentCount',
					fieldLabel : 'Количество ед. хр.',
					labelSeparator : '',
					height : 22,
                    disabled:true,
					width : 210,
					labelWidth : 140, //me.fieldLabelWidth,
					x : 5,
					y : me.taOrg.y + me.taOrg.height + 5
				});

		me.tfAddr = Ext.create('Ext.form.field.Text', {
					name : 'address',
					fieldLabel : 'Адрес',
					labelSeparator : '',
					width : 490,
                    disabled:true,
                    hidden:true,
					height : 22,
                    labelWidth :100,
					x : 650,
					y : 25
				});

        me.cbAddr = Ext.create('Ext.form.ComboBox', {
                    fieldLabel : 'Адрес',
                    store:myStore,
                   // name : ,
                    editable : false,
                    queryMode : 'local',
                    displayField: 'address',
                    disabled:true,
                    valueField: 'phone',
                    emptyText : 'Не выбрано',
                   // hidden:true,
                    width : 490,
                    labelWidth : 100, //me.fieldLabelWidth,
                    x : 650,
                    y : 25,
                    listeners:{
                        'select': function(){
                            me.tfPhone.setValue(this.getValue());
                        }
                        }
                    });

		me.tfPhone = Ext.create('Ext.form.field.Text', {
					name : 'phone',
					fieldLabel : 'Телефон',
                    disabled:true,
					height : 22,
					width : 300,
					labelSeparator : '',
                    labelWidth :100,
					x : 650,
					y : me.tfAddr.y + me.tfAddr.height + 15
				});

		me.yearInterval = Ext.create('storeplaces.view.lib.YearInterval', {
					fieldLabel : 'Годы',
                    disabled:true,
					width : 300,
					//labelWidth : me.fieldLabelWidth - 50,
                    labelWidth :100,
					x : 650, //x_,
					y : me.tfPhone.y + me.tfPhone.height + 15
				});

		me.docGridToolBar = Ext.create('Ext.toolbar.Toolbar', {
					items : [Ext.create('Ext.Button', {
								//text : 'Добавить',
								action : 'addDocRow',
                                cls:'addStr'
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
					width : 1120,
                    //width : '80%',
					height : 150,
					forceFit : true,
					columns : me.gridReadOnlyColumns
				});

		me.taDocsContent = Ext.create('Ext.form.field.TextArea', {
					name : 'contents',
					//labelWidth : me.fieldLabelWidth,
                    labelWidth : 140,
					fieldLabel : 'Состав документов',
					height : 40,
					y : me.docGrid.y + me.docGrid.height + 5,
					x : 5,
					width : 1080 //- me.fieldLabelWidth
				});

		Ext.applyIf(me, {
					items : [me.cbStorageType, me.taOrg, me.cbAcrhive, me.nfCount, me.tfAddr,me.cbAddr,
							me.tfPhone, me.yearInterval, closeButton,
							me.docGrid, me.taDocsContent]
				});

		me.callParent(arguments);
	},
	loadRecord : function() {
		var me = this;
		me.callParent(arguments);
		var model = arguments[0];
		var beginYear = model.beginYear;
		var endYear = model.endYear;
		me.yearInterval.tfFrom.setValue(beginYear);
		me.yearInterval.tfTo.setValue(endYear);
	}
});