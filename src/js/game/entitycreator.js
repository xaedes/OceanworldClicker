define([
    'ash',
    'game/components/components',
    'brejep/keyboard'
], function (
    Ash,
    Components,
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
                .add(new Components.Display())
                .add(new Components.Resource())
                .add(new Components.UID())
                .add(new Components.Value(0))
                .add(new Components.Max(10))
                .add(new Components.Name("Drinkable Water"))
                .add(new Components.Dirty())
                ;
            this.game.addEntity(water);
            return water;
        },

    });

    return EntityCreator;
});
