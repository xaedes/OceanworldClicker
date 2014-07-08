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
    var ResourceDisplayRefreshNode = Ash.Node.create($.extend({},ResourceDisplaySchema,{
        dirty : Components.Refresh
    }));

    return ResourceDisplayRefreshNode;
});
