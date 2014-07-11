define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var LifetimeNode = Ash.Node.create({
        lifetime : Components.Lifetime,
    });

    return LifetimeNode;
});
