define([
    'ash', 
    'game/nodes/resourcedisplayschema'
], function (
    Ash, 
    ResourceDisplaySchema
) {
    var ResourceDisplayNode = Ash.Node.create(ResourceDisplaySchema);

    return ResourceDisplayNode;
});
