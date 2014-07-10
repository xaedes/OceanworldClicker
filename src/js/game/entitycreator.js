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

        createBuildingMaterial: function(addEntity,value,name,caption,format) {
            var uid = new Components.UID();
            var entity = new Ash.Entity()
                .add(new Components.Display(format))
                .add(new Components.BuildingMaterial())
                .add(uid)
                .add(new Components.Value(value))
                .add(new Components.Nearby(10))
                .add(new Components.Name(name))
                .add(new Components.Caption(caption))
                .add(new Components.Refresh())
                .add(new Components.RefreshOnModify())
                .add(new Components.StoreInSaveGame(name,[Components.Value, Components.Nearby]))
                ;
            if(addEntity){
                this.game.addEntity(entity);
            }
            return entity;
        },
        createResource: function(addEntity,value,name,caption,format) {
            var uid = new Components.UID();
            var entity = new Ash.Entity()
                .add(new Components.Display(format))
                .add(new Components.Resource())
                .add(uid)
                .add(new Components.Value(value))
                .add(new Components.Name(name))
                .add(new Components.Caption(caption))
                .add(new Components.Refresh())
                .add(new Components.RefreshOnModify())
                .add(new Components.StoreInSaveGame(name,[Components.Value]))
                ;
            if(addEntity){
                this.game.addEntity(entity);
            }
            return entity;
        },
        createSightResource: function() {
            var entity = this.createResource(false,0,"sight","Sight","%d")
                .add(new Components.Prepend("ca. "))
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createWaterResource: function() {
            var entity = this.createResource(false,0,"water","Drinkable Water","%.2f")
                .add(new Components.Max(10))
                .add(new Components.Rate(1.5))
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createPopulationResource: function() {
            var entity = this.createResource(false,0,"population","Population","%d")
                .add(new Components.Max(10))
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createPlasticBuildingMaterial: function() {
            var entity = this.createBuildingMaterial(false,0,"plastic","Plastic","%d")
                .add(new Components.Max(10))
                .add(new Components.CSSClass("plastic"))
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createPlanksBuildingMaterial: function() {
            var entity = this.createBuildingMaterial(false,0,"planks","Planks","%d")
                .add(new Components.Max(10))
                .add(new Components.CSSClass("planks"))
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createTickGenerator: function(interval) {
            var entity = new Ash.Entity()
                .add(new Components.Interval(interval))
                .add(new Components.RateTick())
                .add(new Components.CleanTick())
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createSaveOrder: function() {
            var entity = new Ash.Entity()
                .add(new Components.SaveOrder())
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createLoadOrder: function() {
            var entity = new Ash.Entity()
                .add(new Components.LoadOrder())
                ;
            this.game.addEntity(entity);
            return entity;
        },
        createLogMsg: function(msg) {
            var entity = new Ash.Entity()
                .add(new Components.LogMessage(msg))
                ;
            this.game.addEntity(entity);
            return entity;            
        },
        createShip: function() {
            var entity = new Ash.Entity()
                ;
            this.game.addEntity(entity);
            return entity;
        }

    });

    return EntityCreator;
});
