Ext.define('storeplaces.view.page.CLoginPage', {
    extend : 'Ext.form.Panel',
    minWidth : 1024,
    //xtype : 'corgpage',
    layout: {
        type: 'vbox',
        align : 'center',
        pack  : 'start'
    },
    width : '100%',
    //id : 'searchgpage',
    initComponent : function() {

     var titlePage = Ext.create('Ext.form.Label', {
        html : '<center>Справочно-информационная база данных о местах хранения архивных документов по личному составу, государственных, муниципальных и ведомственных архивах'
    });

    var login= Ext.create('Ext.form.field.Text', {
        fieldLabel : 'Логин',
        name : 'login',
        width : 200,
        labelWidth : 100
    });

    var password= Ext.create('Ext.form.field.Text', {
        fieldLabel : 'Пароль',
        name : 'password',
        width : 200,
        labelWidth : 100
    });

    var LoginFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
        title : 'Вход в систему',
        //height : 250,
        autoEl: {tag: 'center'},
        width:500,
        layout: {
            type: 'vbox',
            align : 'center',
            pack  : 'start'
        },
        items : [login, password]
    });

    var enter =   Ext.create('Ext.Button', {
        text : 'Войти',
        //cls : "btnAdd",
        height:40,
        //action : 'orgCardAdd'
    });

     var toolBarEnter = Ext.create('Ext.toolbar.Toolbar', {
         layout:{
             pack: 'center'
         },
         items : [enter]
        });

    Ext.applyIf(this, {
        items : [titlePage, LoginFieldset,toolBarEnter]
    });

    this.callParent(arguments);
    }
})
