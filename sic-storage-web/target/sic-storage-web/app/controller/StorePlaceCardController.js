Ext.define('storeplaces.controller.StorePlaceCardController', {
			extend : 'Ext.app.Controller',
			view:['card.CStorePlace'],
			init : function() {
				this.control({
							'storeplacecard button' : {
								click : function(btn, evObj) {
									switch (btn.getItemId()) {
										case 'loadViewDocsTable' :
											this.loadStorePlaceDocsRead();
											break;
										case 'loadEditDocsTable':
											this.loadStorePlaceDocsEdit();
											break;
										default :
											return;
											break;
									}
								}
							}
						});
			},
			onLaunch:function(){
			},
			loadStorePlaceDocsEdit:function(){
				this.getCard().setReadOnly(false);
				var storePlaceTestData = this.getTestStorePlace();
				this.getCard().loadRecord(storePlaceTestData);
				this.getCard().docGrid.getStore().getProxy().extraParams = {
					storageId:storePlaceTestData.id,
					mode: 'EDIT'
				};
				this.getCard().docGrid.getStore().load(this.checkStoreLoadingResult);
			},
			loadStorePlaceDocsRead : function() {
				this.getCard().setReadOnly(true);
				var storePlaceTestData = this.getTestStorePlace();
				this.getCard().loadRecord(storePlaceTestData);
				this.getCard().docGrid.getStore().getProxy().extraParams = {
					storageId : storePlaceTestData.id,
					mode : 'VIEW'
				};
				this.getCard().docGrid.getStore().load(this.checkStoreLoadingResult);
			},
			checkStoreLoadingResult:function(rec,op,success){
				if (!success){
					Ext.Msg.alert('Ошибка','Некорректный ответ сервера');
				}
			},
			removeFromDocGrid:function(grid,rowIndex,colIndex){
				var rec = grid.getStore().getAt(rowIndex);
				grid.getStore().remove(rec);
			}
		});
