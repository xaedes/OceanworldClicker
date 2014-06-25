// utility functions ==============================================================================
function gaussian(variance) {
    // http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    r1 = Math.random();
    r2 = Math.random();
    return Math.sqrt(-2*Math.log(r1)*variance)*Math.cos(2*Math.PI*r2);
}
// set html elements ==============================================================================
function setInnerHTML(id,html) {
    document.getElementById(id).innerHTML = html;
}
function setFloat(id,value) {
    setInnerHTML(id,sprintf("%.2f",value));
}
function setSignedFloat(id,value) {
    setInnerHTML(id,sprintf("%s%.2f",(value < 0?'-':'+'),Math.abs(value)));
}
function setInt(id,value) {
    setInnerHTML(id,sprintf("%d",value));
}
function setCost(id,build,ignore) {
    var s = _.chain(build)
        .filter(function (a) { return a.variable !== ignore; })
        .map(function(a) {return sprintf("%d %s",-a.amount,a.variable.name);})
        .value()
        .join(", ");
    setInnerHTML(id,s);
}
function setEnabled(id) {
    document.getElementById(id).disabled = false;
}
function setDisabled(id) {
    document.getElementById(id).disabled = true;
}
function setClickableBuild(id, building, n, available) {
    if(isBuildApplicable(building.build, n, available)) {
        setEnabled(id);
    } else {
        setDisabled(id);
    }
}

// Define data ====================================================================================
state = {};
function defineDefaultData(state) {
    state.log = [];
    state.autosave = {};
    state.autosave.counter = {};
    state.autosave.counter.current = 0;
    state.autosave.counter.max = 60; // every minute

    state.space = {};
    state.space.current = 0;
    state.space.available = {};
    state.space.available.current = 10;
    state.space.enlargements = {};
    state.space.enlargements.current = 1;
    state.space.enlargements.size = -10;

    state.sight = {};
    state.sight.current = 1;
    state.sight.variance = 1;


    state.sight.lookout = {};
    state.sight.lookout.current = 0;
    state.sight.lookout.effect = 1;
    state.sight.lookout.min = 0;
    state.sight.lookout.max = {};
    state.sight.lookout.max.current = 0;

    state.population = {};
    state.population.current = 1;
    state.population.max = {};
    state.population.max.current = 0;
    state.population.waterConsumation = -0.1;
    state.population.findSurvivorProbability = 0.1;
    state.population.unemployed = {};
    state.population.unemployed.current = 0;

    state.population.cabin = {}
    state.population.cabin.current = 1;
    state.population.cabin.size = 5;
    state.population.cabin.effect = 1;



    state.plastic = {};
    state.plastic.name = "plastic";
    state.plastic.current = 0;
    state.plastic.nearby = {};
    state.plastic.nearby.current = 0;
    state.plastic.nearby.min = {};
    state.plastic.nearby.min.current = 0;
    state.plastic.nearby.max = {};
    state.plastic.nearby.max.current = 0;
    state.plastic.density = 10; 

    state.plastic.rate = {};
    state.plastic.rate.current = 0;

    state.plastic.gatherer = {};
    state.plastic.gatherer.current = 0;
    state.plastic.gatherer.effect = 1;
    state.plastic.gatherer.min = 0;
    state.plastic.gatherer.max = {};
    state.plastic.gatherer.max.current = 0;

    state.planks = {};
    state.planks.name = "planks";
    state.planks.current = 0;
    state.planks.nearby = {};
    state.planks.nearby.current = 0;
    state.planks.nearby.min = {};
    state.planks.nearby.min.current = 0;
    state.planks.nearby.max = {};
    state.planks.nearby.max.current = 0;

    state.planks.density = 10; 

    state.planks.rate = {};
    state.planks.rate.current = 0;

    state.planks.gatherer = {};
    state.planks.gatherer.current = 0;
    state.planks.gatherer.effect = 1;
    state.planks.gatherer.min = 0;
    state.planks.gatherer.max = {};
    state.planks.gatherer.max.current = 0;


    state.water = {};
    state.water.current = 1;
    state.water.min = 0;
    state.water.max = {};
    state.water.max.current = 10;

    state.water.rate = {};
    state.water.rate.current = 0;

    state.water.supplies = {};
    state.water.supplies.current = 1;
    state.water.supplies.name = "supplies";
    state.water.supplies.effect = 1;
    state.water.supplies.size = 1;


    state.water.reservoirs = {};
    state.water.reservoirs.name = "Water reservoir";
    state.water.reservoirs.current = 1;
    state.water.reservoirs.effect = 10;
    state.water.reservoirs.size = 1;



    return state;
}
function getDefaultData() {
    return defineDefaultData({});
}

