define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var ValueDisplayNode = Ash.Node.create({
        valueDisplay : Components.ValueDisplay,
        display : Components.Display,
    });

    return ValueDisplayNode;
});
