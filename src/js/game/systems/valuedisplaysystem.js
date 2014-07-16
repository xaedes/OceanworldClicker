define([
    'ash', 
    'game/nodes/valuedisplaynode', 
    'game/nodes/valuedisplayrefreshnode', 
    'game/components/components',
    'jquery', 
    'sprintf'
], function (Ash, ValueDisplayNode, ValueDisplayRefreshNode, Components, $, sp) {
    var ValueDisplaySystem = Ash.System.extend({
        nodes: null,
        nodesRefresh: null,

        constructor: function () {
            return this;
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(ValueDisplayNode);
            for(var node = this.nodes.head; node; node = node.next) {
                this.addNode(node);
            }
            this.nodes.nodeAdded.add(this.addNode, this);
            this.nodes.nodeRemoved.add(this.removeNode, this);


            this.nodesRefresh = engine.getNodeList(ValueDisplayRefreshNode);
            for(var node = this.nodesRefresh.head; node; node = node.next) {
                this.updateNode(node);
            }
            this.nodesRefresh.nodeAdded.add(this.updateNode, this); // immediate update
        },

        removeFromEngine: function (engine) {
            this.nodes = null;
        },

        addNode: function (node) {
            var inject = $("#"+node.valueDisplay.htmlInjectID);
            if(node.entity.has(Components.Prepend)){
                inject.append("<span class='Prepend'></span>");
            }
            if(node.entity.has(Components.Value)){
                inject.append("<span class='Value Highlightable'></span>");
            }
            if(node.entity.has(Components.Max)){
                inject.append("<span class='_Max'> / <span class='Max Highlightable'></span></span>");
            }
            if(node.entity.has(Components.Rate)){
                inject.append("<span class='_Rate'> (<span class='Rate Highlightable'></span>/s)</span>");
            }
            if(node.entity.has(Components.Nearby)){
                inject.append("<span class='_Nearby'> from <span class='Nearby Highlightable'></span> nearby</span>");
            }

            this.updateNode(node);
        },

        removeNode: function (node) {
            var inject = $("#"+node.valueDisplay.htmlInjectID);
            if(node.entity.has(Components.Prepend)){
                inject.find(".Prepend").remove();
            }
            if(node.entity.has(Components.Value)){
                inject.find(".Value").remove();
            }
            if(node.entity.has(Components.Max)){
                inject.find("._Max").remove();
            }
            if(node.entity.has(Components.Rate)){
                inject.find("._Rate").remove();
            }
            if(node.entity.has(Components.Nearby)){
                inject.find("._Nearby").remove();
            }
        },
        updateNode: function (node) {
            var container = $("#"+node.valueDisplay.htmlContainerID);
            if(node.entity.has(Components.Prepend)){
                container.find(".Prepend").text(sprintf("%s",node.entity.get(Components.Prepend).prepend));
            }
            if(node.entity.has(Components.Caption)){
                container.find(".Caption").text(sprintf("%s",node.entity.get(Components.Caption).caption));
            }
            if(node.entity.has(Components.Value)){
                container.find(".Value").text(sprintf(node.display.format,node.entity.get(Components.Value).value));
            }
            if(node.entity.has(Components.Max)){
               container.find(".Max").text(sprintf(node.display.format,node.entity.get(Components.Max).max));
            }
            if(node.entity.has(Components.Rate)){
                var rate = node.entity.get(Components.Rate).rate;
                container.find(".Rate").text((rate < 0?"-":"+")+sprintf("%.2f",rate));
            }
            if(node.entity.has(Components.Nearby)){
                container.find(".Nearby").text(sprintf(node.display.format,node.entity.get(Components.Nearby).nearby));
            }

            // remove Refresh flag to avoid unnecessary updates
            if(node.entity.has(Components.Refresh)) {
                node.entity.remove(Components.Refresh);
            }
        },

        update: function (time) {
            for(var node = this.nodesRefresh.head; node; node = node.next) {
                this.updateNode(node);
            }
        }
    });

    return ValueDisplaySystem;
});
