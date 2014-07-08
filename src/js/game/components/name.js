define(['ash'], function (Ash) {
    var Name = Ash.Class.extend({
        name: null,
        constructor: function (n) {
            this.name = n;
        }
    });

    return Name;
});
