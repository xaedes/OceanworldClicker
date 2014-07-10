define(['ash'], function (Ash) {
    var ProvidesSight = Ash.Class.extend({
        amount: null,
        constructor: function (amount) {
            this.amount = amount;
        }
    });

    return ProvidesSight;
});

// todo : don't forget to add this component to components.js
