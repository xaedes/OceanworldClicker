define(['ash'], function (Ash) {
    var Rate = Ash.Class.extend({
        rate: null,
        constructor: function (val) {
            this.rate = val;
        }
    });

    return Rate;
});
