define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var RateNode = Ash.Node.create({
        rate : Components.Rate,
        value : Components.Value
    });

    return RateNode;
});