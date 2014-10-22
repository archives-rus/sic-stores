Ext.define('storeplaces.controller.OrgPageController', {
	extend: 'Ext.app.Controller',
	refs: [
		{
			ref: 'page',
			selector: 'viewport > container > corgpage'
		}],
	init: function () {
		var msg = Ext.Msg,
				me = this;
		me.control({
			'button': {
				click: function myfn(btn, eventObj) {
					if (btn.action == 'srchFund') {
						var numFund = btn.up('fieldcontainer'),
								fs = numFund.up('fieldset'),
								main = fs.up('container');
					}
					else if (btn.action == 'deleteCard') {
						var form = btn.up('form');
						me.getPage().placesFieldSet.remove(form);
					}
					else if (btn.id != 'button-1005') {
						var tb = btn.up('toolbar'),
								form = tb.up('form'),
								main = form.up('container'),
								vp = main.up('viewport'),
								buffer = vp.items.items[1];
					}

					switch (btn.action) {
						case 'addStorePlace':
							var place = Ext.create('storeplaces.view.card.CStorePlace');
							place.docGrid.columns[1].editor = Ext.create('Ext.form.field.ComboBox', {
								store: 'DocTypesStore',
								valueField: 'id',
								displayField: 'name',
								blankText: 'Не выбран вид документа',
								emptyText: 'Не выбран',
								forceSelection: true,
								validateOnChange: false
							});
							this.getPage().placesFieldSet.add(place);
							this.getPage().placesFieldSet.body.dom.scrollTop = 99999;
							break;
						case 'namesGridUp':
							var form = btn.up('toolbar').up('gridpanel').up('fieldset').up('form');
							var sm = form.gridNames.getSelectionModel();
							var record = sm.getSelection()[0];
							if (record == null)
								break;
							var index = form.gridNames.getStore().indexOf(record);
							if (index != 0)
							{
								form.gridNames.getStore().remove(record, true);
								form.gridNames.getStore().insert(index - 1, record);
							}
							break;
						case 'namesGridDown':
							var form = btn.up('toolbar').up('gridpanel').up('fieldset').up('form');
							var maxIndex = form.gridNames.getStore().getCount() - 1;
							var sm = form.gridNames.getSelectionModel();
							var record = sm.getSelection()[0];
							if (record == null)
								break;
							var index = form.gridNames.getStore().indexOf(record);
							if (index != maxIndex)
							{
								form.gridNames.getStore().remove(record, true);
								form.gridNames.getStore().insert(index + 1, record);
							}
							break;
						case 'namesGridAdd':
							var index = this.getPage().orgStore.getCount();
							if (index == null)
								index = 0;
							this.getPage().orgStore.insert(index, Ext.create('storeplaces.model.OrganizationName'));
							break;
						case 'addDocRow':
							var gridTb = btn.up('toolbar');
							var gridPlace = gridTb.up('grid');
							var count = gridPlace.getStore().getCount();
							if (count == null)
								count = 0;
							gridPlace.getStore().insert(count, Ext.create('storeplaces.model.DocTableEntryWrite'));
							break;
						case 'quit':
							storeplaces.userStore.removeAll(true);
							window.location = "/qq-web/Auth?action=logout&redirect=1";
							break;
							/*
							 Ext.Ajax.request({
							 url: 'servlet/Auth',
							 params: {
							 action: 'logout'
							 },
							 success: function (action) {
							 var isSuccess = Ext.decode(action.responseText).success;
							 var isMsg = Ext.decode(action.responseText).msg;
							 main.removeAll();
							 buffer.removeAll();
							 Ext.getStore('GridSearchOrgStore').removeAll();
							 main.add(Ext.create('storeplaces.view.page.CLoginPage'));
							 },
							 failure: function (action) {
							 msg.alert('Ошибка', 'Ошибка базы данных!');
							 }
							 });
							 */
							break;
							/* case 'viewToEdit':
							 main.removeAll();
							 main.add(buffer.items.items[0]);
							 break;      */
						case 'orgCardDelete':
							var id = form.idCard;
							if (id == null)
							{
								msg.alert('Внимание', 'Организация не создана!');
								break;
							}
							Ext.Ajax.request({
								url: 'servlet/DeleteOrganization',
								params: {
									id: id
								},
								success: function (action) {
									var success = Ext.decode(action.responseText).success;
									main.removeAll();
									main.add(Ext.create('storeplaces.view.page.COrganizationPage'));
									msg.alert('Внимание', 'Организация удалена!');
								},
								failure: function () {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'orgCardDeleteView':
							var id = form.idCard;
							if (id == null)
							{
								msg.alert('Внимание', 'Организация не создана!');
								break;
							}
							Ext.Ajax.request({
								url: 'servlet/DeleteOrganization',
								params: {
									id: id
								},
								success: function (action) {
									var success = Ext.decode(action.responseText).success;
									var cardsStore = Ext.getStore('CardsStore');
									var cardsStoreAll = Ext.getStore('CardsStoreAll');
									var thisPage = form.cardToolBar.items.items[4].getValue();
									if (cardsStoreAll.getCount() == 1)
									{
										var oldData = form.oldData;
										main.removeAll();
										buffer.removeAll();
										var oldSrchPage = Ext.create('storeplaces.view.page.CSearchPage');
										oldSrchPage.getForm().setValues(oldData);
										oldSrchPage.FIO.setText(form.FIO.text);
										// oldSrchPage.items.items[1].items.items[0].fireEvent('click');
										main.add(oldSrchPage);
									}
									else if (thisPage == 1)
									{
										cardsStore.loadPage(1);
										var id = cardsStoreAll.getAt(1).get('id');
										window.app.getController('storeplaces.controller.OrgPageFunc').moveNext(id);
										cardsStore.reload();
										cardsStoreAll.reload();
									}
									else
									{
										var newPage = parseInt(form.cardToolBar.items.items[4].getValue()) - 1;
										cardsStore.loadPage(newPage);
										var id = cardsStoreAll.getAt(newPage - 1).get('id');
										window.app.getController('storeplaces.controller.OrgPageFunc').moveNext(id);
										cardsStore.reload();
										cardsStoreAll.reload();
									}
									msg.alert('Внимание', 'Организация удалена!');
								},
								failure: function () {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'newCancel':
						case 'orgCardAdd':
							var FIO = form.FIO.text;
							var oldData = form.oldData;
							main.removeAll();
							var newOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
//							newOrgPage.items.items[0].items.items[2].action = 'viewNew';
							newOrgPage.items.getAt(0).items.getAt(2).hide();
							newOrgPage.FIO.setText(FIO);
							newOrgPage.oldData = oldData;
							newOrgPage.items.items[0].items.items[4].action = 'newCancel';
							newOrgPage.placesFieldSet.add(Ext.create('storeplaces.view.card.CStorePlace'));
							main.add(newOrgPage);
							break;
						case 'backSrchResult':
							var oldData = form.oldData;
							main.removeAll();
							buffer.removeAll();
							var oldSrchPage = Ext.create('storeplaces.view.page.CSearchPage');
							oldSrchPage.getForm().setValues(oldData);
							oldSrchPage.FIO.setText(form.FIO.text);
							main.add(oldSrchPage);
							// oldSrchPage.items.items[1].items.items[0].fireEvent('click');
							break;
						case 'orgCardSave':
							var errMessages = [];
							if (form.gridNames.getStore().getCount() === 0)
								errMessages.push('заполнить наименование организации');
							if (form.fundFieldset.items.items[0].getValue() === null)
								errMessages.push('выбать архив в фондовой принадлежности');

							if (form.fundFieldset.items.items[2].items.items[1].getRawValue() !== '' &&
									form.fundFieldset.items.items[1].getRawValue() === '')
								errMessages.push('заполнить название фонда');
							if (form.placesFieldSet.items.items.length === 0)
								errMessages.push('заполнить хотя бы одно место хранения');

							form.placesFieldSet.items.each(function (Card) {
								var ps = Card.cbStorageType.getValue(),
										addres;
								if (ps === 2) {
									place = Card.taOrg.getRawValue(); //tf
									addres = Card.tfAddr.getValue();
								} else {
									place = Card.cbArchive.getValue(); //combo
									addres = Card.cbAddr.getValue(); //combo
								}
								if (ps === null)
									errMessages.push('выбрать место хранения');
								else if (place === '')
									errMessages.push('заполнить название организации места хранения');

								addres || errMessages.push('выбрать / заполнить адрес места хранения');
							});

							if (errMessages.length) {
								msg.alert("Внимание", "<p>Для сохранения необходимо:<ul><li>" + errMessages.join('<li>'));
								break;
							}
							var names = [];
							form.orgStore.getRange().forEach(function (record, i) {
								record.set('sortOrder', i + 1);
								names.push(record.getData());
							});

							var areaFieldSets = form.areaFieldSets.items,
									fundFieldset = form.fundFieldset.items,
									idArch = fundFieldset.items[0].getValue(),
									prefix = fundFieldset.items[2].items.items[0].getRawValue() || null,
									numFund = fundFieldset.items[2].items.items[1].getRawValue(),
									suffix = fundFieldset.items[2].items.items[2].getRawValue() || null,
									nameFund = fundFieldset.items[1].getRawValue() || null,
									datesFund = fundFieldset.items[3].getRawValue() || null;
							if (numFund === '') {
								numFund = null;
								var fund = null;
							} else {
								numFund = parseInt(numFund);
								var fund = {
									'id': form.idFund,
									'archiveId': idArch,
									'num': numFund,
									'prefix': prefix,
									'suffix': suffix,
									'name': nameFund,
									'dates': datesFund
								};
							}

							var myCards = form.placesFieldSet.items.items,
									storage = [],
									newaddresses = Ext.create('Ext.util.MixedCollection');
							for (var j = 0; j < myCards.length; j++) {
								var documents = new Array();
								var dataCard = myCards[j];
								var idPlace = dataCard.idPlace;
								var documentCount = dataCard.nfCount.getRawValue();
								documentCount = parseInt(documentCount);
								var orgName = dataCard.taOrg.getRawValue();
								if (orgName) {
									var address = dataCard.tfAddr.getRawValue() || null;
									var archStrg = null;
								} else {
									orgName = null;
									var address = dataCard.cbAddr.getRawValue() || null;
									var archStrg = new archiveInfo(dataCard.cbAddr.getValue(),
											dataCard.cbArchive.getValue(),
											address, dataCard.tfPhone.getRawValue(), dataCard.cbAddr.getStore());
								}
								var beginYear = dataCard.yearInterval.items.items[1].getRawValue();
								beginYear = parseInt(beginYear);
								var endYear = dataCard.yearInterval.items.items[2].getRawValue();
								endYear = parseInt(endYear);
								var modelsCard = dataCard.docGrid.getStore().getRange();
								for (var i = 0; i < modelsCard.length; i++) {
									var documentsModel = modelsCard[i];
									if (documentsModel.get('id') === 0)
										documentsModel.set('id', '');
									documents.push(modelsCard[i].getData());
								}

								var contents = dataCard.taDocsContent.getRawValue(),
										tmpAddress;
								if (contents == '')
									contents = null;
								var card = {
									'id': idPlace,
									'archStrg': (!archStrg || archStrg.id) ? archStrg :
											!(tmpAddress = newaddresses.getByKey(archStrg.pk())) ? (function () {
										newaddresses.add(archStrg.pk(), archStrg);
										return archStrg;
									})() : (function () {
										if (tmpAddress.phone !== archStrg.phone) {
											if (tmpAddress.phone && archStrg.phone)
												tmpAddress.phone += "," + archStrg.phone;
											else
												tmpAddress.phone = tmpAddress.phone || archStrg.phone;
										}
										return null;
									})(),
									orgName: orgName,
									address: address,
									phone: archStrg.phone || null,
									documentCount: documentCount,
									beginYear: beginYear,
									endYear: endYear,
									documents: documents,
									contents: contents
								}
								storage.push(card);
							}
							var org = {
								id: form.idCard,
								names: names,
								archiveId: idArch,
								fund: fund,
								storage: storage,
								businessTripsInfo: areaFieldSets.items[0].getRawValue() || null,
								rewardsInfo: areaFieldSets.items[1].getRawValue() || null,
								notes: areaFieldSets.items[2].getRawValue() || null
							};
							org = Ext.encode(org);
							Ext.Ajax.request({
								url: 'servlet/SaveOrganization',
								params: {
									org: org
								},
								success: function (action) {
									btn.action = 'orgCardView';
									myfn(btn);
									/* Сохранение без перехода в просмотр
									 var idOrg = Ext.decode(action.responseText).id;
									 form.idCard = idOrg;
									 var FIO = form.FIO.text;
									 reloadMain(idOrg, FIO, oldData, main);
									 */
								},
								failure: function () {
									// msg.alert('Ошибка', 'Ошибка базы данных!');
									// msg.alert('Внимание', 'Для сохранения необходимо заполнить место хранения, архив и адрес в каждой карточке!');
								}
							});
							break;
						case 'orgCardCancel':
						case 'orgCardView':
							buffer.add(form);
							var values = form.getForm().getValues();
							var FIO = form.FIO.text;
							var idFund = form.idFund;
							var idCard = form.idCard;
							var oldData = form.oldData;
							var archive = form.fundFieldset.items.items[0].getRawValue();
							var prefix = form.fundFieldset.items.items[2].items.items[0].getRawValue();
							var numfond = form.fundFieldset.items.items[2].items.items[1].getRawValue();
							var suffix = form.fundFieldset.items.items[2].items.items[2].getRawValue();
							var fundNum = prefix + '-' + numfond + '-' + suffix;
							var nameUser = form.tfUser.getRawValue();
							var editDate = form.tfDateOfEdit.getRawValue();
							var oldOrgStoreData = form.orgStore.getRange();
							var countCard = form.placesFieldSet.items.getCount();
							var massCard = new Array();
							for (var i = 0; i < countCard; i++) {
								var card = form.placesFieldSet.items.items[i];
								massCard.push(card);
							}
							main.removeAll();
							var OrgViewPage = Ext.create('storeplaces.view.page.COrganizationPageView');
							OrgViewPage.getForm().setValues(values);
							OrgViewPage.oldData = oldData;
							OrgViewPage.idFund = idFund;
							OrgViewPage.idCard = idCard;
							OrgViewPage.FIO.setText(FIO);
							OrgViewPage.tfUser.setValue(nameUser);
							OrgViewPage.tfDateOfEdit.setValue(editDate);
							OrgViewPage.orgStore.loadData(oldOrgStoreData);
							for (var j = 0; j < massCard.length; j++)
							{
								var oldCard = massCard[j];
								var newCard = Ext.create('storeplaces.view.card.CStorePlaceView');
								newCard.idPalace = oldCard.idPalace;
								newCard.idArchStorage = oldCard.idArchStorage;
								var oldStorageType = oldCard.cbStorageType.getRawValue();
								newCard.tfStorageType.setValue(oldStorageType);
								if (oldStorageType == 'В архиве')
								{
									var oldArchive = oldCard.cbArchive.getRawValue();
									var oldAddress = oldCard.cbAddr.getRawValue();
									newCard.taOrg.setVisible(false);
									newCard.tfArchive.setVisible(true);
									newCard.tfArchive.setValue(oldArchive);
									newCard.tfAddr.setValue(oldAddress);
								}
								else if (oldStorageType == 'В организации')
								{
									var oldOrgName = oldCard.taOrg.getRawValue();
									var oldAddress = oldCard.tfAddr.getRawValue();
									newCard.taOrg.setVisible(true);
									newCard.tfArchive.setVisible(false);
									newCard.taOrg.setValue(oldOrgName);
									newCard.tfAddr.setValue(oldAddress);
								}
								var oldPhone = oldCard.tfPhone.getRawValue();
								newCard.tfPhone.setValue(oldPhone);
								var oldDocumentCount = oldCard.nfCount.getRawValue();
								newCard.nfCount.setValue(oldDocumentCount);
								var oldBeginYear = oldCard.yearInterval.items.items[1].getRawValue();
								newCard.yearInterval.items.items[1].setValue(oldBeginYear);
								var oldEndYear = oldCard.yearInterval.items.items[2].getRawValue();
								newCard.yearInterval.items.items[2].setValue(oldEndYear);
								var oldContents = oldCard.taDocsContent.getRawValue();
								newCard.taDocsContent.setValue(oldContents);
								var oldPlaceStoreData = oldCard.docGrid.getStore().getRange();
								newCard.docGrid.reconfigure(newCard.docGrid.getStore(), newCard.gridEditOnlyColumns);
								newCard.docGrid.getStore().loadData(oldPlaceStoreData);
								OrgViewPage.placesFieldSet.add(newCard);
							}
							// OrgViewPage.items.items[0].items.items[1].action = 'viewToEdit';
							var archivePage = OrgViewPage.fundFieldset.items.items[0];
							var fundNumPage = OrgViewPage.fundFieldset.items.items[2];
							archivePage.setRawValue(archive);
							fundNumPage.setRawValue(fundNum);
							main.add(OrgViewPage);
							break;
						case 'orgCardEdit':
							buffer.removeAll();
							var id = form.idCard;
							var FIO = form.FIO.text;
							var oldData = form.oldData;
							main.removeAll();
							var myEditOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
							myEditOrgPage.FIO.setText(FIO);
							myEditOrgPage.oldData = oldData;
							myEditOrgPage.idCard = id;
							Ext.Ajax.request({
								url: 'servlet/QueryOrgNames?id=' + id,
								success: function (action) {
									myEditOrgPage.orgStore.loadData(
											Ext.decode(action.responseText));
								},
								failure: function () {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							Ext.Ajax.request({
								url: 'servlet/QueryOrganization?mode=EDIT&id=' + id,
								success: function (action) {
									var dataArray = Ext.decode(action.responseText),
											fund = dataArray.fund,
											fundFieldset = myEditOrgPage.fundFieldset.items,
											myFundName = fundFieldset.items[1],
											myDates = fundFieldset.items[3],
											areaFieldSets = myEditOrgPage.areaFieldSets.items;

									if (fund) {
										myEditOrgPage.idFund = fund.id;
										fundFieldset.items[2].items.items[1].setValue(fund.num);
										myFundName.setValue(fund.name);
										myDates.setValue(fund.dates);
										fundFieldset.items[2].items.items[0].setValue(fund.prefix);
										fundFieldset.items[2].items.items[2].setValue(fund.suffix);
									}

									myFundName.setDisabled(false);
									myDates.setDisabled(false);

									fundFieldset.items[0].setValue(dataArray.archiveId);
									areaFieldSets.items[0].setValue(dataArray.businessTripsInfo);
									areaFieldSets.items[1].setValue(dataArray.rewardsInfo);
									areaFieldSets.items[2].setValue(dataArray.notes);
									myEditOrgPage.tfUser.setValue(dataArray.userName);
									myEditOrgPage.tfDateOfEdit.setValue(dataArray.lastUpdateDate);

									function showWidget(w, v) {
										w.setVisible(true);
										w.setValue(v);
										w.setDisabled(false);
									}

									dataArray.storage.forEach(function (card) {
										var placeCard = Ext.create('storeplaces.view.card.CStorePlace'),
												cbAddr = placeCard.cbAddr,
												tfPhone = placeCard.tfPhone,
												nfCount = placeCard.nfCount,
												yearInterval = placeCard.yearInterval,
												archStrg = card.archStrg || null;
										if (archStrg) {
											placeCard.idArchStorage = archStrg.id;
											if (!archStrg.archiveId) {
												placeCard.cbStorageType.setValue(2);
												cbAddr.setVisible(false);

												showWidget(placeCard.taOrg, card.orgName)
												showWidget(placeCard.tfAddr, card.address)

											} else {
												placeCard.cbStorageType.setValue(1);

												showWidget(placeCard.cbArchive, archStrg.archiveId);

												cbAddr.setRawValue(card.address);
												cbAddr.setDisabled(false);
											}

										}
										placeCard.idPlace = card.id; // id места хранения документов
										[tfPhone, nfCount, yearInterval].forEach(
												function (v) {
													v.setDisabled(false);
												});

										tfPhone.setValue(card.phone);
										nfCount.setValue(card.documentCount);
										yearInterval.setValue(card.beginYear, card.endYear);
										placeCard.taDocsContent.setValue(card.contents);

										Ext.Ajax.request({
											url: 'servlet/QueryDocuments?mode=EDIT&storageId=' + card.id,
											success: function (action) {
												placeCard.docGrid.columns[1].editor = Ext.create(
														'Ext.form.field.ComboBox', {
															store: 'DocTypesStore',
															valueField: 'id',
															displayField: 'name',
															blankText: 'Не выбран вид документа',
															emptyText: 'Не выбран',
															forceSelection: true,
															validateOnChange: false
														});
												placeCard.docGrid.getStore().loadData(Ext.decode(action.responseText));
											},
											failure: function () {
												msg.alert('Ошибка', 'Ошибка базы данных!');
											}
										});
										myEditOrgPage.placesFieldSet.add(placeCard);
									});

								},
								failure: function () {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							main.add(myEditOrgPage);
							break;
						case 'srchFund':
							var archiveId = fs.items.items[0].getValue(),
									numItems = numFund.items,
									num = numItems.getAt(1).getRawValue();
							if (archiveId == '' || archiveId == null || num == '') {
								msg.alert('Внимание', 'Для поиска необходимо ввсети архив и номер фонда');
								break;
							}
							num = parseInt(num);
							var fund = {num: num,
								prefix: numItems.getAt(0).getRawValue() || null,
								suffix: numItems.getAt(2).getRawValue() || null};
							fund = Ext.encode(fund);
							var nameFund = fs.items.items[1];
							var datesFund = fs.items.items[3];
							Ext.Ajax.request({
								url: 'servlet/QueryFundInfo',
								params: {
									'archiveId': archiveId,
									'fund': fund
								},
								success: function (action) {
									var answer = Ext.decode(action.responseText);
									if (answer.found == false) {
										storeplaces.alert('Внимание!', 'Фонд не найден!');
										nameFund.enable();
										datesFund.enable();
									} else {
										var fond = answer.fund;
										nameFund.setValue(fond.name);
										datesFund.setValue(fond.dates);
										nameFund.enable();
										datesFund.enable();
										me.getPage().idFund = fond.id;
									}
								},
								failure: function (action) {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						default:
							return;
							break;
					}

				}
			}
		});
		var reloadMain = function (id, FIO, oldData, main) {
			var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Сохранение..."});
			myMask.show();
			main.removeAll();
			var myEditOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
			myEditOrgPage.FIO.setText(FIO);
			myEditOrgPage.oldData = oldData;
			myEditOrgPage.idCard = id;
			Ext.Ajax.request({
				url: 'servlet/QueryOrgNames?id=' + id,
				success: function (action) {
					var massStore = Ext.decode(action.responseText);
					myEditOrgPage.orgStore.loadData(massStore);
				},
				failure: function () {
					msg.alert('Ошибка', 'Ошибка базы данных!');
				}
			});
			Ext.Ajax.request({
				url: 'servlet/QueryOrganization?mode=EDIT&id=' + id,
				success: function (action) {
					var dataArray = Ext.decode(action.responseText),
							archiveId = dataArray.archiveId,
							fund = dataArray.fund,
							storage = dataArray.storage,
							businessTripsInfo = dataArray.businessTripsInfo,
							rewardsInfo = dataArray.rewardsInfo,
							notes = dataArray.notes,
							userName = dataArray.userName,
							lastUpdateDate = dataArray.lastUpdateDate,
							fundFieldset = myEditOrgPage.fundFieldset.items,
							myArchive = fundFieldset.items[0],
							myFundNumber = fundFieldset.items[2].items,
							myDates = fundFieldset.items[3],
							areaFieldSets = myEditOrgPage.areaFieldSets.items,
							myBusinessTripsInfo = areaFieldSets.items[0],
							myRewardsInfo = areaFieldSets.items[1],
							myNotes = areaFieldSets.items[2],
							myUserName = myEditOrgPage.tfUser,
							myLastUpdateDate = myEditOrgPage.tfDateOfEdit,
							myFundName = fundFieldset.items[1];

					if (fund) {
						myFundNumber.items[1].setValue(fund.num);
						myFundNumber.items[0].setValue(fund.prefix);
						myFundNumber.items[2].setValue(fund.suffix);
						myFundName.setValue(fund.name);
						myDates.setValue(fund.dates);
						myEditOrgPage.idFund = fund.id;
					}

					myFundName.setDisabled(false);
					myDates.setDisabled(false);

					myArchive.setValue(archiveId);

					myBusinessTripsInfo.setValue(businessTripsInfo);
					myRewardsInfo.setValue(rewardsInfo);
					myNotes.setValue(notes);
					myUserName.setValue(userName);
					myLastUpdateDate.setValue(lastUpdateDate);
					for (var i = 0; i < storage.length; i++) {
						var idPlace = storage[i].id; // id места хранения документов
						var archStrg = storage[i].archStrg;
						if (archStrg) {
							var archInId = storage[i].archStrg.id; // id места хранения в архиве
							var archId = storage[i].archStrg.archiveId; //id архива(второй комбо снизу)
						}
						else
							archStrg == null;
						var orgNamePlace = storage[i].orgName;
						var addressPlace = storage[i].address;
						var phonePlace = storage[i].phone;
						var documentCountPlace = storage[i].documentCount;
						var beginYearPlace = storage[i].beginYear;
						var endYearPlace = storage[i].endYear;
						var contentsPlace = storage[i].contents;
						var placeCard = Ext.create('storeplaces.view.card.CStorePlace');
						placeCard.idPlace = idPlace;
						placeCard.idArchStorage = archInId;
						placeCard.tfPhone.setDisabled(false);
						placeCard.nfCount.setDisabled(false);
						placeCard.yearInterval.setDisabled(false);
						placeCard.yearInterval.items.items[1].setDisabled(false);
						placeCard.yearInterval.items.items[2].setDisabled(false);
						if (archId == '' || archId == null) {
							placeCard.cbStorageType.setValue(2);
							placeCard.taOrg.setVisible(true);
							placeCard.tfAddr.setVisible(true);
							placeCard.cbAddr.setVisible(false);
							placeCard.taOrg.setValue(orgNamePlace);
							placeCard.tfAddr.setValue(addressPlace);
							placeCard.taOrg.setDisabled(false);
							placeCard.tfAddr.setDisabled(false);
						} else {
							placeCard.cbStorageType.setValue(1);
							placeCard.cbArchive.setVisible(true);
							placeCard.cbArchive.setValue(archId);
							placeCard.cbAddr.setRawValue(addressPlace);
							placeCard.cbArchive.setDisabled(false);
							placeCard.cbAddr.setDisabled(false);
						}
						placeCard.tfPhone.setValue(phonePlace);
						placeCard.nfCount.setValue(documentCountPlace);
						placeCard.yearInterval.items.items[1].setValue(beginYearPlace);
						placeCard.yearInterval.items.items[2].setValue(endYearPlace);
						placeCard.taDocsContent.setValue(contentsPlace);
						Ext.Ajax.request({
							url: 'servlet/QueryDocuments?mode=EDIT&storageId=' + idPlace,
							success: function (action) {
								placeCard.docGrid.getStore().removeAll();
								placeCard.docGrid.columns[1].editor = Ext.create('Ext.form.field.ComboBox', {
									store: 'DocTypesStore',
									valueField: 'id',
									displayField: 'name',
									blankText: 'Не выбран вид документа',
									emptyText: 'Не выбран',
									forceSelection: true,
									validateOnChange: false
								});
								placeCard.docGrid.getStore().loadData(Ext.decode(action.responseText));
								myMask.hide();
							},
							failure: function () {
								msg.alert('Ошибка', 'Ошибка базы данных!');
							}
						});
						myEditOrgPage.placesFieldSet.add(placeCard);
					}


				},
				failure: function () {
					msg.alert('Ошибка', 'Ошибка базы данных!');
				}
			});
			main.add(myEditOrgPage);
		};
		/**
		 * объект для хранения информации об адресе архива
		 */
		function archiveInfo(id, archiveId, address, phone, addressStore) {
			var me = this;
			if (!addressStore.getById(id)) {
				var realId = null;
				addressStore.each(function (r) {
					if (r.get('address') === id) {
						realId = r.get('id');
						return false;
					}
				});
				id = realId;
			}
			me.id = id;
			me.archiveId = archiveId;
			me.address = address;
			me.phone = phone;
		}
		archiveInfo.prototype.pk = function () {
			return this.archiveId + ":" + this.address;
		};
		archiveInfo.prototype.equals = function (other) {
			return this.archiveId === other.archiveId &&
					this.address === other.address;
		};
	}
});