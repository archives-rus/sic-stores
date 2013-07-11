Ext.define('storeplaces.view.lib.YearInterval', {
			extend : 'Ext.container.Container',
			layout : {
				type : 'hbox',
				align:'middle'
			},
			height:22,
			maxHeight:22,
			fieldLabel : null,
			labelWidth : null,
			tfFrom : null,
//			style:{
//				backgroundColor:'red'
//			},
			tfTo : null,
			setDisableed:function(isEnabled){
				this.tfFrom.setDisabled(isEnabled);
				this.tfTo.setDisabled(isEnabled);
			},
			addCls:function(cls){
				this.callParent(arguments);
				this.tfFrom.addCls(cls);
				this.tfTo.addCls(cls);
			},
			removeCls:function(cls){
				this.callParent(arguments);
				this.tfFrom.removeCls(cls)
				this.tfTo.removeCls(cls);
				},
			initComponent : function() {
				var me = this;
				var items = new Array();
				var label = null;
				if (me.fieldLabel) {
					label = Ext.create('Ext.form.Label', {
								text : me.fieldLabel,
								width : me.labelWidth,
								margin : '0 10px 0 0px'
							});
					items[items.length] = label;
				}

				me.tfFrom = Ext.create('Ext.form.field.Text', {
							width : 80,
							fieldLabel : 'с',
							labelWidth : 20,
                            margin : '0 0px 0 -10px',
							height:22
						});

				items[items.length] = me.tfFrom;

				me.tfTo = Ext.create('Ext.form.field.Text', {
							width : 90,
							fieldLabel : 'по',
							labelWidth : 30
						});

				items[items.length] = me.tfTo;

				Ext.applyIf(me, {
							items : items
						});
				me.callParent(arguments);
			}
		});