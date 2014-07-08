define([
    'ash',
    'game/components/display',
    'game/components/resource',
    'game/components/uid',
    'game/components/value',
    'game/components/max',
    'game/components/name',
    'game/components/dirty',
    'brejep/keyboard'
], function (
    Ash,
    Display,
    Resource,
    UID,
    Value,
    Max,
    Name,
    Dirty,
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
                .add(new UID())
                .add(new Value(0))
                .add(new Max(10))
                .add(new Name("Drinkable Water"))
                .add(new Dirty())
                ;
            this.game.addEntity(water);
            return water;
        },

    });

    return EntityCreator;
});
