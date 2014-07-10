define(['ash'], function (Ash) {
    var ValueDisplay = Ash.Class.extend({
        htmlContainerID: null,
        htmlInjectID: null, // in which element to inject the display html elements
        constructor: function (htmlContainerID, htmlInjectID) {
            this.htmlContainerID = htmlContainerID;
            this.htmlInjectID = htmlInjectID;
        }
    });

    return ValueDisplay;
});

// todo : don't forget to add this component to components.js
