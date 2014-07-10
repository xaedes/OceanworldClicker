define([
    'ash', 
    'game/nodes/sightnode', 
    'game/nodes/providessightnode', 
    'game/nodes/providessightmodifiednode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, SightNode, ProvidesSightNode, ProvidesSightModifiedNode, Components, $, sp) {
    var SightSystem = Ash.System.extend({
        sum: 0,
        sightNodes: null,
        providesSightNodes: null,
        // for later improvement 
        // providesSightModifiedNodes: null;

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.sightNodes = engine.getNodeList(SightNode);
            for(var node = this.sightNodes.head; node; node = node.next) {
                this.addSightNode(node);
            }
            this.sightNodes.nodeAdded.add(this.addSightNode, this);
 
            this.providesSightNodes = engine.getNodeList(ProvidesSightNode);
            for(var node = this.providesSightNodes.head; node; node = node.next) {
                this.addProvidesSightNode(node);
            }
            this.providesSightNodes.nodeAdded.add(this.addProvidesSightNode, this);
            this.providesSightNodes.nodeRemoved.add(this.removeProvidesSightNode, this);

            // for later improvement (hint: node.providesSight needs to track last_amount to update sum)
            // this.providesSightModifiedNodes = engine.getNodeList(ProvidesSightModifiedNode);
            // for(var node = this.providesSightModifiedNodes.head; node; node = node.next) {
            //     this.addNode(node);
            // }
            // this.providesSightModifiedNodes.nodeAdded.add(this.addNode, this);
            // this.providesSightModifiedNodes.nodeRemoved.add(this.removeNode, this);
        },

        removeFromEngine: function (engine) {
            this.sightNodes = null;
            this.providesSightNodes = null;
            // for later improvement 
            // this.providesSightModifiedNodes = null;
        },
        applySumToNode: function(node) {
            node.value.value = this.sum;
            // modified
            if( !node.entity.has(Components.Modified) )
                node.entity.add(new Components.Modified());
        },
        applySum: function () {
            // apply summed sight to sight nodes
            for(var node = this.sightNodes.head; node; node = node.next) {
                this.applySumToNode(node);
            }            
        },
        addSightNode: function(node) {
            this.applySumToNode(node);
        },
        addProvidesSightNode: function (node) {
            // update sum and apply it to all sight nodes
            this.sum += node.providesSight.amount;
            this.applySum();
        },

        removeProvidesSightNode: function (node) {
            // update sum and apply it to all sight nodes
            this.sum -= node.providesSight.amount;
            this.applySum();
        },
        updateNode: function (node) {
            // empty so far
            // for later improvement using ProvidesSightModifiedNode
        },

        update: function (time) {
            // // sum all provided sight
            // this.sum = 0;
            // for(var node = this.providesSightNodes.head; node; node = node.next) {
            //     this.sum += node.providesSight.amount;
            // // apply summed sight to sight nodes
            // this.applySum();
        }
    });

    return SightSystem;
});