// Define buildings  ==============================================================================
function defineBuilds(state) {
    state.water.supplies.build = [{'variable':state.water.supplies,'amount':1,'building':true},{'variable':state.plastic,'amount':-10}];
    state.water.reservoirs.build = [{'variable':state.water.reservoirs,'amount':1,'building':true},{'variable':state.plastic,'amount':-10},{'variable':state.planks,'amount':-1}];
    state.space.enlargements.build = [{'variable':state.space.enlargements,'amount':1,'building':true},{'variable':state.plastic,'amount':-1},{'variable':state.planks,'amount':-10}];
    state.population.cabin.build = [{'variable':state.population.cabin,'amount':1,'building':true},{'variable':state.plastic,'amount':-1},{'variable':state.planks,'amount':-5}];
    return state;
}


// Define calculations  ===========================================================================
function defineCalculations(state) {
    old = function(val) {return val;};
    zero = function(val) {return 0;};
    value = function(value, val) {return getValue(value);};
    add_to = function(add_variable,add_weight,val) {return val+getValue(add_variable)*getValue(add_weight)};
    sub_from = function(sub_variable,sub_weight,val) {return val-getValue(sub_variable)*getValue(sub_weight)};
    incr = function(val) {return val+1;};
    decr = function(val) {return val-1;};
    add_gaussian = function(variance_variable,scale_variable,val) {return val+gaussian(getValue(variance_variable)*getValue(scale_variable))};
    modulo = function(div,val) {return val % getValue(div)};
    min = function(other_val, val) {return Math.min(getValue(other_val),val);};
    max = function(other_val, val) {return Math.max(getValue(other_val),val);};

    state.autosave.counter.calculate = old;
    state.autosave.counter.calculate = _.compose(incr, state.autosave.counter.calculate);
    state.autosave.counter.calculate = _.compose(_.partial(modulo, state.autosave.counter.max), state.autosave.counter.calculate);

    state.water.rate.calculate = zero; // begin with zero (omit old value)
    state.water.rate.calculate = _.compose(_.partial(add_to, state.population, state.population.waterConsumation), state.water.rate.calculate);
    state.water.rate.calculate = _.compose(_.partial(add_to, state.water.supplies, state.water.supplies.effect), state.water.rate.calculate);

    state.water.max.calculate = zero; // begin with zero (omit old value)
    state.water.max.calculate = _.compose(_.partial(add_to, state.water.reservoirs, state.water.reservoirs.effect), state.water.max.calculate);

    state.water.calculate = old;
    state.water.calculate = _.compose(_.partial(add_to, state.water.rate, 1), state.water.calculate);

    state.population.max.calculate = zero;
    state.population.max.calculate = _.compose(_.partial(add_to, state.population.cabin, state.population.cabin.effect), state.population.max.calculate);

    state.population.unemployed.calculate = _.partial(value, state.population);

    state.sight.calculate = _.partial(value, 1);
    state.sight.calculate = _.compose(_.partial(add_to, state.sight.lookout, state.sight.lookout.effect), state.sight.calculate);

    function defineCalculationsJob(job) {
        job.max.calculate = _.partial(value, state.population.unemployed);
        job.max.calculate = _.compose(_.partial(add_to, job, 1), job.max.calculate);
        state.population.unemployed.calculate = _.compose(_.partial(sub_from, job, 1), state.population.unemployed.calculate);
    }

    function defineCalculationsResourceGatherer(resource) {
        resource.nearby.max.calculate = zero;
        resource.nearby.max.calculate = _.compose(_.partial(add_to, state.sight, resource.density), resource.nearby.max.calculate);
        resource.nearby.max.calculate = _.compose(_.partial(add_to, state.sight.variance, resource.density), resource.nearby.max.calculate);

        resource.nearby.calculate_swim = zero;
        resource.nearby.calculate_swim = _.compose(_.partial(add_to, state.sight, resource.density), resource.nearby.calculate_swim);
        resource.nearby.calculate_swim = _.compose(_.partial(add_gaussian, state.sight.variance, resource.density), resource.nearby.calculate_swim);
        resource.nearby.calculate_swim = _.compose(Math.floor, resource.nearby.calculate_swim);
        
        resource.rate.calculate = zero;
        resource.rate.calculate = _.compose(_.partial(add_to, resource.gatherer, resource.gatherer.effect), resource.rate.calculate);
        resource.rate.calculate = _.compose(_.partial(min, resource.nearby), resource.rate.calculate);

        resource.calculate = old;
        resource.calculate = _.compose(_.partial(add_to, resource.rate, 1), resource.calculate);

        resource.gatherer.max.calculate = _.partial(value, state.population.unemployed);
        resource.gatherer.max.calculate = _.compose(_.partial(add_to, resource.gatherer, 1), resource.gatherer.max.calculate);

        resource.nearby.calculate = old;
        resource.nearby.calculate = _.compose(_.partial(sub_from, resource.rate, 1), resource.nearby.calculate);

        defineCalculationsJob(resource.gatherer);
    }
    defineCalculationsResourceGatherer(state.plastic);
    defineCalculationsResourceGatherer(state.planks);
    defineCalculationsJob(state.sight.lookout);

    state.space.calculate = zero;
    state.space.calculate = _.compose(_.partial(sub_from, state.space.enlargements, state.space.enlargements.size), state.space.calculate);
    // state.space.calculate = _.compose(_.partial(add_to, state.water.supplies, state.water.supplies.size), state.space.calculate);

    state.space.available.calculate = _.partial(value,state.space);
    state.space.available.calculate = _.compose(_.partial(sub_from, state.water.reservoirs, state.water.reservoirs.size), state.space.available.calculate);
    state.space.available.calculate = _.compose(_.partial(sub_from, state.water.supplies, state.water.supplies.size), state.space.available.calculate);
    state.space.available.calculate = _.compose(_.partial(sub_from, state.population.cabin, state.population.cabin.size), state.space.available.calculate);

    return state;
}


