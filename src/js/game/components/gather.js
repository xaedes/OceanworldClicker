define(['ash'], function (Ash) {
    var Gather = Ash.Class.extend({
        amount: null,
        constructor: function (amount) {
            this.amount = amount;
        }
    });

    return Gather;
});

// todo : don't forget to add this component to components.js
