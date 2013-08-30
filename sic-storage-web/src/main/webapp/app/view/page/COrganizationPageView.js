Ext.define('storeplaces.view.page.COrganizationPageView', {
    extend : 'Ext.form.Panel',
 //   autoScroll : false,
    minWidth : 1024,
    minHeight: 500,
    height: 890,
    FIO : null,
    xtype : 'corgpage',
    oldData: null,
    width : '100%',
    id : 'orgpageview',
    cls:'pad10-20-0',
    idFund: null,
    idCard: null,
    placesFieldSet : null,
    areaFieldSets:null,
    fundFieldset:null,
    orgStore : null,
    gridNames : null,
    gridToolBar : null,
    tfDateOfEdit : null,
    tfUser : null,
    initComponent : function() {
        this.orgStore =  Ext.create('storeplaces.store.OrgNamesStore');
        this.FIO = Ext.create('Ext.form.Label', {
            text :  '',
            baseCls : 'loginedUserText',
            flex : 0
        });
        var toolBar = Ext.create('Ext.toolbar.Toolbar', {
            xtype : 'maintb',
            items : [Ext.create('Ext.Button', {
                text : 'Добавить',
                cls : "btnAdd",
                height:25,
                action : 'orgCardAdd'
            }), Ext.create('Ext.Button', {
                text : 'Редактировать',
                height:25,
                cls : 'btnEdit',
                action : 'orgCardEdit'
            }), Ext.create('Ext.Button', {
                text : 'Просмотр',
                height:25,
                hidden:true,
                cls : 'btnView',
                action : 'orgCardView'
            }), Ext.create('Ext.Button', {
                text : 'Сохранить',
                height:25,
                cls : 'btnSave',
                action : 'orgCardSave'
            }), Ext.create('Ext.Button', {
                text : 'Отменить',
                hidden:true,
                height:25,
                cls : 'btnCancel',
                action : 'orgCardCancel'
            }), Ext.create('Ext.Button', {
                text : 'Удалить',
                height:25,
                cls : 'btnDelete',
                action : 'orgCardDelete'
            }), Ext.create('Ext.Button', {
                text : 'Вернуться к результатам поиска',
                height:25,
                cls : 'backToSrch',
                action : 'backSrchResult'
            }), '->',
                 this.FIO,
                 Ext.create('Ext.toolbar.Separator', {
                    html : '|',
                    //id : 'vertSeparator',
                    baseCls : 'vertSeparator'
                }), Ext.create('Ext.Button', {
                    text : 'Выход',
                    tooltip : 'Выход из системы',
                    tooltipType : 'title',
                    componentCls : 'quitButton',
                    action:'quit'
                })]
        });

        var cardToolBar = Ext.create('Ext.toolbar.Paging', {
            //store:store,
            layout:{
                type: 'hbox',
                pack:'center'
            },
            beforePageText: 'Карточка',
            afterPageText: 'из {0}'
            //displayMsg: 'Пользователи {0} - {1} из {2}',
            //displayInfo: true
        });

        gridNames = Ext.create('Ext.grid.Panel', {
            store : this.orgStore,
            buttonAlign:'center',
            forceFit : true,
            width : '100%',
            height : 115,
            cls:'autoscrl-y',
            autoScroll : true,
            columns : [{
                text : 'ИД',
                dataIndex : 'id',
                hidden : true,
                hideable : false
            }, {
                text : 'Полное наименование и переименования',
                dataIndex : 'fullName',
                width:'40%'
            }, {
                text : 'Краткое наименование',
                dataIndex : 'shortName',
                width:'30%'
            }, {
                text : 'Подчинённость',
                dataIndex : 'subordination',
                width:'15%'
            }, {
                text : 'Даты',
                dataIndex : 'dates',
                width:'15%'
            }, {
                text : 'Сортировка',
                dataIndex : 'sortOrder',
                hidden : true,
                hideable : false
            }]
        })

        var renamesFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',
            {
                title : 'Наименование организации и её переименования',
                height : 150,
                items : [gridNames]
            });

        var tfArchive = Ext.create('Ext.form.field.Text', {
         fieldLabel : 'Архив',
         name : 'archive',
         disabled: true,
         width : 500,
         labelWidth : 100
         });


        var tfFondNum = Ext.create('Ext.form.field.Text', {
            fieldLabel : '№ фонда',
            name : 'fund',
            disabled: true,
            width : 310,
            labelWidth : 100
        });

        var taFundName = Ext.create('Ext.form.field.TextArea', {
            fieldLabel : 'Название фонда',
            name : 'fundName',
            disabled: true,
            height : 50,
            width : 650,
            labelWidth : 150
        });

        var tfDates = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Крайние даты фонда',
            disabled: true,
            name : 'edgeDates',
            width : 440,
            labelWidth : 150
        });

        this.fundFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
            title : 'Фондовая принадлежность',
            height : 150,
            layout : {
                type : 'table',
                columns : 2
            },
            items : [tfArchive, taFundName, tfFondNum, tfDates]
        });

        this.placesFieldSet = Ext.create('storeplaces.view.lib.StyledFieldSet',
            {
                title : 'Места хранения',
                width : '100%',
                height : 370,
                cls:'noscrl-x',
                autoScroll : true,
                margin: 20
            });


        this.areaFieldSets = Ext.create('storeplaces.view.lib.StyledFieldSet', {
            layout : 'fit',
            items : [Ext.create('Ext.form.field.TextArea', {
                fieldLabel : 'Сведения о загранкомандировках',
                name: 'zagranInfo',
                disabled: true,
                labelWidth : 200,
                height:25
            }), Ext.create('Ext.form.field.TextArea', {
                fieldLabel : 'Сведения о награждениях',
                disabled: true,
                name: 'goldInfo',
                labelWidth : 200,
                height:25,
            }), Ext.create('Ext.form.field.TextArea', {
                fieldLabel : 'Примечание',
                name: 'noteInfo',
                disabled: true,
                labelWidth : 200,
                height:25
            })]
        });

        this.tfUser = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Имя пользователя',
            name : 'user',
            disabled : true,
            cls:'brown-font dis-style',
            labelWidth : 150
        });

        this.tfDateOfEdit = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Дата корректировки',
            name : 'dateOfEdit',
            disabled : true,
            cls:'brown-font dis-style',
            labelWidth : 150
        });

        var userDate = Ext.create('Ext.container.Container', {
            layout: {
                type  : 'hbox',
                align : 'middle',
                pack : 'center'
            },
            items : [this.tfUser,  this.tfDateOfEdit]

        });


        Ext.applyIf(this, {
            items : [toolBar,cardToolBar, renamesFieldset, this.fundFieldset,
                this.placesFieldSet, this.areaFieldSets, userDate]
        });

        this.callParent(arguments);

    }
});
