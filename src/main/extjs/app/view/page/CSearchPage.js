Ext.define('storeplaces.view.page.CSearchPage', {
	extend: 'Ext.form.Panel',
	alias: 'CSearchPage',
	requires: [
		'Ext.toolbar.Paging'
	],
	autoScroll: false,
	minWidth: 500,
	xtype: 'searchpage',
	width: '100%',
	id: 'searchgpage',
	searchFieldset: null,
	initComponent: function () {
		var me = this,
				create = Ext.create,
				storeId = 'GridSearchOrgStore',
				titlePage = create('Ext.form.Label', {
					html: '<center><h3>Справочно-информационная ' +
							'база данных о местах хранения архивных документов по ' +
							'личному составу в государственных, муниципальных и ' +
							'ведомственных архивах',
					cls: 'title_search'
				});

		var toolBarSearch = create('Ext.toolbar.Toolbar', {
			items: [
				{
					text: 'Поиск',
					cls: "srch",
					height: 25,
					action: 'srchBtn'
				}, {
					text: 'Очистить параметры',
					cls: 'clr',
					height: 25,
					action: 'clearSearchParm'
				}, {
					text: 'Добавить',
					cls: 'btnAdd',
					height: 25,
					action: 'addOrg'
				}, {
					text: 'Вернуться в главное меню',
					cls: 'back_main',
					height: 25,
					action: 'backMain'
				}, '->',
				{
					xtype: 'label',
					baseCls: 'loginedUserText',
					flex: 0
				},
				{
					xtype: 'tbseparator',
					html: '|',
					baseCls: 'vertSeparator'
				}, {
					text: 'Выход',
					tooltip: 'Выход из системы',
					tooltipType: 'title',
					componentCls: 'quitButton',
					action: 'quitSearch'
				}],
			listeners: {
				afterrender: function(tb) {
					tb.items.getAt(5).setText(storeplaces.fio);
				}
			}
		});

		var tfNameOrg = create('Ext.form.field.Text', {
			fieldLabel: 'Наименование организации',
			name: 'nameOrg',
			width: 690,
			labelWidth: 200
		});

		var cbTypeDoc = create('Ext.form.ComboBox', {
			fieldLabel: 'Виды документов',
			name: 'typeDocCombo',
			store: 'DocTypesStore',
			editable: false,
			// allowBlank : false,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			emptyText: 'Не выбрано',
			width: 580,
			labelWidth: 200
		});

		var fcDate = create('Ext.form.FieldContainer', {
			layout: {
				type: 'table',
				columns: 2
			},
			fieldLabel: 'Годы',
			labelWidth: 180,
			defaultType: 'textfield',
			items: [{
					width: 65,
					name: 'from_date',
					labelWidth: 20,
					maxLength: 4,
					maskRe: /[0-9]/,
					fieldLabel: 'c:'
				}, {
					width: 75,
					name: 'to_date',
					labelWidth: 30,
					maxLength: 4,
					maskRe: /[0-9]/,
					fieldLabel: 'по:'
				}]
		});

		var taFundName = create('Ext.form.field.Text', {
			fieldLabel: 'Даты',
			name: 'fundName',
			width: 420,
			labelWidth: 200
		});


		var cbArch = create('Ext.form.ComboBox', {
			fieldLabel: 'Архив',
			store: 'DocArchiveStore',
			name: 'archiveStore',
			editable: false,
			// allowBlank : false,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			emptyText: 'Не выбрано',
			width: 690,
			labelWidth: 200
		});

		var tfNumberFond = create('storeplaces.view.lib.NumFond');

		var tfDates2 = create('Ext.form.field.Text', {
			fieldLabel: 'Номер фонда',
			name: 'edgeDates',
			width: 400,
			labelWidth: 190
		});

		me.searchFieldset = create('StyledFieldSet', {
			title: 'Параметры поиска',
			height: 250,
			width: '100%',
			layout: {
				type: 'table',
				columns: 1
			},
			items: [tfNameOrg, cbTypeDoc, fcDate, cbArch, tfNumberFond]
		});

		me._grd = create('Ext.grid.Panel', {
			store: storeId,
			forceFit: true,
			autoScroll: true,
			columnLines: true,
			rowLines: true,
			selType: 'rowmodel',
			width: '100%',
			dockedItems: [{
					xtype: 'pagingtoolbar',
					store: storeId,
					dock: 'top',
					displayInfo: true
				}],
			columns: [{
					text: 'ИД',
					dataIndex: 'id',
					hidden: true,
					hideable: false
				}, {
					text: 'Организация',
					dataIndex: 'name',
					flex: 3
				}, {
					text: 'Архив',
					dataIndex: 'archive',
					flex: 2
				}, {
					text: 'Фонд',
					dataIndex: 'fund',
					flex: 1
				}, {
					text: 'Годы',
					dataIndex: 'dates',
					flex: 1
				}]
		});

		var ResultsFieldset = create('StyledFieldSet', {
			title: 'Результаты поиска',
			items: [me._grd]
		});
		Ext.applyIf(me, {
			items: [titlePage, toolBarSearch, me.searchFieldset, ResultsFieldset]
		});

		me.callParent(arguments);
		me._gtb = me._grd.dockedItems.getAt(1);
	},
	reset: function() {
		this.getForm().reset();
		this._grd.store.removeAll();
		this._gtb.onLoad();
	}
});
