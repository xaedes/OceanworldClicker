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
        Prepend: Prepend
    };

    return Components;
});
