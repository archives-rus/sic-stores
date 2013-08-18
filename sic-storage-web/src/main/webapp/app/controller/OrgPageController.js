Ext.define('storeplaces.controller.OrgPageController',{
	extend:'Ext.app.Controller',
	refs:[
	{
		ref:'page',
		selector:'viewport > container > corgpage'
	}
	],
    getMainContainer:function(){
        var tb = btn.up('maintb');
        var form = tb.up('form');
        var main = form.up('container');
        return main;
    },
	init:function(){
		this.control({
			'button':{
				click:function(btn,eventObj){
                    if (btn.action == 'srchFund')
                        {
                           var numFund  = btn.up('fieldcontainer');
                           var fs       = numFund.up('fieldset');
                           var main     = fs.up('container');
                        }
                    else if(btn.action == 'deleteCard'){
                        var form = btn.up('form');
                        this.getPage().placesFieldSet.remove(form);
                    }
                    else{
                        var tb = btn.up('toolbar');
                        var form = tb.up('form');
                        var main = form.up('container');
                    }
					switch(btn.action){
						case 'addStorePlace':
							var place = Ext.create('storeplaces.view.card.CStorePlace');
							this.getPage().placesFieldSet.add(place);
                            break;
                        case 'namesGridAdd':
                            this.getPage().orgStore.insert(0, Ext.create('storeplaces.model.OrganizationName'));
                            break;
                        case 'quit':
                            main.removeAll();
                            main.add(Ext.create('storeplaces.view.page.CLoginPage'));
                            break;
                        case 'orgCardDelete':
                            if (this.getPage().orgStore.getCount()==0)
                            {
                                alert('Организация не выбрана!');
                                break;
                            }
                            var id = this.getPage().orgStore.getAt(0).get('id');
                            alert('Удаляем организацию с айди ' + id);
                           /* Ext.Ajax.request({
                                url: 'servlet/DeleteOrganization',
                                params : {
                                    id:id
                                },
                                success: function(action){
                                    var success = Ext.decode(action.responseText).success;
                                    main.removeAll();
                                    main.add(Ext.create('storeplaces.view.page.COrganizationPage'));
                                },
                                failure : function() {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });*/
                            break;
                        case 'orgCardAdd':
                            main.removeAll();
                            main.add(Ext.create('storeplaces.view.page.COrganizationPage'));
                            break;
                        case 'serchFund':
                            alert('Поиск');

                            var archiveId = fs.items.items[0].getValue();
                            var num    = numFund.items.items[1].getRawValue();
                            var prefix = numFund.items.items[0].getRawValue();
                            var suffix = numFund.items.items[2].getRawValue();
                            if (archiveId=='' || archiveId==null || num=='' || prefix=='' || suffix=='')
                            {
                                alert('Введите архив и номер фонда!');
                                break;
                            }
                                if (prefix =='') prefix=null;
                                if (suffix =='') suffix=null;
                                num = parseInt(num);
                            var fund = { 'num':num,'prefix':prefix,'suffix':suffix};
                                fund = Ext.encode(fund);
                            var nameFund = fs.items.items[1];
                            var datesFund = fs.items.items[3];

                            Ext.Ajax.request({
                                url: 'servlet/QueryFundInfo',
                                params : {
                                    'archiveId':archiveId,
                                    'fund':fund
                                },
                                success: function(action){
                                    var isFound  = Ext.decode(action.responseText).found;
                                    if (isFound==false)
                                    {
                                        alert('Фонда не найдены!');
                                        nameFund.enable();
                                        datesFund.enable();
                                    }
                                    else
                                    {
                                        var isName   = Ext.decode(action.responseText).fund.name;
                                        var isId     = Ext.decode(action.responseText).fund.id;
                                        var isNum    = Ext.decode(action.responseText).fund.num;
                                        var isPrefix = Ext.decode(action.responseText).fund.prefix;
                                        var isSuffix = Ext.decode(action.responseText).fund.suffix;
                                        var isDates  = Ext.decode(action.responseText).fund.dates;
                                        nameFund.setValue(isName);
                                        datesFund.setValue(isDates);
                                        nameFund.enable();
                                        datesFund.enable();
                                    }
                                },
                                failure : function(action) {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });
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