define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var ProvidesSightNode = Ash.Node.create({
        providesSight : Components.ProvidesSight,
    });

    return ProvidesSightNode;
});
