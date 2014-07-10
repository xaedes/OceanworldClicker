define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var SwimAroundNode = Ash.Node.create({
        swimAround : Components.SwimAround,
    });

    return SwimAroundNode;
});
