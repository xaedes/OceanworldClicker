define([
    'ash',
    'game/components/components'       
], function (
    Ash,
    Components
) {
    var ResourceDisplayNode = Ash.Node.create({
        resource : Components.Resource,
        display : Components.Display,
        uid : Components.UID
    });

    return ResourceDisplayNode;
});
