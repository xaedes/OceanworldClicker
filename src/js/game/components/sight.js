define(['ash'], function (Ash) {
    var Sight = Ash.Class.extend({
        sight: null,
        constructor: function (sight) {
            this.sight = sight;
        }
    });

    return Sight;
});

// todo : don't forget to add this component to components.js
