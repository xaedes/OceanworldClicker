define([
    'ash', 
    'game/nodes/resourcedisplay', 
    'game/nodes/resourcedisplaydirty', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, ResourceDisplayNode, ResourceDisplayNodeDirty, Components, $, sp) {
    var ResourceDisplaySystem = Ash.System.extend({
        gamewrapper: null,
        resourcedisplay: null,
        nodes: null,
        nodesDirty: null,

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

            this.nodesDirty = engine.getNodeList(ResourceDisplayNodeDirty);
            for(var node = this.nodesDirty.head; node; node = node.next) {
                this.updateNode(node);
            }

            this.nodesDirty.nodeAdded.add(this.updateNode, this); // immediate update
        },

        removeFromEngine: function (engine) {
            this.nodes = null;
        },

        addToDisplay: function (node) {
            var html = "";
            var valuedisplayhtml = "<td class='valuedisplay'>";
            if(node.entity.has(Components.Prepend)){
                valuedisplayhtml+="<span class='prepend'></span>";
            }
            if(node.entity.has(Components.Value)){
                valuedisplayhtml+="<span class='value'></span>";
            }
            if(node.entity.has(Components.Max)){
                valuedisplayhtml+=" / <span class='max'></span>";
            }
            if(node.entity.has(Components.Rate)){
                valuedisplayhtml+=" (<span class='rate'></span>/s)";
            }
            valuedisplayhtml+="</td>";
            html+=sp.sprintf("<tr id='resource_%d'>",node.uid.uid)
                    +"<td class='name'></td>"
                    +valuedisplayhtml
                +"</tr>";  
            
            this.resourcedisplay.append(html);

            this.updateNode(node);
        },

        removeFromDisplay: function (node) {
            // todo?
        },

        updateNode: function(node) {
            var tr = this.resourcedisplay.find("#resource_"+node.uid.uid)
            if(node.entity.has(Components.Prepend)){
                tr.find(".prepend").text(sprintf("%s",node.entity.get(Components.Prepend).prepend));
            }
            if(node.entity.has(Components.Name)){
                tr.find(".name").text(sprintf("%s",node.entity.get(Components.Name).name));
            }
            if(node.entity.has(Components.Value)){
                tr.find(".value").text(sprintf(node.display.format,node.entity.get(Components.Value).value));
            }
            if(node.entity.has(Components.Max)){
               tr.find(".max").text(sprintf(node.display.format,node.entity.get(Components.Max).max));
            }
            if(node.entity.has(Components.Rate)){
                tr.find(".rate").text(sprintf("%.2f",node.entity.get(Components.Rate).rate));
            }

            // remove Dirty flag to avoid unnecessary updates
            if(node.entity.has(Components.Dirty)) {
                node.entity.remove(Components.Dirty);
            }
        },

        update: function (time) {
            var node;

            for (node = this.nodesDirty.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return ResourceDisplaySystem;
});
