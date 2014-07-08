define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var RateTickNode = Ash.Node.create({
        interval : Components.Interval,
        intervalTick : Components.IntervalTick,
        rateTick : Components.RateTick
    });

    return RateTickNode;
});
