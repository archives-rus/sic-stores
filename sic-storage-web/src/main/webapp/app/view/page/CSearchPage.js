Ext.define('storeplaces.view.page.CSearchPage', {
    extend : 'Ext.form.Panel',
    minWidth : 1024,
    xtype : 'corgpage',
    width : '100%',
    id : 'searchgpage',
    initComponent : function() {
    var titlePage = Ext.create('Ext.form.Label', {
        text : 'Справочно-информационная база данных о местах хранения архивных документов по личному составу, государственных, муниципальных и ведомственных архивах',
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
            cls : 'clr',
            action : 'orgCardEdit'
        }), Ext.create('Ext.Button', {
            text : 'Добавить',
            height:25,
            cls : 'btnAdd',
            action : 'orgCardEdit'
        }),Ext.create('Ext.Button', {
            text : 'Вернуться в главное меню',
            height:25,
            cls : 'back_main',
            action : 'orgCardEdit'
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

        var tfArchive = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Наименование организации',
            name : 'archive',
            width : 690,
            labelWidth : 200
        });

        var tfFondNum = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Виды документов',
            name : 'fund',
            width : 440,
            labelWidth : 200
        });

        var taFundName = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Даты',
            name : 'fundName',
            width : 420,
            labelWidth : 200
        });

        var tfDates = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Архив',
            name : 'edgeDates',
            width : 460,
            labelWidth : 200
        });

        var tfDates2 = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Номер фонда',
            name : 'edgeDates',
            width : 420,
            labelWidth : 200
        });

        var fundFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
            title : 'Параметры поиска',
            height : 250,
            width:'100%',
            layout : {
                type : 'table',
                columns : 1
            },
            items : [tfArchive, taFundName, tfFondNum, tfDates, tfDates2]
        });

        var gridSearch = Ext.create('Ext.grid.Panel', {
           // store : Ext.getStore('toreplaces.store.OrgNamesStore'),
            forceFit : true,
            width : '100%',
            height : 180,
            autoScroll : true,
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
        items : [titlePage, toolBarSearch,fundFieldset,ResultsFieldset]
    });

    this.callParent(arguments);
    }
});