function defineNonData(state) {
    defineBuilds(state);
    defineCalculations(state);

    return state;
}


// Logging ========================================================================================

// For the time now
// http://stackoverflow.com/a/10211214/798588
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// Load & Save ====================================================================================
function sanitize_for_serialization(variable) {
    // omit non data keys
    var sanitized = _.omit(variable, 'calculate', 'build');
    // recursive sanitization
    _.chain(_.keys(variable))
        .each(function(key){
            if(_.isObject(sanitized[key]) && !_.isArray(sanitized[key])) {
                sanitized[key] = sanitize_for_serialization(sanitized[key]);
            }
        });

    return sanitized;
}
function serialize(state) {
    var sanitized = sanitize_for_serialization(state);
    var json = JSON.stringify(sanitized);
    var compressed = LZString.compressToBase64(json);
    return compressed;
}
function recursiveDefaults(variable, defaults) {
    variable = _.defaults(variable, defaults);
    _.chain(_.keys(variable))
        .each(function(key){
            if(_.isObject(variable[key]) && !_.isArray(variable[key]) && _.has(defaults,key)) {
                variable[key] = recursiveDefaults(variable[key], defaults[key]);
            }
        });
    return variable;
}
function deserialize(compressed) {
    var state = {};
    if(_.isNull(compressed) || _.isUndefined(compressed) || compressed==="undefined") {
        defineDefaultData(state);
    } else {
        // load serialized data
        var json = LZString.decompressFromBase64(compressed);
        state = JSON.parse(json);
        state = version_upgrade(state);

        // fill in new variables that were not present in loaded data
        var defaultData = getDefaultData();
        recursiveDefaults(state, defaultData);
    }


    return defineNonData(state);
}

function version(state) {
    if(!state.hasOwnProperty("version")) {
        return 0;
    } else {
        return state.version;
    }
}

