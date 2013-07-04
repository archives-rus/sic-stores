Ext.define('storeplaces.controller.Main', {
			extend : 'Ext.app.Controller',
			refs : [{
						ref : 'card',
						selector : 'viewport > app-main > storeplacecard'
					}],
			init : function() {
				this.control({
							'button' : {
								click : function(btn, evObj) {
									console.log('button click');
									console.info(btn.getItemId());
									console
											.log('card id: '
													+ this.getCard().id);
									if (btn.getItemId() == 'readOnlyMode') {

										this.getCard().setReadOnly(true);
									}
									if (btn.getItemId() == 'editMode') {
										this.getCard().setReadOnly(false);
									}
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
				
				this.getCard().docGrid.getStore().getProxy().extraParams = {
					storageId:2,
					mode: 'EDIT'
				};
				this.getCard().docGrid.getStore().load(this.checkStoreLoadingResult);
			},
			loadStorePlaceDocsRead : function() {
				this.getCard().setReadOnly(true);
				this.getCard().docGrid.getStore().getProxy().extraParams = {
					storageId : 1,
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
				console.info('Main controller');
				console.info('actioncolumn handler: rowIndex: '+ rowIndex + ', colIndex: ' + colIndex);
				var rec = grid.getStore().getAt(rowIndex);
				grid.getStore().remove(rec);
			}
		});
