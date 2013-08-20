Ext.define('storeplaces.controller.OrgPageController',{
	extend:'Ext.app.Controller',
	refs:[
	{
		ref:'page',
		selector:'viewport > container > corgpage'
	}
	],
    getMainContainer:function(){
        var tb = btn.up('maintb');
        var form = tb.up('form');
        var main = form.up('container');
        return main;
    },
	init:function(){
		this.control({
			'button':{
				click:function(btn,eventObj){
                    if (btn.action == 'srchFund')
                        {
                           var numFund  = btn.up('fieldcontainer');
                           var fs       = numFund.up('fieldset');
                           var main     = fs.up('container');
                        }
                    else if(btn.action == 'deleteCard')
                        {
                            var form = btn.up('form');
                            this.getPage().placesFieldSet.remove(form);
                        }
                    else if(btn.id != 'button-1005')
                        {
                            var tb = btn.up('toolbar');
                            var form = tb.up('form');
                            var main = form.up('container');
                        }
					switch(btn.action){
						case 'addStorePlace':
							var place = Ext.create('storeplaces.view.card.CStorePlace');
							this.getPage().placesFieldSet.add(place);
                            break;
                        case 'namesGridAdd':
                            this.getPage().orgStore.insert(0, Ext.create('storeplaces.model.OrganizationName'));
                            break;
                        case 'quit':
                            main.removeAll();
                            main.add(Ext.create('storeplaces.view.page.CLoginPage'));
                            break;
                        case 'orgCardDelete':
                            if (this.getPage().orgStore.getCount()==0)
                            {
                                alert('Организация не выбрана!');
                                break;
                            }
                            var id = this.getPage().orgStore.getAt(0).get('id');
                            alert('Удаляем организацию с айди ' + id);
                           /* Ext.Ajax.request({
                                url: 'servlet/DeleteOrganization',
                                params : {
                                    id:id
                                },
                                success: function(action){
                                    var success = Ext.decode(action.responseText).success;
                                    main.removeAll();
                                    main.add(Ext.create('storeplaces.view.page.COrganizationPage'));
                                },
                                failure : function() {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });*/
                            break;
                        case 'orgCardAdd':
                            main.removeAll();
                            var newOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
                            newOrgPage.placesFieldSet.add(Ext.create('storeplaces.view.card.CStorePlace'));
                            main.add(newOrgPage);
                            break;
                        case 'backSrchResult':
                            var oldData = form.oldData;
                            main.removeAll();
                            var oldSrchPage = Ext.create('storeplaces.view.page.CSearchPage');
                            oldSrchPage.getForm().setValues(oldData);
                            oldSrchPage.FIO.setText(form.FIO.text);
                            main.add(oldSrchPage);
                            break;
                        case 'orgCardView':
                            var values = form.getForm().getValues();
                            main.removeAll();
                            var OrgViewPage = Ext.create('storeplaces.view.page.COrganizationPageView');
                            OrgViewPage.getForm().setValues(values);
                            var archive = OrgViewPage.fundFieldset.items.items[0];
                            var fundNum = OrgViewPage.fundFieldset.items.items[2];
                            main.add(OrgViewPage);
                            break;
                        case 'orgCardCancel':
                        case 'orgCardEdit':
                            var id = form.orgStore.getAt(0).get('id');
                            var FIO = form.FIO.text;
                            main.removeAll();
                            var myEditOrgPage = Ext.create('storeplaces.view.page.COrganizationPage');
                            myEditOrgPage.FIO.setText(FIO);
                            Ext.Ajax.request({
                                url: 'servlet/QueryOrgNames',
                                params : {
                                    id:id
                                },
                                success: function(action){
                                    var massStore = Ext.decode(action.responseText);
                                    myEditOrgPage.orgStore.loadData(massStore);

                                },
                                failure : function() {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });
                            Ext.Ajax.request({
                                url: 'servlet/QueryOrganization',
                                params : {
                                    id:id,
                                    mode:'EDIT'
                                },
                                success: function(action){
                                    var dataArray = Ext.decode(action.responseText);
                                    var archiveId = Ext.decode(action.responseText).archiveId;

                                    var fundId= Ext.decode(action.responseText).fund.id;
                                    var fundNum= Ext.decode(action.responseText).fund.num;
                                    var fundPrefix= Ext.decode(action.responseText).fund.prefix;
                                    var fundSuffix= Ext.decode(action.responseText).fund.suffix;
                                    var fundName= Ext.decode(action.responseText).fund.name;
                                    var fundDates= Ext.decode(action.responseText).fund.dates;

                                    var storage = Ext.decode(action.responseText).storage;

                                    var businessTripsInfo = Ext.decode(action.responseText).businessTripsInfo;
                                    var rewardsInfo= Ext.decode(action.responseText).rewardsInfo;
                                    var notes = Ext.decode(action.responseText).notes;
                                    var userName = Ext.decode(action.responseText).userName;
                                    var lastUpdateDate = Ext.decode(action.responseText).lastUpdateDate;

                                    var myArchive               =  myEditOrgPage.fundFieldset.items.items[0];
                                    var myFundName              =  myEditOrgPage.fundFieldset.items.items[1];
                                    var myFundPrefix            =  myEditOrgPage.fundFieldset.items.items[2].items.items[0];
                                    var myFundNum               =  myEditOrgPage.fundFieldset.items.items[2].items.items[1];
                                    var myFundSuffix            =  myEditOrgPage.fundFieldset.items.items[2].items.items[2];
                                    var myDates                 =  myEditOrgPage.fundFieldset.items.items[3];
                                    var myBusinessTripsInfo     =  myEditOrgPage.areaFieldSets.items.items[0];
                                    var myRewardsInfo           =  myEditOrgPage.areaFieldSets.items.items[1];
                                    var myNotes                 =  myEditOrgPage.areaFieldSets.items.items[2];
                                    var myUserName              =  myEditOrgPage.tfUser;
                                    var myLastUpdateDate        =  myEditOrgPage.tfDateOfEdit;

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

                                    for(var i=0; i<storage.length; i++)
                                    {
                                        var idPlace =storage[i].id;   // id места хранения документов

                                        var archInId    = storage[i].archStrg.id; // id места хранения в архиве
                                        var archId   = storage[i].archStrg.archiveId; //id архива(второй комбо снизу)
                                        var archAddress = storage[i].archStrg.address
                                        var archPhone   = storage[i].archStrg.phone

                                        var orgNamePlace =storage[i].orgName;
                                        var addressPlace =storage[i].address;
                                        var phonePlace =storage[i].phone;
                                        var documentCountPlace =storage[i].documentCount;
                                        var beginYearPlace =storage[i].beginYear;
                                        var endYearPlace =storage[i].endYear;
                                        var contentsPlace =storage[i].contents;

                                        var placeCard = Ext.create('storeplaces.view.card.CStorePlace');
                                        placeCard.tfPhone.setDisabled(false);
                                        placeCard.nfCount.setDisabled(false);
                                        placeCard.yearInterval.setDisabled(false);
                                        placeCard.yearInterval.items.items[1].setDisabled(false);
                                        placeCard.yearInterval.items.items[2].setDisabled(false);
                                        if  (archId=='' || archId==null)
                                        {
                                            placeCard.cbStorageType.setValue(2);
                                            placeCard.taOrg.setVisible(true);
                                            placeCard.taOrg.setValue(orgNamePlace);
                                            placeCard.tfAddr.setValue(addressPlace);
                                            placeCard.taOrg.setDisabled(false);
                                            placeCard.tfAddr.setDisabled(false);

                                        }
                                        else
                                        {
                                            placeCard.cbStorageType.setValue(1);
                                            placeCard.cbArchive.setVisible(true);
                                            placeCard.cbArchive.setValue(archId)
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
                                            params : {
                                                storageId:idPlace,
                                                mode:'EDIT'
                                            },
                                            success: function(action){
                                                var massStorage = Ext.decode(action.responseText);
                                                placeCard.docsWriteStore.loadData(massStorage);

                                            },
                                            failure : function() {
                                                Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                            }
                                        });
                                        myEditOrgPage.placesFieldSet.add(placeCard);
                                    }


                                },
                                failure : function() {
                                    Ext.Msg.alert('Ошибка', 'Ошибка базы данных!');
                                }
                            });
                            main.add(myEditOrgPage);
                            break;
                        case 'srchFund':
                            var archiveId   = fs.items.items[0].getValue();
                            var num         = numFund.items.items[1].getRawValue();
                            var prefix      = numFund.items.items[0].getRawValue();
                            var suffix      = numFund.items.items[2].getRawValue();
                            if (archiveId=='' || archiveId==null || num=='' || prefix=='' || suffix=='')
                            {
                                alert('Введите архив и номер фонда!');
                                break;
                            }
                                if (prefix =='') prefix=null;
                                if (suffix =='') suffix=null;
                                num = parseInt(num);

                            var fund = { 'num':num,'prefix':prefix,'suffix':suffix};
                                fund = Ext.encode(fund);
                            var nameFund = fs.items.items[1];
                            var datesFund = fs.items.items[3];

                            Ext.Ajax.request({
                                url: 'servlet/QueryFundInfo',
                                params : {
                                    'archiveId':archiveId,
                                    'fund':fund
                                },
                                success: function(action){
                                    var isFound  = Ext.decode(action.responseText).found;
                                    if (isFound==false)
                                    {
                                        alert('Фонда не найдены!');
                                        nameFund.enable();
                                        datesFund.enable();
                                    }
                                    else
                                    {
                                        var isName   = Ext.decode(action.responseText).fund.name;
                                        var isId     = Ext.decode(action.responseText).fund.id;
                                        var isNum    = Ext.decode(action.responseText).fund.num;
                                        var isPrefix = Ext.decode(action.responseText).fund.prefix;
                                        var isSuffix = Ext.decode(action.responseText).fund.suffix;
                                        var isDates  = Ext.decode(action.responseText).fund.dates;
                                        nameFund.setValue(isName);
                                        datesFund.setValue(isDates);
                                        nameFund.enable();
                                        datesFund.enable();
                                    }
                                },
                                failure : function(action) {
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
	}
});