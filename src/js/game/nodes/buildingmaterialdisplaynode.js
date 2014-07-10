define([
    'ash',
    'game/components/components'       
], function (
    Ash,
    Components
) {
    var BuildingMaterialDisplayNode = Ash.Node.create({
        buildingMaterial : Components.BuildingMaterial,
        display : Components.Display,
        uid : Components.UID
    });

    return BuildingMaterialDisplayNode;
});
