define(['ash'], function (Ash) {
    var StoreInSaveGame = Ash.Class.extend({
        unique_name: null,
        list_of_components: null,
        constructor: function (unique_name, list_of_components) {
            this.unique_name = unique_name;
            this.list_of_components = list_of_components;
        }
    });

    return StoreInSaveGame;
});
