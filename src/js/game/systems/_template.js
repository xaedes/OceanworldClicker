define([
    'ash', 
    'game/nodes/maxnode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, MaxNode, Components, $, sp) {
    var MaxSystem = Ash.System.extend({
        nodes: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(MaxNode);
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

    return MaxSystem;
});
