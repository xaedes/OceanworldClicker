define([
    'ash', 
    'game/nodes/resourcedisplayschema'
], function (
    Ash, 
    ResourceDisplaySchema
) {
    var ResourceDisplay = Ash.Node.create(ResourceDisplaySchema);

    return ResourceDisplay;
});
