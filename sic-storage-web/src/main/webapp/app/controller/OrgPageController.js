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

						default:
						return;
						break;
					}

				}
			}
		});
	}
});