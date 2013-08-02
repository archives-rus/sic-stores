Ext.define('storeplaces.controller.OrgPageController',{
	extend:'Ext.app.Controller',
	refs:[
	{
		ref:'page',
		selector:'viewport > container > corgpage'
	}
	],
	init:function(){
		this.control({
			'button':{
				click:function(btn,eventObj){
					console.log('OrgPageController');
					console.log('btn.id: '+btn.id);
					console.log('btn.action: '+btn.action);
					//console.log('page id: '+this.getPage().id);
					switch(btn.action){
						case 'addStorePlace':
							var place = Ext.create('storeplaces.view.card.CStorePlace');
							this.getPage().placesFieldSet.add(place);
                            break;
                        case 'namesGridAdd':
                            var gridStore =  gridNames.getStore();
                            gridStore.insert(0, Ext.create('storeplaces.model.OrganizationName'));
						    break;
                        case 'quit':
                            var tb = btn.up('toolbar');
                            var form = tb.up('corgpage');
                            var main = form.up('app-main');
                            main.removeAll();
                            main.add(Ext.create('storeplaces.view.page.CLoginPage'));
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