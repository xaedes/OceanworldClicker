define([
    'ash', 
    'game/nodes/saveordernode', 
    'game/nodes/loadordernode', 
    'game/nodes/storeinsavegamenode', 
    'game/components/components',
    'lzstring', 
    'jquery', 
    'underscore', 
    'sprintf'
], function (Ash, SaveOrderNode, LoadOrderNode, StoreInSaveGameNode, Components, LZString, $, _, sp) {
    var SaveGameSystem = Ash.System.extend({
        creator: null,
        saveOrderNodes: null,
        loadOrderNodes: null,
        storeInSaveGameNodes: null,

        constructor: function (creator) {
            this.creator = creator;
            console.log(LZString);
            return this;
        },

        addToEngine: function (engine) {
            this.saveOrderNodes = engine.getNodeList(SaveOrderNode);
            for(var node = this.saveOrderNodes.head; node; node = node.next) {
                this.addSaveNode(node);
            }
            this.saveOrderNodes.nodeAdded.add(this.addSaveNode, this);

            this.loadOrderNodes = engine.getNodeList(LoadOrderNode);
            for(var node = this.loadOrderNodes.head; node; node = node.next) {
                this.addLoadNode(node);
            }
            this.loadOrderNodes.nodeAdded.add(this.addLoadNode, this);

            this.storeInSaveGameNodes = engine.getNodeList(StoreInSaveGameNode);
        },

        removeFromEngine: function (engine) {
            this.saveOrderNodes = null;
        },


        addSaveNode: function (node) {
            // save game
            this.save();            
            // destroy save command
            this.creator.destroyEntity(node.entity);

        },
        addLoadNode: function (node) {
            // save game
            this.load();            
            // destroy save command
            this.creator.destroyEntity(node.entity);

        },
        save: function() {
            // store everything in this object
            storage = {};

            // save game version
            storage.version = 5;

            // for each StoreInSaveGameNode
            for(var node = this.storeInSaveGameNodes.head; node; node = node.next) {
                storage[node.storeInSaveGame.unique_name] = {};
                // for each component to store in this StoreInSaveGameNode
                for (var i = 0; i < node.storeInSaveGame.list_of_components.length ; ++i) {
                    var Component = node.storeInSaveGame.list_of_components[i];
                    var cName = Components.getName(Component);
                    if(node.entity.has(Component)) {
                        storage[node.storeInSaveGame.unique_name][cName] = node.entity.get(Component);
                    } else {
                        storage[node.storeInSaveGame.unique_name][cName] = null;
                    }
                };
            }

            var serialize = _.compose(LZString.compressToBase64,JSON.stringify);
            localStorage.setItem('owc_savegame', serialize(storage));
        },
        load: function() {
            var deserialize = _.compose(JSON.parse,LZString.decompressFromBase64);
            var storage = deserialize(localStorage.getItem('owc_savegame'));

            storage = this.versionUpgrade(storage);

            // for each StoreInSaveGameNode
            for(var node = this.storeInSaveGameNodes.head; node; node = node.next) {
                // for each component to store in this StoreInSaveGameNode
                for (var i = 0; i < node.storeInSaveGame.list_of_components.length ; ++i) {
                    var ComponentClass = node.storeInSaveGame.list_of_components[i];
                    var cName = Components.getName(ComponentClass);
                    if(node.entity.has(ComponentClass)) {
                        var component = node.entity.get(ComponentClass);
                        // copy all stored properties from storage[node.storeInSaveGame.unique_name] to component
                        _.extend(component, storage[node.storeInSaveGame.unique_name][cName]);
                        
                        // modified
                        if( ! node.entity.has(Components.Modified)) {
                            node.entity.add(new Components.Modified());
                        }
                    } else {
                        log("Could not restore stored values for " + node.storeInSaveGame.unique_name);
                        // storage[node.storeInSaveGame.unique_name] = null;
                    }
                };
            }
        },
        getVersion: function (obj) {
            if(!obj.hasOwnProperty("version")) {
                return 0;
            } else {
                return obj.version;
            }
        },
        versionUpgrade: function (obj) {
            var currentVersion = 5;
            var version = this.getVersion(obj);
            if (version<currentVersion) {
                switch (version) {
                case 0:
                    // add state.version
                    obj.version = 1;
                    // FALLTHROUGH       
                case 1:
                    // new values for:
                    try {
                        delete obj.plastic.density;
                        delete obj.planks.density;
                        delete obj.sight.lookout.effect;
                    } finally {
                        obj.version = 2;
                    }
                    // FALLTHROUGH       
                case 2:
                    // new values for:
                    try {
                        delete obj.population.waterConsumation;
                    } finally {
                        obj.version = 3;
                    }
                    // FALLTHROUGH       
                case 3:
                    try {
                        delete obj.log;
                    } finally {
                        obj.version = 4;
                    }
                    // FALLTHROUGH       
                case 4:
                    //update to ash-js 
                    break;
                default:
                    log(sprintf("Unknown version: %d", version));
                    log(sprintf("Current version: %d", currentVersion));
                    return null;
                    break;
                }
                return obj;
            } else {
                return obj;
            }
        },


        update: function (time) {
        }
    });

    return SaveGameSystem;
});
