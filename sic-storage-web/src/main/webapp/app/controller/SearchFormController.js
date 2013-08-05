Ext.define('storeplaces.controller.SearchFormController',{
    extend:'Ext.app.Controller',
     refs:[
     {
     ref:'page',
     selector:'viewport > container > csearchpage'
     }
     ],
    init:function(){
        this.control({
            'button':{
                click:function(btn,eventObj){
                    switch(btn.action){
                        case 'clearSearchParm':
                           // searchFieldset.items.each(function (item) {item.reset ()})
                            searchFieldset.items.items[0].reset();
                            searchFieldset.items.items[1].reset();
                            searchFieldset.items.items[2].items.each(function (item) {item.reset ()});
                            searchFieldset.items.items[3].reset();
                            searchFieldset.items.items[4].items.each(function (item) {item.reset ()});
                            break;
                        case 'backMain':
                            //alert(1);
                             //  alert(this.items.items[0].items.items[0].getItemId());
                        case 'quitSerch':
                            var tb = btn.up('toolbar');
                            var form = tb.up('csearchpage');
                            var main = form.up('container');
                            main.removeAll();
                            main.add(Ext.create('storeplaces.view.page.CLoginPage'));
                        default:
                            return;
                            break;
                    }

                }
            }
        });
    }
});

