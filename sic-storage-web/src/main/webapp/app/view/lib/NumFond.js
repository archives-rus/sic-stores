Ext.define('storeplaces.view.lib.NumFond',{
    extend:'Ext.form.FieldContainer',
    fieldLabel: '№ фонда',
    labelWidth: 70,
    width:310,
    defaultType: 'textfield',
    layout: 'hbox',
    items:[
        {
            flex: 1,
            name: 'firstName',
            width:50
        },
        {
            flex: 2,
            name: 'secondName',
            width:90
        },
        {
            flex: 1,
            name: 'thirdName',
            width:50
        }
    ]
});

