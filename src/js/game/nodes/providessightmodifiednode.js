define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var ProvidesSightModifiedNode = Ash.Node.create({
        providesSight : Components.ProvidesSight,
        modified : Components.Modified,
    });

    return ProvidesSightModifiedNode;
});
