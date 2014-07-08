define([
    'ash',
    'jquery',
    'game/entitycreator',    
    'game/systems/resourcedisplaysystem',    
    'game/systems/cleanticksystem',    
    'game/systems/intervalsystem',    
    'game/systems/ratesystem',    
    'game/systems/systempriorities',    
    'game/components/components',    
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    Ash,
    $,
    EntityCreator,
    ResourceDisplaySystem,
    CleanTickSystem,
    IntervalSystem,
    RateSystem,
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

            this.tick = this.creator.createTickGenerator(1.0);

            this.engine.addSystem(
                new ResourceDisplaySystem(this.gamewrapper),
                SystemPriorities.only
            );
            this.engine.addSystem(
                new IntervalSystem(),
                SystemPriorities.only
            );
            this.engine.addSystem(
                new RateSystem(this.tick),
                SystemPriorities.only
            );
            this.engine.addSystem(
                new CleanTickSystem(),
                SystemPriorities.cleantick
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
