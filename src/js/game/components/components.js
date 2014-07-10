define([
    'game/components/refresh',
    'game/components/display',
    'game/components/max',
    'game/components/name',
    'game/components/resource',
    'game/components/uid',
    'game/components/value',
    'game/components/rate',
    'game/components/prepend',
    'game/components/interval',
    'game/components/intervaltick',
    'game/components/ratetick',
    'game/components/cleantick',
    'game/components/modified',
    'game/components/refreshonmodify',
    'game/components/caption',
    'game/components/storeinsavegame',
    'game/components/saveorder',
    'game/components/logmessage',
    'game/components/loadorder',
    'game/components/buildingmaterial',
    'game/components/valuedisplay',
    'game/components/cssclass',
    'game/components/nearby',
    'game/components/gather',
    'game/components/swimaround',
    'ash'
], function (
    Refresh,
    Display,
    Max,
    Name,
    Resource,
    UID,
    Value,
    Rate,
    Prepend,
    Interval,
    IntervalTick,
    RateTick,
    CleanTick,
    Modified,
    RefreshOnModify,
    Caption,
    StoreInSaveGame,
    SaveOrder,
    LogMessage,
    LoadOrder,
    BuildingMaterial,
    ValueDisplay,
    CSSClass,
    Nearby,
    Gather,
    SwimAround,
    Ash
) {
    var Components = {
        Refresh: Refresh,
        Display: Display,
        Max: Max,
        Name: Name,
        Resource: Resource,
        UID: UID,
        Value: Value,
        Rate: Rate,
        Prepend: Prepend,
        Interval: Interval,
        IntervalTick: IntervalTick,
        RateTick: RateTick,
        CleanTick: CleanTick,
        Modified: Modified,
        RefreshOnModify: RefreshOnModify,
        Caption: Caption,
        StoreInSaveGame: StoreInSaveGame,
        SaveOrder: SaveOrder,
        LogMessage: LogMessage,
        LoadOrder: LoadOrder,
        BuildingMaterial: BuildingMaterial,
        ValueDisplay: ValueDisplay,
        CSSClass: CSSClass,
        Nearby: Nearby,
        Gather: Gather,
        SwimAround: SwimAround,

        getName: function(componentClass) {
            var pairs = _.pairs(this);
            for (var i = 0; i < pairs.length; i++) {
                if(pairs[i][1] == componentClass) {
                    return pairs[i][0];
                }
            };
            return null;
        }
    };

    return Components;
});
