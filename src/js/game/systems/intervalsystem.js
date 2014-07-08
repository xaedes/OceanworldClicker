define([
    'ash', 
    'game/nodes/intervalnode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, IntervalNode, Components, $, sp) {
    var IntervalSystem = Ash.System.extend({
        nodes: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(IntervalNode);
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
            // clear previous interval
            if(node.interval._handle != null) {
                try {
                    window.clearInterval(node.interval._handle);
                } catch(e) {}
            }

            handler = function () {
                // add tick for systems to recognize
                if( ! node.entity.has(Components.IntervalTick)) {
                    node.entity.add(new Components.IntervalTick());
                }
            }
            node.interval._handle = window.setInterval(handler,node.interval.seconds*1000.0);
        },

        removeNode: function (node) {
            // clear interval
            if(node.interval._handle != null) {
                try {
                    window.clearInterval(node.interval._handle);
                } catch(e) {}
            }
        },

        update: function (time) {
            // empty
        }
    });

    return IntervalSystem;
});
