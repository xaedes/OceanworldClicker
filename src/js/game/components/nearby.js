define(['ash'], function (Ash) {
    var Nearby = Ash.Class.extend({
        nearby: null,
        constructor: function (nearby) {
            this.nearby = nearby;
        }
    });

    return Nearby;
});

// todo : don't forget to add this component to components.js
