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
        uid : Components.UID
    };

    return ResourceDisplaySchema;
});
