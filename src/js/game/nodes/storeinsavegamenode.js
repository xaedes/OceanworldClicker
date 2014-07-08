define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var StoreInSaveGameNode = Ash.Node.create({
        storeInSaveGame : Components.StoreInSaveGame
    });

    return StoreInSaveGameNode;
});
