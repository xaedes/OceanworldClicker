define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var SightNode = Ash.Node.create({
        sight : Components.Sight,
        value : Components.Value,
    });

    return SightNode;
});