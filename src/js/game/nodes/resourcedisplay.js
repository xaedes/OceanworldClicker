define([
    'ash', 
    'game/components/resource', 
    'game/components/display', 
    'game/components/uid',
    'game/components/value',
    'game/components/max',
    'game/components/name',
    'game/components/dirty'
], function (
    Ash, 
    Resource, 
    Display, 
    UID,
    Value,
    Max,
    Name,
    Dirty
) {
    var ResourceDisplay = Ash.Node.create({
        resource : Resource,
        display : Display,
        uid : UID,
        value : Value,
        max : Max,
        name : Name,
        dirty : Dirty,
    });

    return ResourceDisplay;
});
