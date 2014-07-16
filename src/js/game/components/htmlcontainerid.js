define(['ash'], function (Ash) {
    var HTMLContainerID = Ash.Class.extend({
        containerID: null,
        constructor: function (containerID) {
            this.containerID = containerID;
        }
    });

    return HTMLContainerID;
});

// todo : don't forget to add this component to components.js
