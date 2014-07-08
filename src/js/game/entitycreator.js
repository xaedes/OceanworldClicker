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

        createResource: function(addEntity,value,name,format) {
            var resource = new Ash.Entity()
                .add(new Components.Display(format))
                .add(new Components.Resource())
                .add(new Components.UID())
                .add(new Components.Value(value))
                .add(new Components.Name(name))
                .add(new Components.Refresh())
                ;
            if(addEntity){
                this.game.addEntity(resource);
            }
            return resource;
        },
        createSightResource: function() {
            var resource = this.createResource(false,0,"Sight","%d")
                .add(new Components.Prepend("ca. "))
                ;
            this.game.addEntity(resource);
            return resource;
        },
        createWaterResource: function() {
            var resource = this.createResource(false,0,"Drinkable Water","%.2f")
                .add(new Components.Max(10))
                .add(new Components.Rate(0.5))
                ;
            this.game.addEntity(resource);
            return resource;
        },
        createPopulationResource: function() {
            var resource = this.createResource(false,0,"Population","%d")
                .add(new Components.Max(10))
                ;
            this.game.addEntity(resource);
            return resource;
        },

    });

    return EntityCreator;
});
