define([
    'ash', 
    'game/nodes/cleanticknode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, CleanTickNode, Components, $, sp) {
    var CleanTickSystem = Ash.System.extend({
        nodes: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(CleanTickNode);
        },

        removeFromEngine: function (engine) {
            this.nodes = null;
        },


        updateNode: function (node) {
            node.entity.remove(Components.IntervalTick);
        },

        update: function (time) {
            for(var node = this.nodes.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return CleanTickSystem;
});
