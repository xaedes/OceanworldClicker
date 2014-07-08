define([
    'ash',
    'game/entitycreator',    
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    Ash,
    EntityCreator,
    TickProvider,
    KeyPoll
) {

    var OceanworldClicker = Ash.Class.extend({
        engine: null,
        tickProvider: null,
        creator: null,

        constructor: function (gamewrapper) {
            this.engine = new Ash.Engine();

            this.creator = new EntityCreator(this.engine);

            this.tickProvider = new TickProvider(null);
        },

        start: function () {
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        }
    });

    return OceanworldClicker;
});
