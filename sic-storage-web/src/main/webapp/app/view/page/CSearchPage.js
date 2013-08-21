Ext.define('storeplaces.view.page.CSearchPage', {
    extend : 'Ext.form.Panel',
    minWidth : 1024,
    height:1000,
    xtype : 'csearchpage',
    alias: 'widget.searchpage',
    width : '100%',
    id : 'searchgpage',
    searchFieldset: null,
    initComponent : function() {
    var titlePage = Ext.create('Ext.form.Label', {
       html : '<center><h3>Справочно-информационная база данных о местах хранения архивных документов по личному составу государственных, муниципальных и ведомственных архивах',
        cls:'title_search'
    });
    var toolBarSearch = Ext.create('Ext.toolbar.Toolbar', {
        items : [Ext.create('Ext.Button', {
            text : 'Поиск',
            cls : "srch",
            height:25,
            action : 'srchBtn'
        }), Ext.create('Ext.Button', {
            text : 'Очистить параметры',
            height:25,
            // cls : 'btnEdit',
            action : 'clearSearchParm',
            cls : 'clr'
        }), Ext.create('Ext.Button', {
            text : 'Добавить',
            height:25,
            cls : 'btnAdd',
            action : 'addOrg'
        }),Ext.create('Ext.Button', {
            text : 'Вернуться в главное меню',
            height:25,
            // cls : 'btnEdit',
            action : 'backMain',
            cls : 'back_main'
        }), '->',

            Ext.create('Ext.form.Label', {
                text : 'Пользователь П.П.',
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
                action: 'quitSerch',
                id : 'quit'
            })]
    });

        var tfNameOrg = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Наименование организации',
            name : 'nameOrg',
            width : 690,
            labelWidth : 200
        });

        var cbTypeDoc = Ext.create('Ext.form.ComboBox',  {
            fieldLabel : 'Виды документов',
            name : 'typeDocCombo',
            store: Ext.getStore('storeplaces.store.DocTypesStore'),
            editable : false,
           // allowBlank : false,
            queryMode : 'local',
            displayField: 'name',
            valueField: 'id',
            emptyText : 'Не выбрано',
            width : 580,
            labelWidth : 200
        });

        var fcDate =  Ext.create('Ext.form.FieldContainer',{
            layout : {
                type : 'table',
                columns : 2
            },
            fieldLabel: 'Даты',
            labelWidth : 180,
            defaultType: 'textfield',
            items: [{
                width: 65,
                name: 'from_date',
                labelWidth : 20,
                maxLength : 4,
                maskRe: /[0-9]/,
                fieldLabel :'c:'
            }, {
                width: 75,
                name: 'to_date',
                labelWidth : 30,
                maxLength : 4,
                maskRe: /[0-9]/,
                fieldLabel : 'по:'
            }]
        });

        var taFundName = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Даты',
            name : 'fundName',
            width : 420,
            labelWidth : 200
        });


        var cbArch = Ext.create('Ext.form.ComboBox',  {
            fieldLabel : 'Архив',
            store: Ext.getStore('storeplaces.store.DocArchiveStore'),
            name : 'archiveStore',
            editable : false,
            // allowBlank : false,
            queryMode : 'local',
            displayField: 'name',
            valueField: 'id',
            emptyText : 'Не выбрано',
            width : 580,
            labelWidth : 200
        });

        var tfNumberFond = Ext.create('storeplaces.view.lib.NumFond');

        var tfDates2 = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Номер фонда',
            name : 'edgeDates',
            width : 400,
            labelWidth : 190
        });

        searchFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
            title : 'Параметры поиска',
            height : 250,
            width:'100%',
            layout : {
                type : 'table',
                columns : 1
            },
            items : [tfNameOrg, cbTypeDoc, fcDate, cbArch, tfNumberFond]
        });

        var gridSearch = Ext.create('Ext.grid.Panel', {
            store : Ext.getStore('storeplaces.store.GridSearchOrgStore'),
            forceFit : true,
            selType: 'rowmodel',
            width : '100%',
            height : 300,
            autoScroll : true,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: Ext.getStore('storeplaces.store.GridSearchOrgStore'),
                dock: 'top',
                displayInfo: true
            }],
            columns : [{
                text : 'ИД',
                dataIndex : 'id',
                hidden : true,
                hideable : false
            }, {
                text : 'Организация',
                dataIndex : 'name',
                flex :3
            }, {
                text : 'Архив',
                dataIndex : 'archive',
                flex :2
            }, {
                text : 'Фонд',
                dataIndex : 'fond',
                flex :1
            }, {
                text : 'Крайние даты',
                dataIndex : 'dates',
                flex :1
            }]
        });

            var ResultsFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',
                {
                    title : 'Результаты поиска',
                    height : 300,
                    items : [gridSearch]
                });
            Ext.applyIf(this, {
            items : [titlePage, toolBarSearch, searchFieldset,ResultsFieldset]
        });

        this.callParent(arguments);
    }
});