function version_upgrade_0_1(state) {
    if(version(state)!=0)
        return false;

    // new in this version: 
    // add state.version
    state.version = 1;

    return state;
}

function version_upgrade(state) {
    var currentVersion = 1;
    var stateVersion = version(state);
    if (stateVersion<currentVersion) {
        switch (stateVersion) {
        case 0:
            return version_upgrade_0_1(state);
            break;
        default:
            log(sprintf("Unknown version: %d", stateVersion));
            log(sprintf("Current version: %d", currentVersion));
            return null;
            break;
        }
    } else {
        return state;
    }
}

function load() {
    state = deserialize(localStorage.getItem('state'));
    log("Loaded game");
}
function save() {
    localStorage.setItem('state', serialize(state));

}

function log(msg) {
    state.log.push(msg);
    console.log(msg);
    date = new Date().timeNow()
    document.getElementById("log").innerHTML = "<div>" + date + " " + msg + "</div>" + document.getElementById("log").innerHTML;
}
// display functions ==============================================================================
function displayWater() {
    setFloat("water",getValue(state.water));
    setFloat("waterMax",getValue(state.water.max));
    setInt("waterSupplies",getValue(state.water.supplies));
    setSignedFloat("waterRate",getValue(state.water.rate));
}
function displayPlastic() {
    setInt("plastic",getValue(state.plastic));
    setSignedFloat("plasticRate",getValue(state.plastic.rate));
    setInt("plasticNearby",getValue(state.plastic.nearby));
}
function displayPlanks() {
    setInt("planks",getValue(state.planks));
    setSignedFloat("planksRate",getValue(state.planks.rate));
    setInt("planksNearby",getValue(state.planks.nearby));
}
function displayResources() {
    displayPlastic();
    displayPlanks();
}
function displaySpace() {
    setInt("space",getValue(state.space));
    setInt("availableSpace",getValue(state.space.available));
}
function displayWaterSupplies() {
    setClickableBuild("buildWaterSupplies", state.water.supplies, 1, state.space.available);
    setInt("waterSupplies", getValue(state.water.supplies));
    setInt("waterSuppliesEffect", getValue(state.water.supplies.effect));
    setCost("waterSuppliesCost", state.water.supplies.build, state.water.supplies);
}
function displayWaterReservoirs() {
    setClickableBuild("buildWaterReservoirs", state.water.reservoirs, 1, state.space.available);
    setInt("waterReservoirs", getValue(state.water.reservoirs));
    setInt("waterReservoirsEffect", getValue(state.water.reservoirs.effect));
    setCost("waterReservoirsCost", state.water.reservoirs.build, state.water.reservoirs);
}
function displayShipEnlargements() {
    setClickableBuild("buildShipEnlargements", state.space.enlargements, 1, state.space.available);
    setInt("shipEnlargements", getValue(state.space.enlargements));
    setInt("shipEnlargementsEffect", -getValue(state.space.enlargements.size));
    setCost("shipEnlargementsCost", state.space.enlargements.build, state.space.enlargements);
}
function displayCabins() {
    setClickableBuild("buildCabin", state.population.cabin, 1, state.space.available);
    setInt("cabins", getValue(state.population.cabin));
    setInt("cabinsEffect", getValue(state.population.cabin.effect));
    setCost("cabinsCost", state.population.cabin.build, state.population.cabin);
}
function displayBuildings() {
    displaySpace();
    displayWaterSupplies();
    displayWaterReservoirs();
    displayShipEnlargements();
    displayCabins();
}
function displayPopulation() {
    setInt("population",getValue(state.population));
    setInt("populationMax",getValue(state.population.max));
}
function displayJobs() {
    setInt("unemployed",getValue(state.population.unemployed));
    setInt("lookout",getValue(state.sight.lookout));
    setInt("planksGatherer",getValue(state.planks.gatherer));
    setInt("plasticGatherer",getValue(state.plastic.gatherer));
}
function displayAll() {
    displayWater();
    displayResources();
    displayBuildings();
    displayPopulation();
    displayJobs();
    // displayLog();
}

// data handling functions ========================================================================

function getValue(variable) {
    if(_.isNumber(variable)) {
        return variable;
    }
    if(variable.hasOwnProperty("current")) {
        return variable.current;
    }
}

