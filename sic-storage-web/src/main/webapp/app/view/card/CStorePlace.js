Ext.define("storeplaces.view.card.CStorePlace", {
			extend : 'Ext.container.Container',
			layout : 'absolute',
			cbStorageType : null,
			tfAddr : null,
			tfPhone : null,
			taOrg : null,
			nfCount : null,
			yearInterval : null,
			minHeight : 300,
			height : 300,
			minWidth : 820,
			width : 820,
			fieldLabelWidth : 120,
			cls : 'storePlaceCard',
			initComponent : function() {
				var x_ = 410;
				var me = this;
				
				var closeButton = Ext.create('Ext.Button',{
					text:'X',
					x:800,
					y:0,
					height:20,
					width:20
				});
				
				me.cbStorageType = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Место хранения',
							labelSeparator : '',
							labelWidth : me.fieldLabelWidth,
							store : Ext
									.getStore('storeplaces.store.StorageTypeStore'),
							width : 300,
							height : 22,
							valueField : 'id',
							displayField : 'valueFull',
							editable : false,
							allowBlank : false,
							queryMode : 'local',
							validateOnChange : false,
							name : 'aim',
							blankText : 'Не выбран тип хранения',
							emptyText : 'Не выбрано',
							forceSelection : true,
							x : 5,
							y : 25
						});

				me.taOrg = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : 'Название организации',
							width : me.fieldLabelWidth,
							height : 46,
							width : 400,
							labelWidth : me.fieldLabelWidth,
							x : 5,
							y : me.cbStorageType.y + me.cbStorageType.height
									+ 5
						});

				me.nfCount = Ext.create('Ext.form.field.Text', {
							fieldLabel : 'Количество ед. хр.',
							labelSeparator : '',
							height : 22,
							width : 200,
							labelWidth : me.fieldLabelWidth,
							x : 5,
							y : me.taOrg.y+me.taOrg.height+5
						});

				me.tfAddr = Ext.create('Ext.form.field.Text', {
							fieldLabel : 'Адрес',
							labelSeparator : '',
							width : 400,
							height:22,
							labelWidth : me.fieldLabelWidth-50,
							x : x_,
							y : 25
						});

				me.tfPhone = Ext.create('Ext.form.field.Text', {
							fieldLabel : 'Телефон',
							height : 22,
							width:300,
							labelSeparator : '',
							labelWidth : me.fieldLabelWidth-50,
							x : x_,
							y : me.tfAddr.y+me.tfAddr.height+15
						});

				me.yearInterval = Ext.create(
						'storeplaces.view.lib.YearInterval', {
							fieldLabel : 'Годы',
							width : 300,
							labelWidth:me.fieldLabelWidth-50,
							x : x_,
							y : me.tfPhone.y+me.tfPhone.height+15
						});

//				var cb = Ext.create('Ext.toolbar.Toolbar', {
//							items : [Ext.create('Ext.Button', {
//										text : 'Добавить',
//										action : 'addDocRow'
//									})]
//						});

				Ext.applyIf(me, {
							items : [me.cbStorageType, me.taOrg,
									 me.nfCount,me.tfAddr,me.tfPhone,me.yearInterval,closeButton]
						});

				me.callParent(arguments);
			}
		});