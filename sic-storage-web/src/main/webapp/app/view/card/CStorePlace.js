Ext.define("storeplaces.view.card.CStorePlace", {
	extend : 'Ext.form.Panel',
	layout : 'absolute',
	xtype : 'storeplacecard',
    alias: 'widget.storeplacecard',
	requires : ['Ext.grid.plugin.CellEditing'],
	cbStorageType : null,
    docsWriteStore: null,
	tfAddr : null,
	tfPhone : null,
	taOrg : null,
	nfCount : null,
	taDocsContent : null,
    cbAddr         :null,
	yearInterval : null,
    cbArchive : null,
	docGrid : null,
    idPlace: null,
    idArchStorage: null,
	minHeight : 320,
	height : 'auto',
	//width : 1150,
    width : '97%',
	docGridToolBar : null,
	fieldLabelWidth : 120,
	cls : 'storePlaceCard',
    margin:'10 15 10 15',
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
                width:'70%',
				dataIndex : 'documentTypeId',
				editor : Ext.create('Ext.form.field.ComboBox', {
							store : Ext.create('storeplaces.store.DocTypesStore'),
							valueField : 'id',
							displayField : 'name',
							blankText : 'Не выбран вид документа',
							emptyText : 'Не выбран',
							forceSelection : true,
							validateOnChange : false
						}),
				renderer : function(value) {
					//var editorComboStore = this.ownerCt.gridEditOnlyColumns[1].editor.getStore();  //не работает после сохранения!
                    var editorComboStore = Ext.getStore('storeplaces.store.DocTypesStore');
					for ( var i = 0; i < editorComboStore.getCount(); i++) {
						var obj = editorComboStore.getAt(i);
						if (obj.data.id == value) {
							return obj.data.name;
						}
					}
					return 'Не выбрано';
				}
			}, {
				text : 'Даты',
                width:'15%',
				dataIndex : 'dates',
				editor : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				text : '№ описи',
                width:'13%',
                dataIndex : 'series',
				editor : {
					xtype : 'textfield',
					allowBlank : false
				}
			}, {
				width : '2%',
				xtype : 'actioncolumn',
                align:'center',
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
	initComponent : function() {
        this.docsWriteStore = Ext.create('storeplaces.store.DocsWriteStore');
		var x_ = 580;
		var me = this;
        var myStore = Ext.create('storeplaces.store.StoragePlaceStore');
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
					height : 22,
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
                        'select': function(combo){
                             if (this.getValue()== 1)
                                {
                                    var value = combo.up('storeplacecard').up('fieldset').up('form').fundFieldset.items.items[0].getValue();
                                    if (value !=null)
                                    {
                                        me.cbArchive.setValue(value);
                                        me.cbArchive.fireEvent('select');
                                    }
                                    me.cbArchive.setVisible(true);
                                    me.taOrg.setVisible(false);
                                    me.cbAddr.setVisible(true);
                                    me.tfAddr.setVisible(false);
                                    me.cbDocTypes.setDisabled(false);
                                    me.nfCount.setDisabled(false);
                                    me.cbAddr.setDisabled(false);
                                    me.tfPhone.setDisabled(false);
                                    me.yearInterval.setDisabled(false);
                                    me.yearInterval.items.items[1].setDisabled(false);
                                    me.yearInterval.items.items[2].setDisabled(false);
                                }
                             else  if (this.getValue()== 2)
                                 {
                                    // var value_org = combo.up('storeplacecard').up('fieldset').up('form').fundFieldset.items.items[0].getValue();
                                     var value_org = combo.up('storeplacecard').up('fieldset').up('form').gridNames.getStore().getAt(0).get('fullName');
                                     me.cbArchive.setVisible(false);
                                     me.taOrg.setVisible(true);
                                     me.taOrg.setValue(value_org);
                                     me.cbAddr.setVisible(false);
                                     me.tfAddr.setVisible(true);
                                     me.cbDocTypes.setDisabled(false);
                                     me.nfCount.setDisabled(false);
                                     me.tfAddr.setDisabled(false);
                                     me.tfPhone.setDisabled(false);
                                     me.yearInterval.setDisabled(false);
                                     me.yearInterval.items.items[1].setDisabled(false);
                                     me.yearInterval.items.items[2].setDisabled(false)
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
					height : 46,
					width : 530,
					labelWidth : 140, //me.fieldLabelWidth,
					x : 5,
					y : me.cbStorageType.y + me.cbStorageType.height + 5
				});


        me.cbArchive = Ext.create('Ext.form.ComboBox',  {
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
                        width : 585,
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
                                        var mass = Ext.decode(action.responseText);
                                        myStore.loadData(mass);
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
					x : 610,
					y : 25
				});

        me.cbAddr = Ext.create('Ext.form.ComboBox', {
                    fieldLabel : 'Адрес',
                    store:myStore,
                    editable : true,
                    queryMode : 'local',
                    displayField: 'address',
                    disabled:true,
                    valueField: 'id',
                    emptyText : 'Не выбрано',
                    width : 490,
                    labelWidth : 100,
                    x : 610,
                    y : 25,
                    listeners:{
                        'select': function(combo, records, eOpts){
                            var phone =  records[0].data.phone;
                            me.tfPhone.setValue(phone);
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
					x : 610,
					y : me.tfAddr.y + me.tfAddr.height + 15
				});

		me.yearInterval = Ext.create('storeplaces.view.lib.YearInterval', {
					fieldLabel : 'Годы',
                    disabled:true,
					width : 310,
					//labelWidth : me.fieldLabelWidth - 50,
                    labelWidth :100,
					x : 610, //x_,
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
					store : me.docsWriteStore,
					x : 15,
					plugins : ['cellediting'],
					dockedItems : me.docGridToolBar,
					y : me.nfCount.y + me.nfCount.height + 5,
                    cls:'mar_right15',
					height : 135,
					forceFit : true,
					columns : me.gridEditOnlyColumns
				});

		me.taDocsContent = Ext.create('Ext.form.field.TextArea', {
					name : 'contents',
					//labelWidth : me.fieldLabelWidth,
                    labelWidth : 140,
					fieldLabel : 'Состав документов',
                    disabled : true,
					height : 40,
					y : me.docGrid.y + me.docGrid.height + 5,
					x : 5,
					width : 1080 //- me.fieldLabelWidth
				});

		Ext.applyIf(me, {
					items : [me.cbStorageType,  me.cbArchive, me.taOrg, me.nfCount, me.tfAddr,me.cbAddr,
							me.tfPhone, me.yearInterval, closeButton,
							me.docGrid, me.taDocsContent]
				});

		me.callParent(arguments);
	}
});