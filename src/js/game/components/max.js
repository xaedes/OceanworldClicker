define(['ash'], function (Ash) {
    var Max = Ash.Class.extend({
        max: null,
        constructor: function (m) {
            this.max = m;
        }
    });

    return Max;
});
