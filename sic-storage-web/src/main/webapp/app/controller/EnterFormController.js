Ext.define('storeplaces.controller.EnterFormController',{
    extend:'Ext.app.Controller',
    view:['page.CLoginPage'],
    init:function(){
        this.control({
            'enterpage button':{
                click:function(btn,eventObj){
                    switch(btn.action){
                        case 'enterForm':
                            var tb = btn.up('toolbar');
                            var form = tb.up('centerpage');
                            var main = form.up('app-main');
                            var login    =  form.items.items[1].items.items[0].getRawValue();
                            var password =  form.items.items[1].items.items[1].getRawValue();

                              if (login=='admin' && password=='admin')
                                    {
                                        main.removeAll();
                                        var schPage = Ext.create('storeplaces.view.page.CSearchPage');
                                        var tb = schPage.down('toolbar');
                                        var userName = tb.down('label');
                                        userName.setText('Админ Админов');
                                        main.add(schPage);
                                    }
                              else Ext.Msg.alert('Внимание', 'Неправильный логин/пароль');

                            /*Ext.Ajax.request({
                                url: 'servlet/Auth',
                                params : {
                                    action:'login',
                                    login:login,
                                    pass:password
                                },
                                success: function(action){
                                    var isSuccess = Ext.decode(action.responseText).success;
                                    var isMsg = Ext.decode(action.responseText).msg;
                                    if (isSuccess == 'true')
                                    {
                                         main.removeAll();
                                         var schPage = Ext.create('storeplaces.view.page.CSearchPage');
                                         var tb = schPage.down('toolbar');
                                         var userName = tb.down('label');
                                         userName.setText('isMsg);
                                         main.add(schPage);
                                    }
                                    else Ext.Msg.alert('Внимание', isMsg);
                                },
                                failure : function(action) {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });*/
                            break;
                        case 'enterForm':

                            break;
                        default:
                            return;
                            break;
                    }

                }
            }
        });
    }
});
