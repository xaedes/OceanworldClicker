define([
    'ash', 
    'game/nodes/swimaroundnode', 
    'game/nodes/nearbyrefilledbyswimmingnode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, SwimAroundNode, NearbyRefilledBySwimmingNode, Components, $, sp) {
    function gaussian(variance) {
        // http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
        r1 = Math.random();
        r2 = Math.random();
        return Math.sqrt(-2*Math.log(r1)*variance)*Math.cos(2*Math.PI*r2);
    }
    function add_gaussian(val,variance,scale) {
        return val+gaussian(variance*scale)
    };
    var SwimAroundSystem = Ash.System.extend({
        game: null,
        swimAroundNodes: null,
        nearbyRefilledBySwimmingNodes: null,
        sight: null,

        constructor: function (game) {
            this.game = game;
            return this;
        },

        addToEngine: function (engine) {
            this.swimAroundNodes = engine.getNodeList(SwimAroundNode);
            for(var node = this.swimAroundNodes.head; node; node = node.next) {
                this.addSwimAroundNode(node);
            }
            this.swimAroundNodes.nodeAdded.add(this.addSwimAroundNode, this);
            this.swimAroundNodes.nodeRemoved.add(this.removeNode, this);

            this.nearbyRefilledBySwimmingNodes = engine.getNodeList(NearbyRefilledBySwimmingNode);
            this.nearbyRefilledBySwimmingNodes.nodeAdded.add(this.addSwimAroundNode, this);
        },

        removeFromEngine: function (engine) {
            this.swimAroundNodes = null;
            this.nearbyRefilledBySwimmingNodes = null;
        },

        refillNearby: function(node,sight) {
            if(sight > 0) {
                node.nearby.nearby = sight;
                node.nearby.nearby += gaussian(5);
                node.nearby.nearby = Math.floor(Math.max(node.nearby.nearby,0));
                if(!node.entity.has(Components.Modified))
                    node.entity.add(new Components.Modified());           
            }
        },

        addSwimAroundNode: function (node) {
            log("Swimming around...");
            // log("Nothing new");
            
            if(!this.game.sight.has(Components.Value)) {
                log("I don't see anything.");
                return;
            }
            var sight = this.game.sight.get(Components.Value).value;
            if(sight<=0) {
                log("I don't see anything.");
                return;
            }

            log("Found some materials.");
            for(var nearbyNode = this.nearbyRefilledBySwimmingNodes.head; nearbyNode; nearbyNode = nearbyNode.next) {
                this.refillNearby(nearbyNode,sight);
            }

            node.entity.remove(Components.SwimAround);
        },

        removeNode: function (node) {

        },
        updateNode: function (node) {


        },

        update: function (time) {

        }
    });

    return SwimAroundSystem;
});
