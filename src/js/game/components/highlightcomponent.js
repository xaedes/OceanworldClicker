define(['ash'], function (Ash) {
    var HighlightComponent = Ash.Class.extend({
        entity: null,
        ComponentClass: null,
        constructor: function (entity,ComponentClass) {
            this.entity = entity;
            this.ComponentClass = ComponentClass;
        }
    });

    return HighlightComponent;
});

// todo : don't forget to add this component to components.js
