Ext.define('storeplaces.controller.StorePlaceCardController', {
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
			
			getTestStorePlace:function(){
				var testStorePlace={
					id:1,
					storageType:'Тип места хранения тест',
					archive:'Архив архив',
					orgName:'Имя организации',
					address:'тест адрес',
					phone:'89269269226',
					documentCount:'25',
					beginYear:2010,
					endYear:2013,
					contents:'Состав документов тестовый текст',
					getData:function(){
						return this;
					}
				};
				return testStorePlace;
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
				console.info('Main controller');
				console.info('actioncolumn handler: rowIndex: '+ rowIndex + ', colIndex: ' + colIndex);
				var rec = grid.getStore().getAt(rowIndex);
				grid.getStore().remove(rec);
			}
		});
