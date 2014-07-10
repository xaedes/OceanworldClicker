define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var GatherNode = Ash.Node.create({
        gather : Components.Gather,
        nearby : Components.Nearby,
        value : Components.Value,
    });

    return GatherNode;
});
