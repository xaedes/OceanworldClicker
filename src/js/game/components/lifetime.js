define(['ash'], function (Ash) {
    var Lifetime = Ash.Class.extend({
        seconds: null,
        _timeout_handle: null,
        constructor: function (seconds) {
            this.seconds = seconds;
        }
    });

    return Lifetime;
});

// todo : don't forget to add this component to components.js
