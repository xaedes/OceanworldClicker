define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var IntervalTickNode = Ash.Node.create({
        interval : Components.Interval
        intervalTick : Components.IntervalTick
    });

    return IntervalTickNode;
});
