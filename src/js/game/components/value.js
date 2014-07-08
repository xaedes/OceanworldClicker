define(['ash'], function (Ash) {
    var Value = Ash.Class.extend({
        value: null,
        constructor: function (val) {
            this.value = val;
        }
    });

    return Value;
});
