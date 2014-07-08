define(['ash'], function (Ash) {
    var counter = 0;
    var UID = Ash.Class.extend({
        uid: null,

        constructor: function () {
            this.uid = counter++;
        }
    });

    return UID;
});
