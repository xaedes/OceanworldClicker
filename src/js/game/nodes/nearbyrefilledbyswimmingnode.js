define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var NearbyRefilledBySwimmingNode = Ash.Node.create({
        nearby : Components.Nearby,
        nearbyRefilledBySwimming : Components.NearbyRefilledBySwimming,
    });

    return NearbyRefilledBySwimmingNode;
});
