Ext.define('storeplaces.controller.Main', {
			extend : 'Ext.app.Controller',
			refs:[{
				ref:'card',
				selector:'viewport > app-main > storeplacecard'
			}
			],
			init : function() {
				this.control({
							'button' : {
								click : function(btn, evObj) {
									console.log('button click');
									console.info(btn.getItemId());
									console.log('card id: '+this.getCard().id);
									if (btn.getItemId()=='readOnlyMode' ){
										
										this.getCard().setReadOnly(true);
									}
									if (btn.getItemId()=='editMode'){
										this.getCard().setReadOnly(false);
									}
								}
							}
						});
			}

		});
