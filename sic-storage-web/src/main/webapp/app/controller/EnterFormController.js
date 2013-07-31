Ext.define('storeplaces.controller.EnterFormController',{
    extend:'Ext.app.Controller',
   /* refs:[
        {
            ref:'page',
            selector:'viewport > container > centerpage'
        }
    ],  */
    init:function(){
        this.control({
            'button':{
                click:function(btn,eventObj){
                    switch(btn.action){
                        case 'enterForm':

                        default:
                            return;
                            break;
                    }

                }
            }
        });
    }
});
