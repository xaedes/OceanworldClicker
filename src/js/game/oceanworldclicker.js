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
    'game/systems/valuedisplaysystem',    
    'game/systems/buildingmaterialdisplaysystem',    
    'game/systems/gathersystem',    
    'game/systems/swimaroundsystem',    
    'game/systems/sightsystem',    

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
    ValueDisplaySystem,
    BuildingMaterialDisplaySystem,
    GatherSystem,
    SwimAroundSystem,
    SightSystem,

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
            this.tick.add(new Components.IntervalTick());
            
            this.water = this.creator.createWaterResource();
            this.population = this.creator.createPopulationResource();
            this.sight = this.creator.createSightResource();
            this.plastic = this.creator.createPlasticBuildingMaterial();
            this.planks = this.creator.createPlanksBuildingMaterial();

            this.ship = this.creator.createShip();

            this.engine.addSystem( new SightSystem(),                                   SystemPriorities.only);
            this.engine.addSystem( new ResourceDisplaySystem(this.gamewrapper),         SystemPriorities.only);
            this.engine.addSystem( new BuildingMaterialDisplaySystem(this.gamewrapper), SystemPriorities.only);
            this.engine.addSystem( new IntervalSystem(),                                SystemPriorities.only);
            this.engine.addSystem( new RateSystem(),                                    SystemPriorities.only);
            this.engine.addSystem( new GatherSystem(),                                  SystemPriorities.only);
            this.engine.addSystem( new LogSystem(this.creator),                         SystemPriorities.only);
            this.engine.addSystem( new MaxSystem(),                                     SystemPriorities.contraints);
            this.engine.addSystem( new RefreshOnModifySystem(),                         SystemPriorities.refreshonmodify);
            this.engine.addSystem( new SwimAroundSystem(this),                          SystemPriorities.swim);
            this.engine.addSystem( new ValueDisplaySystem(),                            SystemPriorities.display);
            this.engine.addSystem( new CleanTickSystem(),                               SystemPriorities.cleantick);
            this.engine.addSystem( new SaveGameSystem(this.creator),                    SystemPriorities.cleantick);


            this.tickProvider = new TickProvider(null);

            // export to window
            window.owc = this;
            window.log = _.bind(this.log, this);
            window.save = _.bind(this.save, this);
            window.load = _.bind(this.load, this);
            window.gather = _.bind(this.gather, this);
            window.swim = _.bind(this.swim, this);
        },
        swim: function () {
            if(!this.ship.has(Components.SwimAround))
                this.ship.add(new Components.SwimAround());
        },
        gather: function (entity, amount) {
            if(entity.has(Components.Gather)) {
                amount += entity.get(Components.Gather).amount;
                entity.remove(Components.Gather);
            } 
            entity.add(new Components.Gather(amount));
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
