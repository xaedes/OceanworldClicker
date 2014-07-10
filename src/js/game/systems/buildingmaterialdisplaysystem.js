define([
    'ash', 
    'game/nodes/buildingmaterialdisplaynode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, BuildingMaterialDisplayNode, Components, $, sp) {
    var BuildingMaterialDisplaySystem = Ash.System.extend({
        gamewrapper: null,
        display: null,
        nodes: null,

        constructor: function (gamewrapper) {
            this.gamewrapper = gamewrapper;
            this.display = gamewrapper.find("#buildingmaterialdisplay");
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(BuildingMaterialDisplayNode);
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
            var containerid = sprintf("buildingmaterialdisplay_%d", node.uid.uid);
            var injectid = sprintf("valuedisplay_%d", node.uid.uid);
            var cssClass = [];
            if(node.entity.has(Components.CSSClass)) {
                cssClass.push(node.entity.get(Components.CSSClass).cssClass);
            }
            var html=sp.sprintf(""
                +"<tr id='%s' class='%s'>"
                    +"<td><button class='gather'>Gather</button></td>"
                    +"<td><i class='fa'></i><span class='caption'></span></td>"
                    +"<td class='valuedisplay' id='%s'></td>"
                    +"<td></td>"
                +"</tr>",containerid, cssClass.join(" "), injectid);  
            
            this.display.append(html);
            $('#'+containerid+' button.gather').click(function () {
                gather(node.entity, 1);
            })
            
            if(node.entity.has(Components.ValueDisplay)) {
                node.entity.remove(Components.ValueDisplay);
            }
            node.entity.add(new Components.ValueDisplay(containerid, injectid));
        },

        removeFromDisplay: function (node) {
            var containerid = sprintf("buildingmaterialdisplay_%d", node.uid.uid);
            this.display.find("#"+containerid).remove();
        },

    });

    return BuildingMaterialDisplaySystem;
});
