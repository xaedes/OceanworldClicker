define([
    'game/components/dirty',
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
    Dirty,
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
        Dirty: Dirty,
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
