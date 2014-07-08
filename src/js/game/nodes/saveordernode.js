define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var SaveOrderNode = Ash.Node.create({
        saveOrder : Components.SaveOrder
    });

    return SaveOrderNode;
});
