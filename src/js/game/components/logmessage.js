define(['ash'], function (Ash) {
    var LogMessage = Ash.Class.extend({
        msg: null,
        constructor: function (n) {
            this.msg = n;
        }
    });

    return LogMessage;
});
