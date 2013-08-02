Ext.define('storeplaces.controller.EnterFormController',{
    extend:'Ext.app.Controller',
    refs:[
        {
            ref:'page',
            selector:'viewport > container > centerpage'
        }
    ],
    init:function(){
        this.control({
            'button':{
                click:function(btn,eventObj){
                    switch(btn.action){
                        case 'enterForm':
                         var tb = btn.up('toolbar');
                         var form = tb.up('centerpage');
                         var main = form.up('app-main');
                         main.removeAll();
                         main.add(Ext.create('storeplaces.view.page.CSearchPage'));
                        default:
                            return;
                            break;
                    }

                }
            }
        });
    }
});
