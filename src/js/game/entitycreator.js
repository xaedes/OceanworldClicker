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

        createResource: function(value,max,name,format) {
            var resource = new Ash.Entity()
                .add(new Components.Display(format))
                .add(new Components.Resource())
                .add(new Components.UID())
                .add(new Components.Value(value))
                .add(new Components.Max(max))
                .add(new Components.Name(name))
                .add(new Components.Dirty())
                ;
            
            this.game.addEntity(resource);
            return resource;
        },
        createWaterResource: function() {
            var water = this.createResource(0,10,"Drinkable Water","%.2f");
            return water;
        },
        createPopulationResource: function() {
            var pop = this.createResource(0,10,"Population","%d");
            return pop;
        },

    });

    return EntityCreator;
});
