Ext.define('storeplaces.controller.OrgPageFunc',{
    extend:'Ext.app.Controller',
    refs:[
        {
            ref:'page',
            selector:'viewport > container > corgpage'
        }],
    init : function() {

    },
    onLaunch:function(){
    },
    moveNext:function(id){
        //var tb = btn.up('toolbar');
        var form =  this.getPage();
        var main =  form.up('container');

        var oldData = form.oldData;
        var FIO     = form.FIO.text;
        main.removeAll();

        var myOrgPage       = Ext.create('storeplaces.view.page.COrganizationPageView');
        myOrgPage.oldData   = oldData;
        myOrgPage.idCard    = id;
        myOrgPage.FIO.setText(FIO);
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
                        pc : placeCard,
                        success: function(action, opts){
                            var placeCard = opts.pc;
                            var massStorage = Ext.decode(action.responseText);
                            placeCard.docGrid.getStore().loadData(massStorage);
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
});


