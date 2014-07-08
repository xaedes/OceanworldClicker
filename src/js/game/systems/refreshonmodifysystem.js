define([
    'ash', 
    'game/nodes/refreshonmodifynode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, RefreshOnModifyNode, Components, $, sp) {
    var RefreshOnModifySystem = Ash.System.extend({
        nodes: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(RefreshOnModifyNode);
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
            this.updateNode(node);
        },

        removeNode: function (node) {

        },
        updateNode: function (node) {
            if( ! node.entity.has(Components.Refresh)) {
                node.entity.add(new Components.Refresh());
            }
            node.entity.remove(Components.Modified);        },

        update: function (time) {
            for(var node = this.nodes.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return RefreshOnModifySystem;
});
