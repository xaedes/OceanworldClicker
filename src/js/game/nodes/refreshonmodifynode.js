define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var RefreshOnModifyNode = Ash.Node.create({
        refreshOnModify : Components.RefreshOnModify,
        modified : Components.Modified,
    });

    return RefreshOnModifyNode;
});
