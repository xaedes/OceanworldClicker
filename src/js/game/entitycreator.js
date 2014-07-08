define([
    'ash',
    'game/components/display',
    'game/components/resource',
    'brejep/keyboard'
], function (
    Ash,
    Display,
    Resource,
    Keyboard
) {

    var EntityCreator = Ash.Class.extend({
        game: null,

        constructor: function (game) {
            this.game = game;
        },

        destroyEntity: function(entity) {
            this.game.removeEntity(entity);
        },

        createWaterResource: function() {
            var water = new Ash.Entity()
                .add(new Display())
                .add(new Resource())
                ;
            this.game.addEntity(water);
            return asteroid;
        },

    });

    return EntityCreator;
});
