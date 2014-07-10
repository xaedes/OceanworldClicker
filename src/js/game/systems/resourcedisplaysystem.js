define([
    'ash', 
    'game/nodes/resourcedisplaynode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, ResourceDisplayNode, Components, $, sp) {
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
            var containerid = sprintf("resource_%d", node.uid.uid);
            var injectid = sprintf("valuedisplay_%d", node.uid.uid);
            var html=sp.sprintf(""
                +"<tr id='%s'>"
                    +"<td class='caption'></td>"
                    +"<td class='valuedisplay' id='%s'></td>"
                +"</tr>",containerid, injectid);  
            
            this.resourcedisplay.append(html);

            if(node.entity.has(Components.ValueDisplay)) {
                node.entity.remove(Components.ValueDisplay);
            }
            node.entity.add(new Components.ValueDisplay(containerid, injectid));
        },

        removeFromDisplay: function (node) {
            var containerid = sprintf("resource_%d", node.uid.uid);
            this.resourcedisplay.find("#"+containerid).remove();
        },

    });

    return ResourceDisplaySystem;
});
