define([
    'ash', 
    'game/nodes/lifetimenode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, Lifetime, Components, $, sp) {
    var LifetimeSystem = Ash.System.extend({
        nodes: null,
        creator: null,

        constructor: function (creator) {
            this.creator = creator;
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(Lifetime);
            for(var node = this.nodes.head; node; node = node.next) {
                this.addNode(node);
            }
            this.nodes.nodeAdded.add(this.addNode, this);
            this.nodes.nodeRemoved.add(this.removeNode, this);
        },

        removeFromEngine: function (engine) {
            this.nodes = null;
        },


        addNode: function (node) {
            if(node.lifetime._timeout_handle) {
                clearTimeout(node.lifetime._timeout_handle);
            }        
            var self = this;
            node.lifetime._timeout_handle = setTimeout(function () {
                node.lifetime._timeout_handle = null;
                self.creator.destroyEntity(node.entity);
            },node.lifetime.seconds*1000);    
        },

        removeNode: function (node) {
            if(node.lifetime._timeout_handle) {
                clearTimeout(node.lifetime._timeout_handle);
            }
        },


        update: function (time) {

        }
    });

    return LifetimeSystem;
});
