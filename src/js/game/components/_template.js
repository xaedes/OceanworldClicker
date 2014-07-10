define(['ash'], function (Ash) {
    var TEMPLATE = Ash.Class.extend({
        VALUE: null,
        constructor: function (VALUE) {
            this.VALUE = VALUE;
        }
    });

    return TEMPLATE;
});

// todo : don't forget to add this component to components.js
