define([
    'ash',
    'jquery',
    'underscore',
    'game/entitycreator',    
    'game/systems/resourcedisplaysystem',    
    'game/systems/cleanticksystem',    
    'game/systems/intervalsystem',    
    'game/systems/ratesystem',    
    'game/systems/maxsystem',    
    'game/systems/savegamesystem',    
    'game/systems/refreshonmodifysystem',    
    'game/systems/logsystem',    
    'game/systems/systempriorities',    
    'game/components/components',    
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    Ash,
    $,
    _,
    EntityCreator,
    ResourceDisplaySystem,
    CleanTickSystem,
    IntervalSystem,
    RateSystem,
    MaxSystem,
    SaveGameSystem,
    RefreshOnModifySystem,
    LogSystem,
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
                new RateSystem(),
                SystemPriorities.only
            );
            this.engine.addSystem(
                new MaxSystem(),
                SystemPriorities.contraints
            );
            this.engine.addSystem(
                new RefreshOnModifySystem(),
                SystemPriorities.refreshonmodify
            );
            this.engine.addSystem(
                new CleanTickSystem(),
                SystemPriorities.cleantick
            );
            this.engine.addSystem(
                new SaveGameSystem(this.creator),
                SystemPriorities.cleantick
            );
            this.engine.addSystem(
                new LogSystem(this.creator),
                SystemPriorities.only
            );

            this.water = this.creator.createWaterResource();
            this.population = this.creator.createPopulationResource();
            this.sight = this.creator.createSightResource();

            this.tickProvider = new TickProvider(null);

            // export to window
            var self = this;
            window.log = _.bind(self.log, this);
            window.save = _.bind(self.save, this);
            window.load = _.bind(self.load, this);
        },

        save: function () {
            this.creator.createSaveOrder();
        },
        
        load: function () {
            this.creator.createLoadOrder();
        },

        start: function () {
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        },

        log: function(msg) {
            this.creator.createLogMsg(msg);
        }
    });

    // For the time now
    // http://stackoverflow.com/a/10211214/798588
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }

    return OceanworldClicker;
});
