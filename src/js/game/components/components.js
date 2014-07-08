define([
    'game/components/refresh',
    'game/components/display',
    'game/components/max',
    'game/components/name',
    'game/components/resource',
    'game/components/uid',
    'game/components/value',
    'game/components/rate',
    'game/components/prepend',
    'game/components/interval',
    'game/components/intervaltick',
    'game/components/ratetick',
    'game/components/cleantick',
    'game/components/modified',
    'ash'
], function (
    Refresh,
    Display,
    Max,
    Name,
    Resource,
    UID,
    Value,
    Rate,
    Prepend,
    Interval,
    IntervalTick,
    RateTick,
    CleanTick,
    Modified,
    Ash
) {
    var Components = {
        Refresh: Refresh,
        Display: Display,
        Max: Max,
        Name: Name,
        Resource: Resource,
        UID: UID,
        Value: Value,
        Rate: Rate,
        Prepend: Prepend,
        Interval: Interval,
        IntervalTick: IntervalTick,
        RateTick: RateTick,
        CleanTick: CleanTick,
        Modified: Modified,
    };

    return Components;
});
