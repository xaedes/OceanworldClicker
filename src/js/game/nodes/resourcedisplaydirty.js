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
    var ResourceDisplayDirty = Ash.Node.create($.extend({},ResourceDisplaySchema,{
        dirty : Components.Dirty
    }));

    return ResourceDisplayDirty;
});
