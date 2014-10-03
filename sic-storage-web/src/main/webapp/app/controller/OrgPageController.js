Ext.define('storeplaces.controller.OrgPageController', {
	extend: 'Ext.app.Controller',
	refs: [
		{
			ref: 'page',
			selector: 'viewport > container > corgpage'
		}],
	init: function() {
		this.control({
			'button': {
				click: function(btn, eventObj) {
					if (btn.action == 'srchFund')
					{
						var numFund = btn.up('fieldcontainer');
						var fs = numFund.up('fieldset');
						var main = fs.up('container');
					}
					else if (btn.action == 'deleteCard')
					{
						var form = btn.up('form');
						this.getPage().placesFieldSet.remove(form);
					}
					else if (btn.id != 'button-1005')
					{
						var tb = btn.up('toolbar');
						var form = tb.up('form');
						var main = form.up('container');
						var vp = main.up('viewport');
						var buffer = vp.items.items[1];
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
							var d = this.getPage().placesFieldSet.body.dom;
							d.scrollTop = 99999;
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
							Ext.Ajax.request({
								url: 'servlet/Auth',
								params: {
									action: 'logout'
								},
								success: function(action) {
									var isSuccess = Ext.decode(action.responseText).success;
									var isMsg = Ext.decode(action.responseText).msg;
									main.removeAll();
									buffer.removeAll();
									Ext.getStore('GridSearchOrgStore').removeAll();
									main.add(Ext.create('storeplaces.view.page.CLoginPage'));
								},
								failure: function(action) {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
							/* case 'viewToEdit':
							 main.removeAll();
							 main.add(buffer.items.items[0]);
							 break;      */
						case 'orgCardDelete':
							var id = form.idCard;
							if (id == null)
							{
								Ext.Msg.alert('Внимание', 'Организация не создана!');
								break;
							}
							Ext.Ajax.request({
								url: 'servlet/DeleteOrganization',
								params: {
									id: id
								},
								success: function(action) {
									var success = Ext.decode(action.responseText).success;
									main.removeAll();
									main.add(Ext.create('storeplaces.view.page.COrganizationPage'));
									Ext.Msg.alert('Внимание', 'Организация удалена!');
								},
								failure: function() {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'orgCardDeleteView':
							var id = form.idCard;
							if (id == null)
							{
								Ext.Msg.alert('Внимание', 'Организация не создана!');
								break;
							}
							Ext.Ajax.request({
								url: 'servlet/DeleteOrganization',
								params: {
									id: id
								},
								success: function(action) {
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
									Ext.Msg.alert('Внимание', 'Организация удалена!');
								},
								failure: function() {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'newCancel':
						case 'orgCardAdd':
							var FIO = form.FIO.text;
							var oldData = form.oldData;
							main.removeAll();
							var newOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
							newOrgPage.items.items[0].items.items[2].action = 'viewNew';
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
							if (form.gridNames.getStore().getCount() === 0) {
								Ext.Msg.alert('Внимание', 'Для сохранения необходимо заполнить наименование организации!');
								break;
							}
							else if (form.fundFieldset.items.items[0].getValue() === null) {
								Ext.Msg.alert('Внимание', 'Для сохранения необходимо выбать архив в фондовой принадлежности!');
								break;
							}
							if (form.fundFieldset.items.items[2].items.items[1].getRawValue() != '' &&
									form.fundFieldset.items.items[1].getRawValue() === '') {
								Ext.Msg.alert('Внимание', 'Для сохранения необходимо заполнить название фонда!');
								break;
							}
							if (form.placesFieldSet.items.items.length === 0) {
								Ext.Msg.alert('Внимание', 'Для сохранения необходимо заполнить хотя бы одно место хранения!');
								break;
							}

							for (var i = 0; i < form.placesFieldSet.items.items.length; i++)
							{
								var Card = form.placesFieldSet.items.items[i],
										orgName = Card.taOrg.getRawValue(),
										ps = Card.cbStorageType.getValue(),
										addres;
								if (ps == 2) {
									place = orgName;    //tf
									addres = Card.tfAddr.getValue();
								} else {
									place = Card.cbArchive.getValue(); //combo
									addres = Card.cbAddr.getValue();    //combo
								}

								if (ps == null) {
									Ext.Msg.alert('Внимание', 'Для сохранения необходимо выбрать место хранения!');
									break;
								}
								else if (place == '') {
									Ext.Msg.alert('Внимание', 'Для сохранения необходимо заполнить название организации места хранения!');
									break;
								}

								if (addres == null || addres == '') {
									Ext.Msg.alert('Внимание', 'Для сохранения необходимо выбрать заполнить адрес места хранения!');
									break;
								}

							}
							var modelsOrg = form.orgStore.getRange();
							var names = new Array();
							for (var i = 0; i < modelsOrg.length; i++) {
								modelsOrg[i].set('sortOrder', i + 1)
								names.push(modelsOrg[i].getData());
							}
							var idOrg = form.idCard;
							var idFund = form.idFund;
							var businessTripsInfoSave = form.areaFieldSets.items.items[0].getRawValue();
							if (businessTripsInfoSave == '')
								businessTripsInfoSave = null;
							var rewardsInfoSave = form.areaFieldSets.items.items[1].getRawValue();
							if (rewardsInfoSave == '')
								rewardsInfoSave = null;
							var notesSave = form.areaFieldSets.items.items[2].getRawValue();
							if (notesSave == '')
								notesSave = null;
							var idArch = form.fundFieldset.items.items[0].getValue();
							var prefix = form.fundFieldset.items.items[2].items.items[0].getRawValue();
							if (prefix == '')
								prefix = null;
							var numFund = form.fundFieldset.items.items[2].items.items[1].getRawValue();
							var suffix = form.fundFieldset.items.items[2].items.items[2].getRawValue();
							if (suffix == '')
								suffix = null;
							var nameFund = form.fundFieldset.items.items[1].getRawValue();
							if (nameFund == '')
								nameFund = null;
							var datesFund = form.fundFieldset.items.items[3].getRawValue();
							if (datesFund == '')
								datesFund = null;
							if (numFund == '') {
								numFund = null;
								var fund = null;
							} else {
								numFund = parseInt(numFund);
								var fund = {
									'id': idFund,
									'archiveId': idArch,
									'num': numFund,
									'prefix': prefix,
									'suffix': suffix,
									'name': nameFund,
									'dates': datesFund
								};
							}

							var myCards = form.placesFieldSet.items.items;
							var storage = new Array();
							// var documents           = new Array();

							for (var j = 0; j < myCards.length; j++) {
								var documents = new Array();
								var dataCard = myCards[j];
								var idPlace = dataCard.idPlace;
								var phone = dataCard.tfPhone.getRawValue();
								if (phone == '')
									phone = null;
								var documentCount = dataCard.nfCount.getRawValue();
								documentCount = parseInt(documentCount);
								var orgName = dataCard.taOrg.getRawValue();

								if (orgName) {
									var address = dataCard.tfAddr.getRawValue();
									if (address == '')
										address = null;
									var archStrg = null;
								} else {
									orgName = null;
									var address = dataCard.cbAddr.getRawValue();
									if (address == '')
										address = null;
									var idArchiveCb = dataCard.cbArchive.getValue();
									var idArchStorage = dataCard.cbAddr.getValue();
									idArchStorage = parseInt(idArchStorage);
									var archStrg = {
										'id': idArchStorage,
										'archiveId': idArchiveCb,
										'address': address,
										'phone': phone
									};
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

								var contents = dataCard.taDocsContent.getRawValue();
								if (contents == '')
									contents = null;

								var card = {
									'id': idPlace,
									'archStrg': archStrg,
									'orgName': orgName,
									'address': address,
									'phone': phone,
									'documentCount': documentCount,
									'beginYear': beginYear,
									'endYear': endYear,
									'documents': documents,
									'contents': contents
								}
								storage.push(card);
							}
							var org = {
								'id': idOrg,
								'names': names,
								'archiveId': idArch,
								'fund': fund,
								'storage': storage,
								'businessTripsInfo': businessTripsInfoSave,
								'rewardsInfo': rewardsInfoSave,
								'notes': notesSave
							};
							org = Ext.encode(org);

							Ext.Ajax.request({
								url: 'servlet/SaveOrganization',
								params: {
									org: org
								},
								success: function(action) {
									var idOrg = Ext.decode(action.responseText).id;
									form.idCard = idOrg;
									var FIO = form.FIO.text;
									reloadMain(idOrg, FIO, oldData, main);
								},
								failure: function() {
									// Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
									// Ext.Msg.alert('Внимание', 'Для сохранения необходимо заполнить место хранения, архив и адрес в каждой карточке!');
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
								url: 'servlet/QueryOrgNames',
								params: {
									id: id
								},
								success: function(action) {
									var massStore = Ext.decode(action.responseText);
									myEditOrgPage.orgStore.loadData(massStore);

								},
								failure: function() {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							Ext.Ajax.request({
								url: 'servlet/QueryOrganization',
								params: {
									id: id,
									mode: 'EDIT'
								},
								success: function(action) {
									var dataArray = Ext.decode(action.responseText);
									var archiveId = Ext.decode(action.responseText).archiveId;
									var fund = Ext.decode(action.responseText).fund;

									if (fund)
									{
										var fundId = Ext.decode(action.responseText).fund.id;
										var fundNum = Ext.decode(action.responseText).fund.num;
										var fundPrefix = Ext.decode(action.responseText).fund.prefix;
										var fundSuffix = Ext.decode(action.responseText).fund.suffix;
										var fundName = Ext.decode(action.responseText).fund.name;
										var fundDates = Ext.decode(action.responseText).fund.dates;
										myEditOrgPage.idFund = fundId;
									}

									var storage = Ext.decode(action.responseText).storage;

									var businessTripsInfo = Ext.decode(action.responseText).businessTripsInfo;
									var rewardsInfo = Ext.decode(action.responseText).rewardsInfo;
									var notes = Ext.decode(action.responseText).notes;
									var userName = Ext.decode(action.responseText).userName;
									var lastUpdateDate = Ext.decode(action.responseText).lastUpdateDate;

									var myArchive = myEditOrgPage.fundFieldset.items.items[0];
									var myFundName = myEditOrgPage.fundFieldset.items.items[1];
									var myFundPrefix = myEditOrgPage.fundFieldset.items.items[2].items.items[0];
									var myFundNum = myEditOrgPage.fundFieldset.items.items[2].items.items[1];
									var myFundSuffix = myEditOrgPage.fundFieldset.items.items[2].items.items[2];
									var myDates = myEditOrgPage.fundFieldset.items.items[3];
									var myBusinessTripsInfo = myEditOrgPage.areaFieldSets.items.items[0];
									var myRewardsInfo = myEditOrgPage.areaFieldSets.items.items[1];
									var myNotes = myEditOrgPage.areaFieldSets.items.items[2];
									var myUserName = myEditOrgPage.tfUser;
									var myLastUpdateDate = myEditOrgPage.tfDateOfEdit;

									myFundName.setDisabled(false);
									myDates.setDisabled(false);

									myFundName.setValue(fundName);
									myFundPrefix.setValue(fundPrefix);
									myFundNum.setValue(fundNum);
									myFundSuffix.setValue(fundSuffix);
									myArchive.setValue(archiveId);
									myDates.setValue(fundDates);
									myBusinessTripsInfo.setValue(businessTripsInfo);
									myRewardsInfo.setValue(rewardsInfo);
									myNotes.setValue(notes);
									myUserName.setValue(userName);
									myLastUpdateDate.setValue(lastUpdateDate);
									for (var i = 0; i < storage.length; i++)
									{
										var placeCard = Ext.create('storeplaces.view.card.CStorePlace');
										var idPlace = storage[i].id;   // id места хранения документов
										var archStrg = storage[i].archStrg;
										if (archStrg)
										{
											var archInId = storage[i].archStrg.id; // id места хранения в архиве
											var archId = storage[i].archStrg.archiveId; //id архива(второй комбо снизу)
											var archAddress = storage[i].archStrg.address
											var archPhone = storage[i].archStrg.phone
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

										placeCard.idPlace = idPlace;
										placeCard.idArchStorage = archInId;
										placeCard.tfPhone.setDisabled(false);
										placeCard.nfCount.setDisabled(false);
										placeCard.yearInterval.setDisabled(false);
										placeCard.yearInterval.items.items[1].setDisabled(false);
										placeCard.yearInterval.items.items[2].setDisabled(false);
										if (archId == '' || archId == null)
										{
											placeCard.cbStorageType.setValue(2);
											placeCard.taOrg.setVisible(true);
											placeCard.tfAddr.setVisible(true);
											placeCard.cbAddr.setVisible(false);
											placeCard.taOrg.setValue(orgNamePlace);
											placeCard.tfAddr.setValue(addressPlace);
											placeCard.taOrg.setDisabled(false);
											placeCard.tfAddr.setDisabled(false);

										}
										else
										{
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
											url: 'servlet/QueryDocuments',
											params: {
												storageId: idPlace,
												mode: 'EDIT'
											},
											pc: placeCard,
											success: function(action, opts) {
												placeCard = opts.pc;
												placeCard.docGrid.columns[1].editor = Ext.create('Ext.form.field.ComboBox', {
													store: 'DocTypesStore',
													valueField: 'id',
													displayField: 'name',
													blankText: 'Не выбран вид документа',
													emptyText: 'Не выбран',
													forceSelection: true,
													validateOnChange: false
												});
												var massStorage = Ext.decode(action.responseText);
												placeCard.docGrid.getStore().loadData(massStorage);

											},
											failure: function() {
												Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
											}
										});

										myEditOrgPage.placesFieldSet.add(placeCard);
									}


								},
								failure: function() {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							main.add(myEditOrgPage);
							break;
						case 'srchFund':
							var archiveId = fs.items.items[0].getValue();
							var num = numFund.items.items[1].getRawValue();
							var prefix = numFund.items.items[0].getRawValue();
							var suffix = numFund.items.items[2].getRawValue();
							if (archiveId == '' || archiveId == null || num == ''/* || prefix=='' || suffix==''*/)
							{
								Ext.Msg.alert('Внимание', 'Для поиска необходимо ввсети архив и номер фонда');
								break;
							}
							if (prefix == '')
								prefix = null;
							if (suffix == '')
								suffix = null;
							num = parseInt(num);

							var fund = {'num': num, 'prefix': prefix, 'suffix': suffix};
							fund = Ext.encode(fund);
							var nameFund = fs.items.items[1];
							var datesFund = fs.items.items[3];

							Ext.Ajax.request({
								url: 'servlet/QueryFundInfo',
								params: {
									'archiveId': archiveId,
									'fund': fund
								},
								success: function(action) {
									var isFound = Ext.decode(action.responseText).found;
									if (isFound == false)
									{
										Ext.example.msg('Внимание!', 'Фонд не найден!');
										nameFund.enable();
										datesFund.enable();
									}
									else
									{
										var isName = Ext.decode(action.responseText).fund.name;
										var isId = Ext.decode(action.responseText).fund.id;
										var isNum = Ext.decode(action.responseText).fund.num;
										var isPrefix = Ext.decode(action.responseText).fund.prefix;
										var isSuffix = Ext.decode(action.responseText).fund.suffix;
										var isDates = Ext.decode(action.responseText).fund.dates;
										nameFund.setValue(isName);
										datesFund.setValue(isDates);
										nameFund.enable();
										datesFund.enable();
									}
								},
								failure: function(action) {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
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
		var reloadMain = function(id, FIO, oldData, main)
		{
			var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Сохранение..."});
			myMask.show();
			main.removeAll();
			var myEditOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
			myEditOrgPage.FIO.setText(FIO);
			myEditOrgPage.oldData = oldData;
			myEditOrgPage.idCard = id;
			Ext.Ajax.request({
				url: 'servlet/QueryOrgNames',
				params: {
					id: id
				},
				success: function(action) {
					var massStore = Ext.decode(action.responseText);
					myEditOrgPage.orgStore.loadData(massStore);

				},
				failure: function() {
					Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
				}
			});
			Ext.Ajax.request({
				url: 'servlet/QueryOrganization',
				params: {
					id: id,
					mode: 'EDIT'
				},
				success: function(action) {
					var dataArray = Ext.decode(action.responseText);
					var archiveId = Ext.decode(action.responseText).archiveId;
					var fund = Ext.decode(action.responseText).fund;
					if (fund)
					{
						var fundId = Ext.decode(action.responseText).fund.id;
						var fundNum = Ext.decode(action.responseText).fund.num;
						var fundPrefix = Ext.decode(action.responseText).fund.prefix;
						var fundSuffix = Ext.decode(action.responseText).fund.suffix;
						var fundName = Ext.decode(action.responseText).fund.name;
						var fundDates = Ext.decode(action.responseText).fund.dates;
						myEditOrgPage.idFund = fundId;
					}

					var storage = Ext.decode(action.responseText).storage;

					var businessTripsInfo = Ext.decode(action.responseText).businessTripsInfo;
					var rewardsInfo = Ext.decode(action.responseText).rewardsInfo;
					var notes = Ext.decode(action.responseText).notes;
					var userName = Ext.decode(action.responseText).userName;
					var lastUpdateDate = Ext.decode(action.responseText).lastUpdateDate;

					var myArchive = myEditOrgPage.fundFieldset.items.items[0];
					var myFundName = myEditOrgPage.fundFieldset.items.items[1];
					var myFundPrefix = myEditOrgPage.fundFieldset.items.items[2].items.items[0];
					var myFundNum = myEditOrgPage.fundFieldset.items.items[2].items.items[1];
					var myFundSuffix = myEditOrgPage.fundFieldset.items.items[2].items.items[2];
					var myDates = myEditOrgPage.fundFieldset.items.items[3];
					var myBusinessTripsInfo = myEditOrgPage.areaFieldSets.items.items[0];
					var myRewardsInfo = myEditOrgPage.areaFieldSets.items.items[1];
					var myNotes = myEditOrgPage.areaFieldSets.items.items[2];
					var myUserName = myEditOrgPage.tfUser;
					var myLastUpdateDate = myEditOrgPage.tfDateOfEdit;

					myFundName.setDisabled(false);
					myDates.setDisabled(false);

					myFundName.setValue(fundName);
					myFundPrefix.setValue(fundPrefix);
					myFundNum.setValue(fundNum);
					myFundSuffix.setValue(fundSuffix);
					myArchive.setValue(archiveId);
					myDates.setValue(fundDates);
					myBusinessTripsInfo.setValue(businessTripsInfo);
					myRewardsInfo.setValue(rewardsInfo);
					myNotes.setValue(notes);
					myUserName.setValue(userName);
					myLastUpdateDate.setValue(lastUpdateDate);

					for (var i = 0; i < storage.length; i++)
					{
						var idPlace = storage[i].id;   // id места хранения документов
						var archStrg = storage[i].archStrg;
						if (archStrg)
						{
							var archInId = storage[i].archStrg.id; // id места хранения в архиве
							var archId = storage[i].archStrg.archiveId; //id архива(второй комбо снизу)
							var archAddress = storage[i].archStrg.address
							var archPhone = storage[i].archStrg.phone
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

						if (archId == '' || archId == null)
						{
							placeCard.cbStorageType.setValue(2);
							placeCard.taOrg.setVisible(true);
							placeCard.tfAddr.setVisible(true);
							placeCard.cbAddr.setVisible(false);
							placeCard.taOrg.setValue(orgNamePlace);
							placeCard.tfAddr.setValue(addressPlace);
							placeCard.taOrg.setDisabled(false);
							placeCard.tfAddr.setDisabled(false);

						}
						else
						{
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
							url: 'servlet/QueryDocuments',
							params: {
								storageId: idPlace,
								mode: 'EDIT'
							},
							pc: placeCard,
							success: function(action, opts) {
								var placeCard = opts.pc;
								var massStorage = Ext.decode(action.responseText);
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
								placeCard.docGrid.getStore().loadData(massStorage);
								myMask.hide();
								Ext.Msg.alert('Внимание', 'Организация сохранена!');
							},
							failure: function() {
								Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
							}
						});
						myEditOrgPage.placesFieldSet.add(placeCard);
					}


				},
				failure: function() {
					Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
				}
			});
			main.add(myEditOrgPage);
		}
	}
});