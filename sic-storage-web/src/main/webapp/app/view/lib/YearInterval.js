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
			initComponent : function() {
				var me = this;
				var items = new Array();
				var label = null;
				if (me.fieldLabel) {
					label = Ext.create('Ext.form.Label', {
								text : me.fieldLabel,
								width : me.labelWidth,
								margin : '0 10px 0 0'
							});
					items[items.length] = label;
				}

				me.tfFrom = Ext.create('Ext.form.field.Text', {
							width : 80,
							id : 'tfFrom',
							fieldLabel : 'с',
							labelWidth : 20,
							height:22
						});

				items[items.length] = me.tfFrom;

				me.tfTo = Ext.create('Ext.form.field.Text', {
							width : 80,
							fieldLabel : 'по',
							labelWidth : 20
						});

				items[items.length] = me.tfTo;

				Ext.applyIf(me, {
							items : items
						});
				me.callParent(arguments);
			}
		});