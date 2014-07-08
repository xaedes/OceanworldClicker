define([
    'ash',
    'jquery',
    'game/entitycreator',    
    'game/systems/resourcedisplaysystem',    
    'game/systems/systempriorities',    
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    Ash,
    $,
    EntityCreator,
    ResourceDisplaySystem,
    SystemPriorities,
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

            this.creator = new EntityCreator(this.engine);

            this.engine.addSystem(
                new ResourceDisplaySystem(this.gamewrapper),
                SystemPriorities.only
            );

            this.creator.createWaterResource();

            this.tickProvider = new TickProvider(null);
        },

        start: function () {
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        }
    });

    return OceanworldClicker;
});
