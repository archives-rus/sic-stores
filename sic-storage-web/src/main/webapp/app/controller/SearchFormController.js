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
                    var orgName     =  searchFieldset.items.items[0];
                    var documentType=  searchFieldset.items.items[1];
                    var yearFrom    =  searchFieldset.items.items[2].items.items[0];
                    var yearTo      =  searchFieldset.items.items[2].items.items[1];
                    var archive     =  searchFieldset.items.items[3];
                    var prefix      =  searchFieldset.items.items[4].items.items[0];
                    var num         =  searchFieldset.items.items[4].items.items[1];
                    var suffix      =  searchFieldset.items.items[4].items.items[2];
                    var tbar = btn.up('toolbar');
                    var form = tbar.up('form');
                    var main = form.up('container');

                    switch(btn.action){
                        case 'clearSearchParm':
                            searchFieldset.items.items[0].reset();
                            searchFieldset.items.items[1].reset();
                            searchFieldset.items.items[2].items.each(function (item) {item.reset ()});
                            searchFieldset.items.items[3].reset();
                            searchFieldset.items.items[4].items.each(function (item) {item.reset ()});
                            break;
                        case 'backMain':
                            alert(1);
                            break;
                        case 'quitSerch':
                            Ext.Ajax.request({
                                url: 'servlet/Auth',
                                params : {
                                    action:'logout'
                                },
                                success: function(action){
                                    var isSuccess = Ext.decode(action.responseText).success;
                                    var isMsg = Ext.decode(action.responseText).msg;
                                   // if (isSuccess == 'true')
                                   // {
                                        main.removeAll();
                                        main.add(Ext.create('storeplaces.view.page.CLoginPage'));
                                        Ext.getStore('storeplaces.store.GridSearchOrgStore').removeAll();
                                   // }
                                },
                                failure : function(action) {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });
                            break;
                        case 'addOrg':
                            main.removeAll();
                            main.add(Ext.create('storeplaces.view.page.COrganizationPage'));
                            break;
                        case 'srchBtn':
                            var iorgName = orgName.getRawValue();
                                if (iorgName=='') iorgName = null;
                            var idocumentType = documentType.getValue();
                            var iyearFrom= yearFrom.getRawValue();
                                if (iyearFrom=='') iyearFrom = null;
                            var iyearTo  = yearTo.getRawValue();
                             if (iyearTo=='') iyearTo = null;
                            var iarchive = archive.getValue();
                            var iprefix  = prefix.getRawValue();
                             if (iprefix=='') iprefix = null;
                            var inum     = num.getValue();
                             if (inum=='') inum = null;
                            var isuffix  = suffix.getRawValue();
                             if (isuffix=='') isuffix = null; ;

                            var criteria = {'orgName':iorgName,
                                            'documentTypeId':idocumentType,
                                            'yearFrom': iyearFrom,
                                            'yearTo': iyearTo,
                                            'archiveId':iarchive,
                                            'fund': {'num':inum,'prefix':iprefix,'suffix':isuffix}
                                            };
                            criteria = Ext.encode(criteria);
                            var gridSearchOrgStore = Ext.getStore('storeplaces.store.GridSearchOrgStore');
                            gridSearchOrgStore.load({params:{
                                 criteria:criteria,
                                'start':0,
                                'limit':10
                            }});
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

