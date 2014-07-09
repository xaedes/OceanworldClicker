define([
    'ash', 
    'game/components/components'   
], function (
    Ash, 
    Components
) {
    var LogMessageNode = Ash.Node.create({
        logMessage : Components.LogMessage,
    });

    return LogMessageNode;
});
