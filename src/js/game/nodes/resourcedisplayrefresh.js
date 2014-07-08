define([
    'ash', 
    'jquery', 
    'game/nodes/resourcedisplayschema', 
    'game/components/components',
], function (
    Ash, 
    $,
    ResourceDisplaySchema,
    Components
) {
    var ResourceDisplayRefresh = Ash.Node.create($.extend({},ResourceDisplaySchema,{
        dirty : Components.Refresh
    }));

    return ResourceDisplayRefresh;
});
