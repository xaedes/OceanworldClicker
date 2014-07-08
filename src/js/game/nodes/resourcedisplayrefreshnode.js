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
        refresh : Components.Refresh
    }));

    return ResourceDisplayRefreshNode;
});
