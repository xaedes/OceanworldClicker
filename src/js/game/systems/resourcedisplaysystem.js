define([
    'ash', 
    'game/nodes/resourcedisplay', 
    'game/components/dirty',
    'jquery', 
    'sprintf'
], function (Ash, ResourceDisplayNode, Dirty, $, sp) {
    var ResourceDisplaySystem = Ash.System.extend({
        gamewrapper: null,
        resourcedisplay: null,
        nodes: null,

        constructor: function (gamewrapper) {
            this.gamewrapper = gamewrapper;
            this.resourcedisplay = gamewrapper.find("#resourcedisplay");
            return this;
        },

        addToEngine: function (engine) {

            this.nodes = engine.getNodeList(ResourceDisplayNode);
            for(var node = this.nodes.head; node; node = node.next) {
                this.addToDisplay(node);
            }
            this.nodes.nodeAdded.add(this.addToDisplay, this);
            this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
        },

        removeFromEngine: function (engine) {
            this.nodes = null;
        },

        addToDisplay: function (node) {
            this.resourcedisplay.append(""
                +sp.sprintf("<tr id='resource_%d'>",node.uid.uid)
                    +"<td class='name'>"
                    +"</td>"
                    +"<td>"
                        +"<span class='value'></span>"
                        +"<span class='max'></span>"
                    +"</td>"
                +"</tr>");
            this.updateNode(node);
        },

        removeFromDisplay: function (node) {
            // Intentionally left blank
        },

        updateNode: function(node) {
            var tr = this.resourcedisplay.find("#resource_"+node.uid.uid)
            tr.find(".name").text(sprintf("%s",node.name.name));
            tr.find(".value").text(sprintf("%.2f",node.value.value));
            tr.find(".max").text(sprintf("%.2f",node.max.max));

            node.entity.remove(Dirty);
        },

        update: function (time) {
            var node;

            for (node = this.nodes.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return ResourceDisplaySystem;
});
