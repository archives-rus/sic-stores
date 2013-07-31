Ext.define('storeplaces.view.lib.NumFond',{
    extend:'Ext.form.FieldContainer',
    fieldLabel: 'Номер фонда',
    labelWidth: 200,
    width:330,
    defaultType: 'textfield',
    layout: 'hbox',
    items:[
        {
            flex: 1,
            name: 'firstName'
        },
        {
            flex: 2,
            name: 'secondName'
        },
        {
            flex: 1,
            name: 'thirdName'
        }
    ]
});