function setValue(variable, value) {
    if(variable.hasOwnProperty("current")) {
        variable.current = value;
        if(variable.hasOwnProperty("max")) {
            variable.current = Math.min(variable.current, getValue(variable.max));
        }    
        if(variable.hasOwnProperty("min")) {
            variable.current = Math.max(variable.current, getValue(variable.min));
        }    
    }
    return variable;
}
function increment(variable, incr) {
    if(!isNaN(incr)){
        if(variable.hasOwnProperty("nearby") && (incr > 0)) {
            incr = Math.min(incr,getValue(variable.nearby));
            decrement(variable.nearby, incr);
            // variable.nearby -= incr;
        }
        setValue(variable, getValue(variable) + incr);
    }
}
function decrement(variable, decr) {
    increment(variable, -decr);
}

function isBuildApplicable(recipe, n, available) {
    var applicable = true;
    for (var i = recipe.length - 1; i >= 0; i--) {
        if (recipe[i].variable.current+recipe[i].amount<0){
            applicable = false;
            break;
        }
        if (recipe[i].hasOwnProperty("building") && recipe[i].building==true && recipe[i].variable.hasOwnProperty("size") ) {
            // check size
            if( recipe[i].variable.size * recipe[i].amount > getValue(available) ) {
                applicable = false;
                break;
            }
        }
    }
    return applicable;    
}

function build(recipe, n) {
    if(isBuildApplicable(recipe,n,state.space.available)) {
        for (var i = recipe.length - 1; i >= 0; i--) {
            increment(recipe[i].variable,recipe[i].amount);
        }
        return true;
    }
    return false;
}

function swim() {
    log("Swimming to another area..");
    log("Found new resources");
    apply_calculate(state.sight);
    apply_calculate_suffix(state.plastic.nearby,"swim");
    apply_calculate_suffix(state.planks.nearby,"swim");

    if(Math.random() < state.population.findSurvivorProbability) {
        log("Found new survivor!");
        if(getValue(state.population.max)-getValue(state.population) > 0){
            log("The survivor joined you!");
            increment(state.population, 1);
        } else {
            log("Too bad you have not enough space on board.");
        }
    }
}

function apply_calculate(variable) {
    if(variable.hasOwnProperty("calculate")){
        setValue(variable, variable.calculate(getValue(variable)));
    }
}
function apply_calculate_suffix(variable,suffix) {
    if(variable.hasOwnProperty("calculate_"+suffix)){
        setValue(variable, variable["calculate_"+suffix](getValue(variable)));
    }
}


function resetGameNoLog() {
    defineDefaultData(state);
    defineNonData(state);
    apply_calculate(state.plastic.nearby);
    apply_calculate(state.planks.nearby);
}
function resetGame() {
    resetGameNoLog();
    log("Resetting game");
}

function apply_calculate_on_job(job) {
    apply_calculate(job.max);
}
function apply_calculate_on_resource(resource) {
    apply_calculate(resource.rate);
    apply_calculate(resource.nearby.max);
    apply_calculate(resource.nearby);
    apply_calculate(resource);
}
function apply_calculate_on_resource_and_gatherer(resource) {
    apply_calculate_on_job(resource.gatherer);
    apply_calculate_on_resource(resource);
}

// game loop ======================================================================================
function loop() {
    // Autosave
    if(getValue(state.autosave.counter)==0) {
        log("Autosave");
        save();
    }
    // Calculations
    apply_calculate(state.water.max);
    apply_calculate(state.water.rate);
    apply_calculate(state.water);
    apply_calculate(state.autosave.counter);

    apply_calculate_on_resource_and_gatherer(state.plastic);
    apply_calculate_on_resource_and_gatherer(state.planks);
    
    apply_calculate_on_job(state.sight.lookout);

    apply_calculate(state.population.max);
    apply_calculate(state.population.unemployed);

    apply_calculate(state.sight);

    apply_calculate(state.space);
    apply_calculate(state.space.available);

    // Display
    displayAll();
}

resetGameNoLog();
load();
displayAll();

loop_interval = window.setInterval(loop, 1000);
loop();