Ext.define('storeplaces.controller.OrgPageFunc', {
	extend: 'Ext.app.Controller',
	refs: [
		{
			ref: 'page',
			selector: 'viewport > container > form'
		}],
	activeReqs: [],
	init: function () {

	},
	onLaunch: function () {
	},
	moveNext: function mvN(id) {
		var me = this,
				form = me.getPage(),
				main = form.up('container');
		main.removeAll();

		var myOrgPage = Ext.create('storeplaces.view.page.COrganizationPageView');
		myOrgPage.idCard = id;

		me.activeReqs.forEach(function (req) {
			Ext.Ajax.abort(req);
		});
		me.activeReqs = [];

		me.activeReqs.push(Ext.Ajax.request({
			url: 'servlet/QueryOrgNames',
			params: {
				id: id
			},
			success: function (action) {
				var massStore = Ext.decode(action.responseText);
				myOrgPage.orgStore.loadData(massStore);
			},
			failure: function (req) {
				if (!req.aborted)
					Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
			}
		}));
		me.activeReqs.push(Ext.Ajax.request({
			url: 'servlet/QueryOrganization',
			params: {
				id: id,
				mode: 'VIEW'
			},
			success: function (action) {
				var dataArray = Ext.decode(action.responseText),
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

				for (var i = 0, max = storage.length; i < max; i++) {
					var strg = storage[i],
							idPlace = strg.id,
							storageTypePlace = strg.storageType;

					var placeCard = Ext.create('storeplaces.view.card.CStorePlaceView');
					placeCard.idPlace = idPlace;
					myOrgPage.placesFieldSet.add(placeCard);
					if (storageTypePlace == 'В организации') {
						placeCard.taOrg.setValue(strg.orgName);
						placeCard.tfArchive.setVisible(false);
						placeCard.taOrg.setVisible(true);
					} else {
						placeCard.taOrg.setVisible(false);
						placeCard.tfArchive.setValue(strg.archive);
						placeCard.tfArchive.setVisible(true);
					}

					placeCard.tfStorageType.setValue(storageTypePlace);
					placeCard.tfAddr.setValue(strg.address);
					placeCard.tfPhone.setValue(strg.phone);
					placeCard.nfCount.setValue(strg.documentCount);
					placeCard.yearInterval.items.items[1].setValue(strg.beginYear);
					placeCard.yearInterval.items.items[2].setValue(strg.endYear);
					placeCard.taDocsContent.setValue(strg.contents);
					me.activeReqs.push(Ext.Ajax.request({
						url: 'servlet/QueryDocuments',
						params: {
							storageId: idPlace,
							mode: 'VIEW'
						},
						pc: placeCard,
						success: function (action, opts) {
							var placeCard = opts.pc;
							var massStorage = Ext.decode(action.responseText);
							placeCard.docGrid.getStore().loadData(massStorage);
						},
						failure: function (req) {
							if (!req.aborted)
								Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
						}
					}));
				}
			},
			failure: function (req) {
				if (!req.aborted)
					Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
			}
		}));
		main.add(myOrgPage);
	}
});


