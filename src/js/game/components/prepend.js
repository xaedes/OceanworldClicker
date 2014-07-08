define(['ash'], function (Ash) {
    var Prepend = Ash.Class.extend({
        prepend: null,
        constructor: function (n) {
            this.prepend = n;
        }
    });

    return Prepend;
});
