define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var HighlightComponentNode = Ash.Node.create({
        highlightComponent : Components.HighlightComponent,
    });

    return HighlightComponentNode;
});
