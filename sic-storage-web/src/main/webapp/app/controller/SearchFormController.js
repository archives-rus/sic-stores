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
	init: function() {
		var me = this,
				decode = Ext.decode,
				create = Ext.create,
				getStore = Ext.getStore,
				myPage = me.getPage(),
				gridSearchOrgSt = getStore('GridSearchOrgStore');
		me.control({
			'searchpage grid': {
				itemdblclick: function(thiss, record, item, index, e, eOpts) {
					var id = record.get('orgId'),
							form = thiss.up('form'),
							main = form.up('container'),
							oldData = form.getForm().getValues(),
							FIO = form.FIO.text,
							pageSearch = gridSearchOrgSt.currentPage,
							size = gridSearchOrgSt.pageSize,
							cardNum = parseInt((size * (pageSearch - 1) + 1) + index);
					main.removeAll();
					var myOrgPage = create('storeplaces.view.page.COrganizationPageView');
					myOrgPage.oldData = oldData;
					myOrgPage.idCard = id;
					myOrgPage.FIO.setText(FIO);
					var criteria = Ext.encode(me.searchCriteria),
							cardsStorePaging = getStore('CardsStore');
					cardsStorePaging.getProxy().extraParams = {'criteria': criteria};
					cardsStorePaging.loadPage(cardNum);
					Ext.Ajax.request({
						url: 'servlet/QueryOrgNames',
						params: {
							id: id
						},
						success: function(action) {
							var massStore = decode(action.responseText);
							myOrgPage.orgStore.loadData(massStore);

						},
						failure: function() {
							Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
						}
					});
					Ext.Ajax.request({
						url: 'servlet/QueryOrganization',
						params: {
							id: id,
							mode: 'VIEW'
						},
						success: function(action) {
							var dataArray = decode(action.responseText),
									archive = dataArray.archive,
									fund = dataArray.fund,
									fundName = dataArray.fundName,
									edgeDates = dataArray.edgeDates,
									storage = dataArray.storage,
									businessTripsInfo = dataArray.businessTripsInfo,
									rewardsInfo = dataArray.rewardsInfo,
									notes = dataArray.notes,
									userName = dataArray.userName,
									lastUpdateDate = dataArray.lastUpdateDate;

							var myArchive = myOrgPage.fundFieldset.items.items[0];
							var myFundName = myOrgPage.fundFieldset.items.items[1];
							var myFundNum = myOrgPage.fundFieldset.items.items[2];
							var myDates = myOrgPage.fundFieldset.items.items[3];
							var myBusinessTripsInfo = myOrgPage.areaFieldSets.items.items[0];
							var myRewardsInfo = myOrgPage.areaFieldSets.items.items[1];
							var myNotes = myOrgPage.areaFieldSets.items.items[2];
							var myUserName = myOrgPage.tfUser;
							var myLastUpdateDate = myOrgPage.tfDateOfEdit;

							myFundName.setValue(fundName);
							myFundNum.setValue(fund);
							myArchive.setValue(archive);
							myDates.setValue(edgeDates);
							myBusinessTripsInfo.setValue(businessTripsInfo);
							myRewardsInfo.setValue(rewardsInfo);
							myNotes.setValue(notes);
							myUserName.setValue(userName);
							myLastUpdateDate.setValue(lastUpdateDate);

							for (var i = 0; i < storage.length; i++)
							{
								var placeCard = create('storeplaces.view.card.CStorePlaceView');
								var num = i + 1;
								var idPlace = storage[i].id;
								var storageTypePlace = storage[i].storageType;
								var archivePlace = storage[i].archive;
								var orgNamePlace = storage[i].orgName;
								var addressPlace = storage[i].address;
								var phonePlace = storage[i].phone;
								var documentCountPlace = storage[i].documentCount;
								var beginYearPlace = storage[i].beginYear;
								var endYearPlace = storage[i].endYear;
								var contentsPlace = storage[i].contents;

								placeCard.idPlace = idPlace;
								if (storageTypePlace === 'В организации')
								{
									placeCard.taOrg.setValue(orgNamePlace);
									placeCard.tfArchive.setVisible(false);
									placeCard.taOrg.setVisible(true);
								}
								else
								{
									placeCard.taOrg.setVisible(false);
									placeCard.tfArchive.setValue(archivePlace);
									placeCard.tfArchive.setVisible(true);
								}

								placeCard.tfStorageType.setValue(storageTypePlace);
								placeCard.tfAddr.setValue(addressPlace);
								placeCard.tfPhone.setValue(phonePlace);
								placeCard.nfCount.setValue(documentCountPlace);
								placeCard.yearInterval.items.items[1].setValue(beginYearPlace);
								placeCard.yearInterval.items.items[2].setValue(endYearPlace);
								placeCard.taDocsContent.setValue(contentsPlace);

								Ext.Ajax.request({
									url: 'servlet/QueryDocuments',
									params: {
										storageId: idPlace,
										mode: 'VIEW'
									},
									pc: placeCard,
									success: function(action, opts) {
										var placeCard = opts.pc;
										var massStorage = decode(action.responseText);
										placeCard.docGrid.getStore().loadData(massStorage);

									},
									failure: function() {
										Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
									}
								});
								myOrgPage.placesFieldSet.add(placeCard);
							}
						},
						failure: function() {
							Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
						}
					});
					main.add(myOrgPage);
				}
			},
			'searchpage  button': {
				click: function(btn, eventObj) {
					var sItems = myPage.searchFieldset.items,
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
							main = myPage.up('container');

					switch (btn.action) {
						case 'clearSearchParm':
							gridSearchOrgSt.removeAll();
							var FIO = myPage.FIO.text;
							main.removeAll();
							var schPage = create('storeplaces.view.page.CSearchPage');
							schPage.FIO.setText(FIO);
							main.add(schPage);
							break;
						case 'backMain':
							window.location = "/qq-web/";
							break;
						case 'quitSearch':
							storeplaces.userStore.removeAll(true);
							window.location = "/qq-web/Auth?action=logout&redirect=1";
							/*
							 Ext.Ajax.request({
							 url: 'servlet/Auth',
							 params : {
							 action:'logout'
							 },
							 success: function(action){
							 var isSuccess = decode(action.responseText).success;
							 var isMsg = decode(action.responseText).msg;
							 main.removeAll();
							 main.add(create('storeplaces.view.page.CLoginPage'));
							 getStore('GridSearchOrgStore').removeAll();
							 },
							 failure : function(action) {
							 Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
							 }
							 });
							 */
							break;
						case 'addOrg':
							var FIO = form.FIO.text;
							var oldData = form.getForm().getValues();
							main.removeAll();
							var newForm = create('storeplaces.view.page.COrganizationPage');
							newForm.FIO.setText(FIO);
							newForm.oldData = oldData;
							newForm.items.items[0].items.items[4].action = 'newCancel';
							newForm.placesFieldSet.add(create('storeplaces.view.card.CStorePlace'));
							main.add(newForm);
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

							var criteria = {'orgName': iorgName,
								'documentTypeId': idocumentType,
								'yearFrom': iyearFrom,
								'yearTo': iyearTo,
								'archiveId': iarchive,
								'fund': {'num': inum, 'prefix': iprefix, 'suffix': isuffix}
							};
							me.searchCriteria = criteria;
							criteria = Ext.encode(criteria);
							gridSearchOrgSt.getProxy().extraParams = {'criteria': criteria};
							gridSearchOrgSt.load({params: {
									'criteria': criteria,
									'start': 0,
									'limit': gridSearchOrgSt.pageSize
								}});
//							gsostore.loadPage(1, {params: {start: 0,
//									limit: gsostore.pageSize, criteria: criteria}});
							getStore('CardsStoreAll').load({params: {'criteria': criteria}});
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

