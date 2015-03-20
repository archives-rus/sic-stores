Ext.define('storeplaces.controller.SearchFormController', {
	extend: 'Ext.app.Controller',
	views: ['page.CSearchPage'],
	refs: [
		{
			ref: 'page',
			selector: 'searchpage'
		}
	],
	searchCriteria: null,
	init: function () {
		var me = this,
				decode = Ext.decode,
				create = Ext.create,
				getStore = Ext.getStore,
				gridSearchOrgSt = getStore('GridSearchOrgStore');
		me.control({
			'searchpage grid': {
				itemdblclick: function (thiss, record, item, index, e, eOpts) {
					var id = record.get('orgId'),
							form = thiss.up('form'),
							pageSearch = gridSearchOrgSt.currentPage,
							size = gridSearchOrgSt.pageSize,
							cardNum = parseInt((size * (pageSearch - 1) + 1) + index);

//					storeplaces.searchQ = form.getForm().getValues();

					var myOrgPage = storeplaces.mainView.setPage('COrganizationPageView');
					myOrgPage.clear();
					myOrgPage.idCard = id;
					var cardsStorePaging = getStore('CardsStore');
					cardsStorePaging.getProxy().extraParams = {criteria: Ext.encode(me.searchCriteria)};
					cardsStorePaging.loadPage(cardNum);

					Ext.Ajax.request({
						url: 'servlet/QueryOrganization',
						params: {
							id: id,
							mode: 'VIEW'
						},
						success: function (action) {
							myOrgPage.setData(Ext.decode(action.responseText));
						}, 
						failure: function () {
							Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
						}
					});
				}
			},
			'searchpage  button': {
				click: function (btn, eventObj) {
					var myPage = me.getPage(),
							sItems = myPage.searchFieldset.items,
							orgName = sItems.getAt(0),
							documentType = sItems.getAt(1),
							dItems = sItems.getAt(2).items,
							yearFrom = dItems.getAt(0),
							yearTo = dItems.getAt(1),
							archive = sItems.getAt(3),
							nItems = sItems.getAt(4).items,
							prefix = nItems.getAt(0),
							num = nItems.getAt(1),
							suffix = nItems.getAt(2),
							main = storeplaces.mainView;

					switch (btn.action) {
						case 'clearSearchParm':
							myPage.reset();
							break;
						case 'backMain':
							window.location = "/qq-web/";
							break;
						case 'quitSearch':
							storeplaces.userStore.removeAll(true);
							Ext.Ajax.request({url: '/qq-web/Auth?action=logout',
								success: function () {
									window.location = '/qq-web/';
								}});
							break;
						case 'addOrg':
							var p = main.setPage('COrganizationPage');
							p.clear();
							p.fromSearch();
							break;
						case 'srchBtn':
							if (gridSearchOrgSt.getCount() !== 0)
								gridSearchOrgSt.removeAll();

							var iorgName = orgName.getRawValue();
							if (iorgName === '')
								iorgName = null;
							var idocumentType = documentType.getValue();
							if (idocumentType === '')
								idocumentType = null;
							var iyearFrom = yearFrom.getRawValue();
							iyearFrom = parseInt(iyearFrom);
							var iyearTo = yearTo.getRawValue();
							iyearTo = parseInt(iyearTo);
							var iarchive = archive.getValue();
							if (iarchive === '')
								iarchive = null;
							var iprefix = prefix.getRawValue();
							if (iprefix === '')
								iprefix = null;
							var inum = num.getRawValue();
							inum = parseInt(inum);
							var isuffix = suffix.getRawValue();
							if (isuffix === '')
								isuffix = null;

							var criteria = {
								orgName: iorgName,
								documentTypeId: idocumentType,
								yearFrom: iyearFrom,
								yearTo: iyearTo,
								archiveId: iarchive,
								fund: {num: inum, prefix: iprefix, suffix: isuffix}
							};
							me.searchCriteria = criteria;
							var params = {criteria: Ext.encode(criteria)};
							gridSearchOrgSt.getProxy().extraParams = params;
							gridSearchOrgSt.load({params: {
//									'criteria': criteria,
									start: 0,
									limit: gridSearchOrgSt.pageSize
								}});
//							gsostore.loadPage(1, {params: {start: 0,
//									limit: gsostore.pageSize, criteria: criteria}});
							var allCards = getStore('CardsStoreAll');
							allCards.getProxy().extraParams = params;
							allCards.load();
							break;
						default:
							return;
							break;
					}

				}
			}
		});
	}
});

