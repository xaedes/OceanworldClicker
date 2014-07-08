define([
    'ash', 
    'game/components/components'
], function (
    Ash, 
    Components
) {
    var ResourceDisplaySchema = {
        resource : Components.Resource,
        display : Components.Display,
        uid : Components.UID,
        value : Components.Value,
        max : Components.Max,
        name : Components.Name
    };

    return ResourceDisplaySchema;
});
