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
                inject.append("<span class='prepend'></span>");
            }
            if(node.entity.has(Components.Value)){
                inject.append("<span class='value'></span>");
            }
            if(node.entity.has(Components.Max)){
                inject.append("<span class='_max'> / <span class='max'></span></span>");
            }
            if(node.entity.has(Components.Rate)){
                inject.append("<span class='_rate'> (<span class='rate'></span>/s)</span>");
            }
            if(node.entity.has(Components.Nearby)){
                inject.append("<span class='_nearby'> from <span class='nearby'></span> nearby</span>");
            }

            this.updateNode(node);
        },

        removeNode: function (node) {
            var inject = $("#"+node.valueDisplay.htmlInjectID);
            if(node.entity.has(Components.Prepend)){
                inject.find(".prepend").remove();
            }
            if(node.entity.has(Components.Value)){
                inject.find(".value").remove();
            }
            if(node.entity.has(Components.Max)){
                inject.find("._max").remove();
            }
            if(node.entity.has(Components.Rate)){
                inject.find("._rate").remove();
            }
            if(node.entity.has(Components.Nearby)){
                inject.find("._nearby").remove();
            }
        },
        updateNode: function (node) {
            var container = $("#"+node.valueDisplay.htmlContainerID);
            if(node.entity.has(Components.Prepend)){
                container.find(".prepend").text(sprintf("%s",node.entity.get(Components.Prepend).prepend));
            }
            if(node.entity.has(Components.Caption)){
                container.find(".caption").text(sprintf("%s",node.entity.get(Components.Caption).caption));
            }
            if(node.entity.has(Components.Value)){
                container.find(".value").text(sprintf(node.display.format,node.entity.get(Components.Value).value));
            }
            if(node.entity.has(Components.Max)){
               container.find(".max").text(sprintf(node.display.format,node.entity.get(Components.Max).max));
            }
            if(node.entity.has(Components.Rate)){
                var rate = node.entity.get(Components.Rate).rate;
                container.find(".rate").text((rate < 0?"-":"+")+sprintf("%.2f",rate));
            }
            if(node.entity.has(Components.Nearby)){
                container.find(".nearby").text(sprintf(node.display.format,node.entity.get(Components.Nearby).nearby));
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
