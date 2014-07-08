define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var CleanTickNode = Ash.Node.create({
        intervalTick : Components.IntervalTick,
        cleanTick : Components.CleanTick,
    });

    return CleanTickNode;
});
