Ext.define('storeplaces.view.lib.YearInterval', {
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	height: 22,
	maxHeight: 22,
	fieldLabel: null,
	labelWidth: null,
	tfFrom: null,
	tfTo: null,
	initComponent: function () {
		var me = this,
				items = [];
		if (me.fieldLabel)
			items.push(Ext.create('Ext.form.Label', {
				text: me.fieldLabel,
				width: me.labelWidth,
				margin: '0 10px 0 0px'
			}));

		items.push(me.tfFrom = Ext.create('Ext.form.field.Text', {
			width: 100,
			fieldLabel: 'с',
			labelWidth: 20,
			disabled: true,
			margin: '0 0px 0 -10px',
			height: 22
		}));


		items.push(me.tfTo = Ext.create('Ext.form.field.Text', {
			width: 110,
			fieldLabel: 'по',
			disabled: true,
			labelWidth: 30
		}));


		Ext.applyIf(me, {items: items});
		me.callParent(arguments);
	},
	setDisabled: function (stat) {
		this.tfFrom.setDisabled(stat);
		this.tfTo.setDisabled(stat);
		this.callParent([stat]);
	},
	setValue: function (value1, value2) {
		this.tfFrom.setValue(value1);
		this.tfTo.setValue(value2);
	}
});
