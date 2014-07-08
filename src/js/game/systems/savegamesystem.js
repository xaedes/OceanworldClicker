define([
    'ash', 
    'game/nodes/saveordernode', 
    'game/nodes/storeinsavegamenode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, SaveOrderNode, StoreInSaveGameNode, Components, $, sp) {
    var SaveGameSystem = Ash.System.extend({
        creator: null,
        saveOrderNodes: null,
        storeInSaveGameNodes: null,

        constructor: function (creator) {
            this.creator = creator;
            return this;
        },

        addToEngine: function (engine) {
            this.saveOrderNodes = engine.getNodeList(SaveOrderNode);
            for(var node = this.saveOrderNodes.head; node; node = node.next) {
                this.addNode(node);
            }
            this.saveOrderNodes.nodeAdded.add(this.addNode, this);
            this.saveOrderNodes.nodeRemoved.add(this.removeNode, this);

            this.storeInSaveGameNodes = engine.getNodeList(StoreInSaveGameNode);
        },

        removeFromEngine: function (engine) {
            this.saveOrderNodes = null;
        },


        addNode: function (saveOrderNode) {
            // save order
            for(var node = this.storeInSaveGameNodes.head; node; node = node.next) {
                // 
                console.log(node.storeInSaveGame.unique_name);
                console.log(node.storeInSaveGame.list_of_components);
            }
            this.creator.destroyEntity(saveOrderNode.entity);

        },

        removeNode: function (node) {

        },
        updateNode: function (node) {


        },

        update: function (time) {
            for(var node = this.saveOrderNodes.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return SaveGameSystem;
});
