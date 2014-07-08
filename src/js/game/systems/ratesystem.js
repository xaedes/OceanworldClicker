define([
    'ash', 
    'game/nodes/ratenode', 
    'game/nodes/rateticknode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, RateNode, RateTickNode, Components, $, sp) {
    var RateSystem = Ash.System.extend({
        tickNodes: null,
        rateNodes: null,
        creator: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.rateNodes = engine.getNodeList(RateNode);

            this.tickNodes = engine.getNodeList(RateTickNode);
            for(var node = this.tickNodes.head; node; node = node.next) {
                this.tick(node);
            }
            this.tickNodes.nodeAdded.add(this.tick, this);
            this.tickNodes.nodeRemoved.add(this.tickCleaned, this);
        },

        removeFromEngine: function (engine) {
            this.tickNodes = null;
        },
        rateTick: function (node, dt) {
            node.value.value += node.rate.rate;
            if( ! node.entity.has(Components.Modified)) {
                node.entity.add(new Components.Modified());
            }
        },
        tick: function (tickNode) {
            for(var rateNode = this.rateNodes.head; rateNode; rateNode = rateNode.next) {
                this.rateTick(rateNode, tickNode.interval.seconds);
            }
        },

        tickCleaned: function (node) {
        },

        update: function (time) {
        }
    });

    return RateSystem;
});
