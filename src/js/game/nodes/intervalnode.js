define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var IntervalNode = Ash.Node.create({
        interval : Components.Interval
    });

    return IntervalNode;
});
