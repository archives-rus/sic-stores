Ext.define('storeplaces.view.page.EditToViewPage', {
    extend : 'storeplaces.view.page.COrganizationPageView',
    initComponent : function() {
       this.toolbar.items.items[1].action = 'ViewToEdit';

       this.callParent(arguments);

    }
});
