define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var LoadOrderNode = Ash.Node.create({
        loadOrder : Components.LoadOrder
    });

    return LoadOrderNode;
});
