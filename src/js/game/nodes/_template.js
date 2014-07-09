define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var MaxNode = Ash.Node.create({
        max : Components.Max,
    });

    return MaxNode;
});
