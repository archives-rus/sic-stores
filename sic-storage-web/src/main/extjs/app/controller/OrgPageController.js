Ext.define('storeplaces.controller.OrgPageController', {
	extend: 'Ext.app.Controller',
	refs: [
		{
			ref: 'page',
			selector: 'viewport > container > corgpage'
		}, {
			ref: 'viewport',
			selector: 'viewport'
		}],
	init: function () {
		var msg = Ext.Msg,
				controller = this;
		controller.control({
			button: {
				click: function myfn(btn) {
					var mainContainer = storeplaces.mainView,
							form = mainContainer.getCurrentPage();

					if (btn.action === 'srchFund') {
						var numFund = btn.up('fieldcontainer'),
								fs = numFund.up('fieldset');
					} else if (btn.action === 'deleteCard') {
						form.placesFieldSet.remove(btn.up('form'));
						return;
					}

					switch (btn.action) {
						case 'addStorePlace':
							var place = Ext.create('CStorePlace');
							place.docGrid.columns[1].editor = Ext.create('Ext.form.field.ComboBox', {
								store: 'DocTypesStore',
								valueField: 'id',
								displayField: 'name',
								blankText: 'Не выбран вид документа',
								emptyText: 'Не выбран',
								forceSelection: true,
								validateOnChange: false
							});
							form.placesFieldSet.add(place);
							form.placesFieldSet.body.dom.scrollTop = 99999;
							break;
						case 'namesGridUp':
							var form = btn.up('toolbar').up('gridpanel').up('fieldset').up('form');
							var sm = form.gridNames.getSelectionModel();
							var record = sm.getSelection()[0];
							if (record === null)
								break;
							var index = form.gridNames.getStore().indexOf(record);
							if (index !== 0) {
								form.gridNames.getStore().remove(record, true);
								form.gridNames.getStore().insert(index - 1, record);
							}
							break;
						case 'namesGridDown':
							var form = btn.up('toolbar').up('gridpanel').up('fieldset').up('form');
							var maxIndex = form.gridNames.getStore().getCount() - 1;
							var sm = form.gridNames.getSelectionModel();
							var record = sm.getSelection()[0];
							if (record === null)
								break;
							var index = form.gridNames.getStore().indexOf(record);
							if (index !== maxIndex)
							{
								form.gridNames.getStore().remove(record, true);
								form.gridNames.getStore().insert(index + 1, record);
							}
							break;
						case 'namesGridAdd': // Добавляет ряд для "Наименование организации и ее переименования"
							var page_ = this.getPage(),
									store_ = page_.orgStore,
									index = store_.getCount() || 0;
							store_.insert(index, Ext.create('storeplaces.model.OrganizationName'));
							page_.gridNames.getView().focusRow(index);
							break;
						case 'addDocRow':
							var gridTb = btn.up('toolbar');
							var gridPlace = gridTb.up('grid');
							var count = gridPlace.getStore().getCount();
							if (count === null)
								count = 0;
							gridPlace.getStore().insert(count, Ext.create('storeplaces.model.DocTableEntryWrite'));
							break;
						case 'quit':
							storeplaces.userStore.removeAll(true);
							Ext.Ajax.request({url: '/qq-web/Auth?action=logout',
								success: function () {
									window.location = '/qq-web/';
								}});
							break;
						case 'orgCardDelete':
							var id = form.idCard;
							if (id === null) {
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
									mainContainer.setPage('COrganizationPage');
									msg.alert('Внимание', 'Организация удалена!');
								},
								failure: function () {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'orgCardDeleteView':
							var id = form.idCard;
							if (id === null) {
								msg.alert('Внимание', 'Организация не создана!');
								break;
							}
							Ext.Ajax.request({
								url: 'servlet/DeleteOrganization',
								params: {
									id: id
								},
								success: function (action) {
//									var success = Ext.decode(action.responseText).success;
									var cardsStore = Ext.getStore('CardsStore');
									var cardsStoreAll = Ext.getStore('CardsStoreAll');
									var thisPage = form.cardToolBar.items.items[4].getValue();
									if (cardsStoreAll.getCount() < 2) {
										if (cardsStoreAll.getCount() === 1)
											Ext.getStore('GridSearchOrgStore').reload();
										mainContainer.setPage('CSearchPage');
										// oldSrchPage.items.items[1].items.items[0].fireEvent('click');

									} else if (thisPage === 1) {
										cardsStore.loadPage(1);
										var id = cardsStoreAll.getAt(1).get('id');
										window.app.getController('storeplaces.controller.OrgPageFunc').moveNext(id);
										cardsStore.reload();
										cardsStoreAll.reload();
									} else {
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
						case 'orgCardAdd':
							var p = mainContainer.setPage('COrganizationPage');
							p.clear();
							p.fromView();
							p.idFund = p.idCard = null;
							break;
						case 'backSrchResult':
							mainContainer.setPage('CSearchPage');
							break;

						case 'orgCardSave':
							var errMessages = [],
									fundNumber = form.fundFieldset.items.getAt(2).items;
							if (form.gridNames.getStore().getCount() === 0)
								errMessages.push('заполнить наименование организации');
							if (form.fundFieldset.items.items[0].getValue() === null)
								errMessages.push('выбать архив в фондовой принадлежности');
							if (fundNumber.getAt(0).getRawValue().length > 4)
								errMessages.push('префикс не должен превышать 4 символа');
							if (fundNumber.getAt(2).getRawValue().length > 4)
								errMessages.push('суффикс не должен превышать 4 символа');
							if (fundNumber.getAt(1).getRawValue().length > 10)
								errMessages.push('номер фонда не должен превышать 10 символов');
							if (fundNumber.getAt(1).getRawValue() !== '' &&
									form.fundFieldset.items.items[1].getRawValue() === '')
								errMessages.push('заполнить название фонда');
							if (form.placesFieldSet.items.items.length === 0)
								errMessages.push('заполнить хотя бы одно место хранения');

							form.placesFieldSet.items.each(function (Card) {
								Card.getErrors(errMessages);
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
									numFund = fundFieldset.items[2].items.items[1].getRawValue() || null,
									suffix = fundFieldset.items[2].items.items[2].getRawValue() || null,
									nameFund = fundFieldset.items[1].getRawValue() || null,
									datesFund = fundFieldset.items[3].getRawValue() || null,
									fund = null;
							if (numFund) {
								numFund = parseInt(numFund);
								fund = {
									'id': form.idFund,
									'archiveId': idArch,
									'num': numFund,
									'prefix': prefix,
									'suffix': suffix,
									'name': nameFund,
									'dates': datesFund
								};
							}

							var storage = [],
									newaddresses = Ext.create('Ext.util.MixedCollection');

							form.placesFieldSet.items.each(function (Card) {
								var documents = [],
										idPlace = Card.idPlace,
										typeSave = Card.cbStorageType.getValue(),
										documentCount = parseInt(Card.nfCount.getRawValue()),
										orgName = null,
										address, archStrg;
								if (typeSave === 2) {
									orgName = Card.taOrg.getRawValue();
									address = Card.tfAddr.getRawValue() || null;
									archStrg = null;
								} else {
									address = Card.cbAddr.getRawValue() || null;
									archStrg = new archiveInfo(Card.cbAddr.getValue(),
											Card.cbArchive.getValue(),
											address, Card.tfPhone.getRawValue(),
											Card.cbAddr.getStore());
								}
								var beginYear = parseInt(Card.yearInterval.items.getAt(1).getRawValue()),
										endYear = parseInt(Card.yearInterval.items.getAt(2).getRawValue()),
										modelsCard = Card.docGrid.getStore().getRange();
								for (var i = 0; i < modelsCard.length; i++) {
									var documentsModel = modelsCard[i];
									if (documentsModel.get('id') === 0)
										documentsModel.set('id', '');
									documents.push(modelsCard[i].getData());
								}

								var contents = Card.taDocsContent.getRawValue(),
										tmpAddress;
								if (contents === '')
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
									phone: archStrg ? (archStrg.phone || null) :
											orgName ? (Card.tfPhone.getRawValue() || null) : null,
									documentCount: documentCount,
									beginYear: beginYear,
									endYear: endYear,
									documents: documents,
									contents: contents
								};
								storage.push(card);
							});

							var org = Ext.encode({
								id: form.idCard,
								names: names,
								archiveId: idArch,
								fund: fund,
								storage: storage,
								businessTripsInfo: areaFieldSets.items[0].getRawValue() || null,
								rewardsInfo: areaFieldSets.items[1].getRawValue() || null,
								notes: areaFieldSets.items[2].getRawValue() || null
							});

							Ext.Ajax.request({
								url: 'servlet/SaveOrganization',
								params: {
									org: org
								},
								success: function (action) {
									form.idCard = Ext.decode(action.responseText).id;
									myfn(Ext.create('Ext.button.Button', {action: 'orgCardView'}));
								},
								failure: function (res) {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;

						case 'orgCardCancel':
							mainContainer.setPrev();
							break;

						case 'orgCardView':
							var myOrgPage = mainContainer.setPage('COrganizationPageView');
							myOrgPage.idCard = form.idCard;

							Ext.Ajax.request({
								url: 'servlet/QueryOrganization',
								params: {
									id: myOrgPage.idCard,
									mode: 'VIEW'
								},
								success: function (action) {
									myOrgPage.setData(Ext.decode(action.responseText));
								},
								failure: function () {
									Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;

						case 'orgCardEdit':
							var id = form.idCard,
									editOrgPage = mainContainer.setPage('COrganizationPage');
							editOrgPage.fromView();
							editOrgPage.idCard = id;

							Ext.Ajax.request({
								url: 'servlet/QueryOrganization?mode=EDIT&id=' + id,
								success: function (action) {
									editOrgPage.setData(Ext.decode(action.responseText));
								},
								failure: function () {
									msg.alert('Ошибка', 'Ошибка базы данных!');
								}
							});
							break;
						case 'srchFund':
							var archiveId = fs.items.items[0].getValue(),
									numItems = numFund.items,
									num = numItems.getAt(1).getRawValue();
							if (!(archiveId && num)) {
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
									if (answer.found === false) {
										storeplaces.alert('Внимание!', 'Фонд не найден!');
										nameFund.enable();
										datesFund.enable();
									} else {
										var fond = answer.fund;
										nameFund.setValue(fond.name);
										datesFund.setValue(fond.dates);
										nameFund.enable();
										datesFund.enable();
										controller.getPage().idFund = fond.id;
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