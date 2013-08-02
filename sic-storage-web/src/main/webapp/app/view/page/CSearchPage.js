Ext.define('storeplaces.view.page.CSearchPage', {
    extend : 'Ext.form.Panel',
    minWidth : 1024,
    height:1000,
    xtype : 'csearchpage',
    width : '100%',
    id : 'searchgpage',
    searchFieldset: null,
    initComponent : function() {
    var titlePage = Ext.create('Ext.form.Label', {
       html : '<center><h3>Справочно-информационная база данных о местах хранения архивных документов по личному составу, государственных, муниципальных и ведомственных архивах',
        cls:'title_search'
    });
    var toolBarSearch = Ext.create('Ext.toolbar.Toolbar', {
        items : [Ext.create('Ext.Button', {
            text : 'Поиск',
            cls : "srch",
            height:25,
            action : 'orgCardAdd'
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
            action : 'orgCardEdit'
        }),Ext.create('Ext.Button', {
            text : 'Вернуться в главное меню',
            height:25,
            // cls : 'btnEdit',
            action : 'backMain',
            cls : 'back_main'
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
                //cls:'quitButton',
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
            //name : 'fund',
        //   store: 'storeplaces.store.DocTypesStore',
            store: Ext.getStore('storeplaces.store.DocTypesStore'),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            width : 350,
            labelWidth : 200
        });

        var fcDate =  Ext.create('Ext.form.FieldContainer',{
            layout : {
                type : 'table',
                columns : 2
            },
            fieldLabel: 'Даты',
            labelWidth : 180,
            defaultType: 'datefield',
            items: [{
                width: 155,
                name: 'from_date',
                labelWidth : 30,
                fieldLabel :'c:'
            }, {
                width: 150,
                name: 'to_date',
                labelWidth : 30,
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
            name : 'edgeDates',
            width : 460,
            labelWidth : 200
        });

        var tfNumberFond = Ext.create('storeplaces.view.lib.NumFond');

        var tfDates2 = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Номер фонда',
            name : 'edgeDates',
            width : 420,
            labelWidth : 200
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
           // store : Ext.getStore('toreplaces.store.OrgNamesStore'),
            forceFit : true,
            width : '100%',
            height : 180,
            autoScroll : true,
            dockedItems: [{
                xtype: 'pagingtoolbar',
               // store: store,   // same store GridPanel is using
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
                dataIndex : 'fullName',
                flex :3
            }, {
                text : 'Архив',
                dataIndex : 'shortName',
                flex :2
            }, {
                text : 'Фонд',
                dataIndex : 'subordination',
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
                    height : 160,
                    items : [gridSearch]
                });


            Ext.applyIf(this, {
            items : [titlePage, toolBarSearch, searchFieldset,ResultsFieldset]
        });

        this.callParent(arguments);
    }
});