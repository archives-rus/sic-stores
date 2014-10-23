Ext.define('storeplaces.view.page.COrganizationPageView', {
	extend: 'Ext.form.Panel',
	requires: [
		'storeplaces.view.lib.YearInterval'
	],
	minWidth: 1024,
	minHeight: 500,
	FIO: null,
	oldData: null,
	width: '100%',
	id: 'orgpageview',
	cls: 'pad10-20',
	idFund: null,
	idCard: null,
	cardNum: null,
	searchCriteria: null,
	placesFieldSet: null,
	areaFieldSets: null,
	fundFieldset: null,
	orgStore: null,
	gridNames: null,
	cardToolBar: null,
	gridToolBar: null,
	tfDateOfEdit: null,
	tfUser: null,
	initComponent: function () {
		var me = this;
		me.orgStore = Ext.create('OrgNamesStore');
		me.FIO = Ext.create('Ext.form.Label', {
			text: '',
			baseCls: 'loginedUserText',
			flex: 0
		});
		var toolBar = Ext.create('Ext.toolbar.Toolbar', {
			xtype: 'maintb',
			items: [{
					xtype: 'button',
					text: 'Добавить',
					cls: "btnAdd",
					height: 25,
					action: 'orgCardAdd'
				},
				{
					xtype: 'button',
					text: 'Редактировать',
					height: 25,
					cls: 'btnEdit',
					action: 'orgCardEdit'
				},
				{
					xtype: 'button',
					text: 'Просмотр',
					height: 25,
					hidden: true,
					cls: 'btnView',
					action: 'orgCardView'
				},
				{
					xtype: 'button',
					text: 'Сохранить',
					hidden: true,
					height: 25,
					cls: 'btnSave',
					action: 'orgCardSave'
				},
				{
					xtype: 'button',
					text: 'Отменить',
					hidden: true,
					height: 25,
					cls: 'btnCancel',
					action: 'orgCardCancel'
				},
				{
					xtype: 'button',
					text: 'Удалить',
					height: 25,
					cls: 'btnDelete',
					action: 'orgCardDeleteView'
				},
				{
					xtype: 'button',
					text: 'Вернуться к результатам поиска',
					height: 25,
					cls: 'backToSrch',
					action: 'backSrchResult'
				}, '->',
				me.FIO,
				Ext.create('Ext.toolbar.Separator', {
					html: '|',
					//id : 'vertSeparator',
					baseCls: 'vertSeparator'
				}),
				{
					xtype: 'button',
					text: 'Выход',
					tooltip: 'Выход из системы',
					tooltipType: 'title',
					componentCls: 'quitButton',
					action: 'quit'
				}]
		});

		var cardStore = Ext.getStore('CardsStore'),
				orgPageFunc = window.app.getController('storeplaces.controller.OrgPageFunc');

		/**
		 * Загружает страницу определенного номера
		 * @param {Number} page номер страницы
		 */
		var loadWantedPage = function (page) {
			cardStore.loadPage(page, {
				callback: function (r, op, s) {
					if (s)
						orgPageFunc.moveNext(r[0].get('orgId'));
				}
			});
		};

		me.cardToolBar = Ext.create('Ext.toolbar.Paging', {
			store: cardStore,
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			beforePageText: 'Карточка',
			afterPageText: 'из {0}',
			moveFirst: function () {
				loadWantedPage(1);
			},
			movePrevious: function () {
				var page = cardStore.currentPage;
				if (page > 1)
					loadWantedPage(page - 1);
			},
			moveNext: function () {
				var page = cardStore.currentPage;
				if (page < cardStore.totalCount)
					loadWantedPage(page + 1);
			},
			moveLast: function () {
				loadWantedPage(cardStore.totalCount);
			},
			doRefresh: function () {
				loadWantedPage(parseInt(inputField.getValue()));
			}
		});

		var inputField = me.cardToolBar.items.getAt(4);
		inputField.disable();
		inputField.setValue(me.cardNum);
		inputField.on('specialkey', function (field, ev) {
			if (ev.getKey() === ev.ENTER)
				me.cardToolBar.doRefresh();
		});

		me.gridNames = Ext.create('Ext.grid.Panel', {
			store: me.orgStore,
			buttonAlign: 'center',
			forceFit: true,
			width: '100%',
			height: 115,
			cls: 'autoscrl-y',
			autoScroll: true,
			columns: [{
					text: 'ИД',
					dataIndex: 'id',
					hidden: true,
					hideable: false
				}, {
					text: 'Полное наименование и переименования',
					dataIndex: 'fullName',
					width: '40%'
				}, {
					text: 'Краткое наименование',
					dataIndex: 'shortName',
					width: '30%'
				}, {
					text: 'Подчинённость',
					dataIndex: 'subordination',
					width: '15%'
				}, {
					text: 'Даты',
					dataIndex: 'dates',
					width: '15%'
				}, {
					text: 'Сортировка',
					dataIndex: 'sortOrder',
					hidden: true,
					hideable: false
				}]
		})

		var renamesFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet',
				{
					title: 'Наименование организации и её переименования',
					height: 150,
					items: [me.gridNames]
				});

		var tfArchive = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Архив',
			name: 'archive',
			disabled: true,
			width: 500,
			labelWidth: 100
		});


		var tfFondNum = Ext.create('Ext.form.field.Text', {
			fieldLabel: '№ фонда',
			name: 'fund',
			disabled: true,
			width: 310,
			labelWidth: 100
		});

		var taFundName = Ext.create('Ext.form.field.TextArea', {
			fieldLabel: 'Название фонда',
			name: 'fundName',
			disabled: true,
			height: 50,
			width: 650,
			labelWidth: 150
		});

		var tfDates = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Крайние даты фонда',
			disabled: true,
			name: 'edgeDates',
			width: 440,
			labelWidth: 150
		});

		me.fundFieldset = Ext.create('storeplaces.view.lib.StyledFieldSet', {
			title: 'Фондовая принадлежность',
			height: 150,
			layout: {
				type: 'table',
				columns: 2
			},
			items: [tfArchive, taFundName, tfFondNum, tfDates]
		});

		me.placesFieldSet = Ext.create('storeplaces.view.lib.StyledFieldSet',
				{
					title: 'Места хранения',
					width: '100%',
					height: 370,
					cls: 'noscrl-x',
					autoScroll: true,
					margin: 20
				});


		me.areaFieldSets = Ext.create('storeplaces.view.lib.StyledFieldSet', {
			layout: 'fit',
			items: [Ext.create('Ext.form.field.TextArea', {
					fieldLabel: 'Сведения о загранкомандировках',
					name: 'zagranInfo',
					disabled: true,
					labelWidth: 200,
					height: 25
				}), Ext.create('Ext.form.field.TextArea', {
					fieldLabel: 'Сведения о награждениях',
					disabled: true,
					name: 'goldInfo',
					labelWidth: 200,
					height: 25
				}), Ext.create('Ext.form.field.TextArea', {
					fieldLabel: 'Примечание',
					name: 'noteInfo',
					disabled: true,
					labelWidth: 200,
					height: 25
				})]
		});

		me.tfUser = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Имя пользователя',
			name: 'user',
			disabled: true,
			cls: 'brown-font dis-style',
			labelWidth: 150
		});

		me.tfDateOfEdit = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Дата корректировки',
			name: 'dateOfEdit',
			disabled: true,
			cls: 'brown-font dis-style',
			labelWidth: 150
		});

		var userDate = Ext.create('Ext.container.Container', {
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'center'
			},
			items: [me.tfUser, me.tfDateOfEdit]

		});


		Ext.applyIf(me, {
			items: [toolBar, me.cardToolBar, renamesFieldset, me.fundFieldset,
				me.placesFieldSet, me.areaFieldSets, userDate]
		});

		me.callParent(arguments);

	}
});
