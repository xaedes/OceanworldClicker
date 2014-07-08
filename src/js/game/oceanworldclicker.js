define([
    'ash',
    'jquery',
    'game/entitycreator',    
    'game/systems/resourcedisplaysystem',    
    'game/systems/systempriorities',    
    'game/components/components',    
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    Ash,
    $,
    EntityCreator,
    ResourceDisplaySystem,
    SystemPriorities,
    Components,
    TickProvider,
    KeyPoll
) {

    var OceanworldClicker = Ash.Class.extend({
        engine: null,
        tickProvider: null,
        creator: null,
        gamewrapper: null,

        constructor: function (gamewrapper) {
            this.engine = new Ash.Engine();
            this.gamewrapper = $(gamewrapper);

            this.Components = Components;
            this.creator = new EntityCreator(this.engine);

            this.engine.addSystem(
                new ResourceDisplaySystem(this.gamewrapper),
                SystemPriorities.only
            );

            this.water = this.creator.createWaterResource();
            this.population = this.creator.createPopulationResource();
            this.sight = this.creator.createSightResource();

            this.tickProvider = new TickProvider(null);
        },

        start: function () {
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        }
    });

    return OceanworldClicker;
});
