define([
    'ash', 
    'game/nodes/logmessagenode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, LogMessageNode, Components, $, sp) {
    var LogSystem = Ash.System.extend({
        creator: null,
        nodes: null,
        logElem: null,

        constructor: function (creator) {
            this.creator = creator;
            this.logElem = $("#log");
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(LogMessageNode);
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
            // add message to html element
            // destroy entity
            
            var date = new Date().timeNow()
            var html = sprintf(
                "<div><span class='time'>%s</span><span class='message'>%s</span></div>"
                    ,date
                    ,node.logMessage.msg);

            this.logElem.prepend(html);

            this.creator.destroyEntity(node.entity);
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

    return LogSystem;
});
