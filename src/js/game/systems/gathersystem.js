define([
    'ash', 
    'game/nodes/gathernode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, GatherNode, Components, $, sp) {
    var GatherSystem = Ash.System.extend({
        creator: null,
        nodes: null,

        constructor: function (creator) {
            this.creator=creator;
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
            if(node.entity.has(Components.Max)){
                var maxIncrement = node.entity.get(Components.Max).max - node.value.value;
                if(amount>maxIncrement) {
                    amount = maxIncrement;
                    // if(node.entity.hasOwnProperty("highlighter")) {
                    //     var highlighter = node.entity.highlighter;
                    //     if(highlighter) {
                            
                    //     }
                    // } else {
                        // node.entity.highlighter = 
                        this.creator.createHighlightComponent(node.entity, Components.Max)
                            .add(new Components.Lifetime(0.1));
                    // }
                }
            }
            node.value.value += amount;
            node.nearby.nearby -= amount;
            modified(node.entity);


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
