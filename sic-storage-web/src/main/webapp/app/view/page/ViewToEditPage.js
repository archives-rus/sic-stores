Ext.define('storeplaces.view.page.ViewToEditPage', {
    extend : 'storeplaces.view.page.COrganizationPage',
    initComponent : function() {
        this.toolbar.items.items[2].action = 'EditToView';
        this.callParent(arguments);

    }
});
