define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var MaxNode = Ash.Node.create({
        value : Components.Value,
        max : Components.Max,
        modified : Components.Modified,
    });

    return MaxNode;
});
