define(['ash'], function (Ash) {
    var Caption = Ash.Class.extend({
        caption: null,
        constructor: function (n) {
            this.caption = n;
        }
    });

    return Caption;
});
