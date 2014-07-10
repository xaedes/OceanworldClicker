define(['ash'], function (Ash) {
    var CSSClass = Ash.Class.extend({
        cssClass: null,
        constructor: function (cssClass) {
            this.cssClass = cssClass;
        }
    });

    return CSSClass;
});

// todo : don't forget to add this component to components.js
