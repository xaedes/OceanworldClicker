define([
    'ash',
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    Ash,
    TickProvider,
    KeyPoll
) {

    var OceanworldClicker = Ash.Class.extend({
        engine: null,
        tickProvider: null,

        constructor: function (gamewrapper) {
            this.engine = new Ash.Engine();

            this.tickProvider = new TickProvider(null);
        },

        start: function () {
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        }
    });

    return OceanworldClicker;
});
