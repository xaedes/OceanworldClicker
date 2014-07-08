define(['ash'], function (Ash) {
    var Display = Ash.Class.extend({
        format: null,
        constructor: function (format) {
            this.format = format;
        }
    });

    return Display;
});
