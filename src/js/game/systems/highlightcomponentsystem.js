define([
    'ash', 
    'game/nodes/highlightcomponentnode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, HighlightComponentNode, Components, $, sp) {
    var HighlightComponentSystem = Ash.System.extend({
        nodes: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(HighlightComponentNode);
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
            // node.highlightComponent.entity
            var ComponentClass = Components.getName(node.highlightComponent.ComponentClass);
            var containerID = null;
            var entity = node.highlightComponent.entity;
            if(entity.has(Components.HTMLContainerID)) {
                containerID = entity.get(Components.HTMLContainerID).containerID;
                $("#"+containerID+" ."+ComponentClass+".Highlightable").addClass("highlight");
            }
        },

        removeNode: function (node) {
            var ComponentClass = Components.getName(node.highlightComponent.ComponentClass);
            var containerID = null;
            var entity = node.highlightComponent.entity;
            if(entity.has(Components.HTMLContainerID)) {
                containerID = entity.get(Components.HTMLContainerID).containerID;
                $("#"+containerID+" ."+ComponentClass+".Highlightable").removeClass("highlight");
            }

        },
        updateNode: function (node) {


        },

        update: function (time) {
            for(var node = this.nodes.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return HighlightComponentSystem;
});
