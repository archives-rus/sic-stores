Ext.define("storeplaces.view.card.CStorePlaceView", {
    extend : 'Ext.form.Panel',
    layout : 'absolute',
    xtype : 'storeplacecard',
    requires : ['Ext.grid.plugin.CellEditing'],
    tfStorageType : null,
    tfAddr : null,
    tfPhone : null,
    taOrg : null,
    nfCount : null,
    docReadStore:null,
    taDocsContent : null,
    cbAddr         :null,
    yearInterval : null,
    cbArchive : null,
    tfArchive : null,
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
    initComponent : function() {
        this.docReadStore = Ext.create('storeplaces.store.DocsReadStore');
        var x_ = 580;
        var me = this;

        me.tfStorageType = Ext.create('Ext.form.field.Text', {
            name : 'storageType',
            fieldLabel : 'Место хранения',
            disabled: true,
            labelSeparator : '',
            labelWidth : 140, //me.fieldLabelWidth,
            width : 370,
            height : 25,
            editable : false,
            allowBlank : false,
            x : 5,
            y : 25
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
            disabled: true,
            hidden:true,
            width : me.fieldLabelWidth,
            height : 46,
            width : 530,
            labelWidth : 140, //me.fieldLabelWidth,
            x : 5,
            y : me.tfStorageType.y + me.tfStorageType.height + 5
        });

        var myStore = Ext.create('storeplaces.store.StoragePlaceStore');

        me.tfArchive = Ext.create('Ext.form.field.TextArea',  {
            fieldLabel : 'Архив',
            disabled: true,
            name : 'archiveStoreCard',
            editable : false,
            height : 40,
            width : 400,
            labelWidth : 140, //me.fieldLabelWidth,
            x : 5,
            y : me.tfStorageType.y + me.tfStorageType.height + 5
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


        // var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
        // clicksToEdit : 2
        // });

        me.docGrid = Ext.create('Ext.grid.Panel', {
            store : this.docReadStore,
            x : 15,
            y : me.nfCount.y + me.nfCount.height + 5,
            //width : 1120,
            //width : '80%',
            height : 150,
            forceFit : true,
            columns : me.gridReadOnlyColumns
        });

        me.taDocsContent = Ext.create('Ext.form.field.TextArea', {
            name : 'contents',
            //labelWidth : me.fieldLabelWidth,
            labelWidth : 140,
            disabled: true,
            fieldLabel : 'Состав документов',
            height : 40,
            y : me.docGrid.y + me.docGrid.height + 5,
            x : 5,
            width : 1080 //- me.fieldLabelWidth
        });

        Ext.applyIf(me, {
            items : [me.tfStorageType, me.taOrg, me.tfArchive, me.nfCount, me.tfAddr,me.tfAddr,
                me.tfPhone, me.yearInterval,
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