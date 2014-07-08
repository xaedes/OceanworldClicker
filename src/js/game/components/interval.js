define(['ash'], function (Ash) {
    var Interval = Ash.Class.extend({
        seconds: null,
        _handle: null,
        constructor: function (val) {
            this.seconds = val;
        }
    });

    return Interval;
});
