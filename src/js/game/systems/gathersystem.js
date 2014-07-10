define([
    'ash', 
    'game/nodes/gathernode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, GatherNode, Components, $, sp) {
    var GatherSystem = Ash.System.extend({
        nodes: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(GatherNode);
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
            var amount = Math.min(node.gather.amount, node.nearby.nearby);
            node.value.value += amount;
            node.nearby.nearby -= amount;
            if( ! node.entity.has(Components.Modified)) {
                node.entity.add(new Components.Modified());
            }
            node.entity.remove(Components.Gather);
        },

        removeNode: function (node) {

        },
        updateNode: function (node) {


        },

        update: function (time) {
            for(var node = this.nodes.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return GatherSystem;
});
