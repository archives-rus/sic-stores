Ext.define('storeplaces.view.page.CLoginPage', {
    extend : 'Ext.form.Panel',
    minWidth : 1024,
    cls:'main_bg',
    //xtype : 'corgpage',
    layout: {
        type: 'vbox',
        align : 'center',
        pack  : 'start',
        height:'100%'
    },
    width : '100%',
    height:'100%',
    //id : 'searchgpage',
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
        //height : 25,
        autoEl: {tag: 'center'},
        width:530,
        cls:'log_box',
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
        height:40
        //action : 'orgCardAdd'
    });

     var toolBarEnter = Ext.create('Ext.toolbar.Toolbar', {
         layout:{
             pack: 'center'
         },
         items : [enter],
         cls : "mar_top35 bg_key",
         height:95
        });

    Ext.applyIf(this, {
        items : [titlePage, LoginFieldset,toolBarEnter]
    });

    this.callParent(arguments);
    }
})
