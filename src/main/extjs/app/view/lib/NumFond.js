Ext.define('storeplaces.view.lib.NumFond', {
	extend: 'Ext.form.FieldContainer',
	fieldLabel: '№ фонда',
	width: 390,
	labelWidth: 195,
	defaultType: 'textfield',
	layout: 'hbox',
	items: [{
			flex: 1,
			name: 'firstName',
			width: 50
		}, {
			flex: 2,
			name: 'secondName',
			maskRe: /[0-9]/,
			width: 90
		}, {
			flex: 1,
			name: 'thirdName',
			width: 50
		}],
	getFull: function () {
		var items = this.items;
		return {num: this.getNumber(),
			prefix: items.getAt(0).getValue() || null,
			suffix: items.getAt(2).getValue() || null};
	},
	getNumber: function () {
		return parseInt(this.items.getAt(1).getValue()) || null;
	}
});

