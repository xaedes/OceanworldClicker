define([
    'ash', 
    'game/nodes/swimaroundnode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, SwimAroundNode, Components, $, sp) {
    var SwimAroundSystem = Ash.System.extend({
        game: null,
        nodes: null,

        constructor: function (game) {
            this.game = game;
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(SwimAroundNode);
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
            log("Swimming around...");
            log("Nothing new");
            node.entity.remove(Components.SwimAround);
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

    return SwimAroundSystem;
});
