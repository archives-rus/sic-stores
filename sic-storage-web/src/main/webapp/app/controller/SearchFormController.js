Ext.define('storeplaces.controller.SearchFormController',{
    extend:'Ext.app.Controller',
    views: ['page.CSearchPage'],
    searchCriteria : null,
    init:function(){
       this.control({
             'searchpage grid':{
                 itemdblclick: function(thiss, record, item, index, e, eOpts){
                    var id          = record.get('id');
                    var form        = thiss.up('form');
                    var main        = form.up('container');
                    var oldData     = form.getForm().getValues();
                    var FIO         = form.FIO.text;
                    var pageSearch  = parseInt(form.pagingTb.items.items[4].getValue());
                    var cardNum     = parseInt((2*(pageSearch-1)+1) + index);
                    main.removeAll();
                    var myOrgPage       = Ext.create('storeplaces.view.page.COrganizationPageView');
                    myOrgPage.oldData   = oldData;
                    myOrgPage.idCard    = id;
                    myOrgPage.FIO.setText(FIO);
                    var criteria = this.searchCriteria;
                    criteria = Ext.encode(criteria);
                    var cardsStorePaging    = Ext.getStore('storeplaces.store.CardsStore');
                    cardsStorePaging.getProxy().extraParams = {'criteria':criteria};
                    cardsStorePaging.loadPage(cardNum);
                    Ext.Ajax.request({
                        url: 'servlet/QueryOrgNames',
                        params : {
                            id:id
                        },
                        success: function(action){
                            var massStore = Ext.decode(action.responseText);
                            myOrgPage.orgStore.loadData(massStore);

                        },
                        failure : function() {
                            Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                        }
                    });
                   Ext.Ajax.request({
                        url: 'servlet/QueryOrganization',
                        params : {
                            id:id,
                            mode:'VIEW'
                        },
                        success: function(action){
                            var dataArray   = Ext.decode(action.responseText);
                            var archive     = Ext.decode(action.responseText).archive;
                            var fund        = Ext.decode(action.responseText).fund;
                            var fundName    = Ext.decode(action.responseText).fundName;
                            var edgeDates   = Ext.decode(action.responseText).edgeDates;

                            var storage     = Ext.decode(action.responseText).storage;

                            var businessTripsInfo   = Ext.decode(action.responseText).businessTripsInfo;
                            var rewardsInfo         = Ext.decode(action.responseText).rewardsInfo;
                            var notes               = Ext.decode(action.responseText).notes;
                            var userName            = Ext.decode(action.responseText).userName;
                            var lastUpdateDate      = Ext.decode(action.responseText).lastUpdateDate;

                            var myArchive           =  myOrgPage.fundFieldset.items.items[0];
                            var myFundName          =  myOrgPage.fundFieldset.items.items[1];
                            var myFundNum           =  myOrgPage.fundFieldset.items.items[2];
                            var myDates             =  myOrgPage.fundFieldset.items.items[3];
                            var myBusinessTripsInfo =  myOrgPage.areaFieldSets.items.items[0];
                            var myRewardsInfo       =  myOrgPage.areaFieldSets.items.items[1];
                            var myNotes             =  myOrgPage.areaFieldSets.items.items[2];
                            var myUserName          =  myOrgPage.tfUser;
                            var myLastUpdateDate    =  myOrgPage.tfDateOfEdit;

                            myFundName.setValue(fundName);
                            myFundNum.setValue(fund);
                            myArchive.setValue(archive);
                            myDates.setValue(edgeDates);
                            myBusinessTripsInfo.setValue(businessTripsInfo);
                            myRewardsInfo.setValue(rewardsInfo);
                            myNotes.setValue(notes);
                            myUserName.setValue(userName);
                            myLastUpdateDate.setValue(lastUpdateDate);

                            for(var i=0; i<storage.length; i++)
                            {
                                var idPlace             =storage[i].id;
                                var storageTypePlace    =storage[i].storageType;
                                var archivePlace        =storage[i].archive;
                                var orgNamePlace        =storage[i].orgName;
                                var addressPlace        =storage[i].address;
                                var phonePlace          =storage[i].phone;
                                var documentCountPlace  =storage[i].documentCount;
                                var beginYearPlace      =storage[i].beginYear;
                                var endYearPlace        =storage[i].endYear;
                                var contentsPlace       =storage[i].contents;

                                var placeCard  = Ext.create('storeplaces.view.card.CStorePlaceView');
                                    placeCard.idPlace = idPlace;
                                if(storageTypePlace=='В организации')
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
                                    params : {
                                        storageId:idPlace,
                                        mode:'VIEW'
                                    },
                                    success: function(action){
                                        var massStorage = Ext.decode(action.responseText);
                                        placeCard.docReadStore.loadData(massStorage);

                                    },
                                    failure : function() {
                                        Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                    }
                                });
                                myOrgPage.placesFieldSet.add(placeCard);
                            }


                        },
                        failure : function() {
                            Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                        }
                    });
                    main.add(myOrgPage);
                }
            },
            'searchpage  button':{
                click:function(btn,eventObj){
                    var orgName     =  searchFieldset.items.items[0];
                    var documentType=  searchFieldset.items.items[1];
                    var yearFrom    =  searchFieldset.items.items[2].items.items[0];
                    var yearTo      =  searchFieldset.items.items[2].items.items[1];
                    var archive     =  searchFieldset.items.items[3];
                    var prefix      =  searchFieldset.items.items[4].items.items[0];
                    var num         =  searchFieldset.items.items[4].items.items[1];
                    var suffix      =  searchFieldset.items.items[4].items.items[2];
                    var tbar = btn.up('toolbar');
                    var form = tbar.up('form');
                    var main = form.up('container');

                    switch(btn.action){
                        case 'clearSearchParm':
                            searchFieldset.items.items[0].reset();
                            searchFieldset.items.items[1].reset();
                            searchFieldset.items.items[2].items.each(function (item) {item.reset ()});
                            searchFieldset.items.items[3].reset();
                            searchFieldset.items.items[4].items.each(function (item) {item.reset ()});
                            break;
                        case 'backMain':
                            Ext.Msg.alert('Внимание', 'Переход в главное меню!');
                            break;
                        case 'quitSerch':
                            Ext.Ajax.request({
                                url: 'servlet/Auth',
                                params : {
                                    action:'logout'
                                },
                                success: function(action){
                                    var isSuccess = Ext.decode(action.responseText).success;
                                    var isMsg = Ext.decode(action.responseText).msg;
                                        main.removeAll();
                                        main.add(Ext.create('storeplaces.view.page.CLoginPage'));
                                        Ext.getStore('storeplaces.store.GridSearchOrgStore').removeAll();
                                },
                                failure : function(action) {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });
                            break;
                        case 'addOrg':
                            var FIO     = form.FIO.text;
                            var oldData = form.getForm().getValues();
                            main.removeAll();
                            var newForm = Ext.create('storeplaces.view.page.COrganizationPage');
                            newForm.FIO.setText(FIO);
                            newForm.oldData = oldData;
                            newForm.items.items[0].items.items[4].action = 'newCancel';
                            newForm.placesFieldSet.add(Ext.create('storeplaces.view.card.CStorePlace'));
                            main.add(newForm);
                            break;
                        case 'srchBtn':
                            if(Ext.getStore('storeplaces.store.GridSearchOrgStore').getCount() != 0)
                            {
                                Ext.getStore('storeplaces.store.GridSearchOrgStore').removeAll();
                            }
                            var iorgName = orgName.getRawValue();
                                if (iorgName=='') iorgName = null;
                            var idocumentType = documentType.getValue();
                            var iyearFrom= yearFrom.getRawValue();
                                if (iyearFrom=='') iyearFrom = null;
                            var iyearTo  = yearTo.getRawValue();
                                if (iyearTo=='') iyearTo = null;
                            var iarchive = archive.getValue();
                            var iprefix  = prefix.getRawValue();
                                 if (iprefix=='') iprefix = null;
                            var inum     = num.getValue();
                                if (inum=='') inum = null;
                            var isuffix  = suffix.getRawValue();
                                if (isuffix=='') isuffix = null; ;

                            var criteria = {'orgName':iorgName,
                                            'documentTypeId':idocumentType,
                                            'yearFrom': iyearFrom,
                                            'yearTo': iyearTo,
                                            'archiveId':iarchive,
                                            'fund': {'num':inum,'prefix':iprefix,'suffix':isuffix}
                                            };
                            this.searchCriteria =  criteria;
                            criteria = Ext.encode(criteria);
                            var gridSearchOrgStore  = Ext.getStore('storeplaces.store.GridSearchOrgStore');
                            var cardsStoreAll       = Ext.getStore('storeplaces.store.CardsStoreAll');
                            gridSearchOrgStore.getProxy().extraParams = {'criteria':criteria};
                            gridSearchOrgStore.load({ params:{
                                'criteria':criteria,
                                'start':0,
                                'limit':2
                            }});
                           gridSearchOrgStore.loadPage(1,{ params:{'start':0,'limit':2}});
                           cardsStoreAll.load({ params:{'criteria':criteria}});
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

