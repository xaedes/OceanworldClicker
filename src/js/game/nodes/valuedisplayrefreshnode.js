define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var ValueDisplayRefreshNode = Ash.Node.create({
        valueDisplay : Components.ValueDisplay,
        display : Components.Display,
        refresh : Components.Refresh,
    });

    return ValueDisplayRefreshNode;
});
