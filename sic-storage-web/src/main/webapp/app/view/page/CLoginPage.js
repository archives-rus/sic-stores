Ext.define('storeplaces.view.page.CLoginPage', {
    extend : 'Ext.form.Panel',
    minWidth : 1024,
   // height : 1000,
    xtype : 'centerpage',
    width : '100%',
    id : 'enterpage',
    initComponent : function() {

     var titlePage = Ext.create('Ext.form.Label', {
        html : '<center>Справочно-информационная база данных о местах хранения архивных документов по личному составу, государственных, муниципальных и ведомственных архивах',
        width:840,
        padding:'90 0 40 0',
        cls:'tit_log'
    });

    var login= Ext.create('Ext.form.field.Text', {
        fieldLabel : 'Логин',
        name : 'login',
        width : 200,
        labelWidth : 100,
        cls:'mar lft'
    });

    var password= Ext.create('Ext.form.field.Text', {
        fieldLabel : 'Пароль',
        name : 'password',
        width : 200,
        labelWidth : 100,
        cls:'mar lft'
    });

    var LoginFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
        title : 'Вход в систему',
        width:'100%',
        autoEl: {tag: 'center'},
        cls:'log_box',
        layout: {
            type: 'vbox',
            align : 'center'
        },
        items : [login, password]
    });

    var enterBtn =   Ext.create('Ext.Button', {
        text : 'Войти',
        height:45,
        cls : "mar_top35 bg_key",
        action : 'enterForm'
    });

     var toolBarEnter = Ext.create('Ext.toolbar.Toolbar', {
         layout:{
             pack: 'center'
         },
         items : [enterBtn],
        height:100
        });

    Ext.applyIf(this, {
        items : [titlePage, LoginFieldset,toolBarEnter]
    });

    this.callParent(arguments);
   }
})
