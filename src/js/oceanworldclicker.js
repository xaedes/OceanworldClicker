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

// Define data ====================================================================================
state = {};
function defineDefaultData(state) {
    state.log = [];
    state.autosave = {};
    state.autosave.counter = {};
    state.autosave.counter.current = 0;
    state.autosave.counter.max = 60; // every minute

    state.sight = {};
    state.sight.current = 1;
    state.sight.variance = 1;

    state.population = {};
    state.population.current = 1;
    state.population.max = {};
    state.population.max.current = 2;
    state.population.waterConsumation = -0.1;
    state.population.findSurvivorProbability = 0.1;
    state.population.unemployed = {};
    state.population.unemployed.current = 0;


    state.plastic = {};
    state.plastic.name = "plastic";
    state.plastic.current = 0;
    state.plastic.nearby = {};
    state.plastic.nearby.current = 0;
    state.plastic.density = 10; 


    state.water = {};
    state.water.current = 1;
    state.water.max = {};
    state.water.max.current = 10;

    state.water.rate = {};
    state.water.rate.current = 0;

    state.water.supplies = {};
    state.water.supplies.current = 1;
    state.water.supplies.name = "supplies";
    state.water.supplies.effect = 1;


    state.water.reservoirs = {};
    state.water.reservoirs.name = "Water reservoir";
    state.water.reservoirs.current = 1;
    state.water.reservoirs.effect = 10;

    state.plastic.rate = {};
    state.plastic.rate.current = 0;

    state.plastic.gatherer = {};
    state.plastic.gatherer.current = 0;
    state.plastic.gatherer.effect = 1;
    state.plastic.gatherer.max = {};
    state.plastic.gatherer.max.current = 0;


    return state;
}
function getDefaultData() {
    return defineDefaultData({});
}

// Define buildings  ==============================================================================
function defineBuilds(state) {
    state.water.supplies.build = [{'variable':state.water.supplies,'amount':1},{'variable':state.plastic,'amount':-10}];
    state.water.reservoirs.build = [{'variable':state.water.reservoirs,'amount':1},{'variable':state.plastic,'amount':-10}];
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

    state.water.rate.calculate = zero; // begin with zero (omit old value)
    state.water.rate.calculate = _.compose(_.partial(add_to, state.population, state.population.waterConsumation), state.water.rate.calculate);
    state.water.rate.calculate = _.compose(_.partial(add_to, state.water.supplies, state.water.supplies.effect), state.water.rate.calculate);

    state.water.max.calculate = zero; // begin with zero (omit old value)
    state.water.max.calculate = _.compose(_.partial(add_to, state.water.reservoirs, state.water.reservoirs.effect), state.water.max.calculate);

    state.water.calculate = old;
    state.water.calculate = _.compose(_.partial(add_to, state.water.rate, 1), state.water.calculate);

    state.plastic.nearby.calculate_swim = zero;
    state.plastic.nearby.calculate_swim = _.compose(_.partial(add_to, state.sight, state.plastic.density), state.plastic.nearby.calculate_swim);
    state.plastic.nearby.calculate_swim = _.compose(_.partial(add_gaussian, state.sight.variance, state.plastic.density), state.plastic.nearby.calculate_swim);

    state.autosave.counter.calculate = old;
    state.autosave.counter.calculate = _.compose(incr, state.autosave.counter.calculate);
    state.autosave.counter.calculate = _.compose(_.partial(modulo, state.autosave.counter.max), state.autosave.counter.calculate);
    
    state.plastic.rate.calculate = zero;
    state.plastic.rate.calculate = _.compose(_.partial(add_to, state.plastic.gatherer, state.plastic.gatherer.effect), state.plastic.rate.calculate);
    state.plastic.rate.calculate = _.compose(_.partial(min, state.plastic.nearby), state.plastic.rate.calculate);

    state.plastic.calculate = old;
    state.plastic.calculate = _.compose(_.partial(add_to, state.plastic.rate, 1), state.plastic.calculate);

    state.population.unemployed.calculate = _.partial(value, state.population);
    state.population.unemployed.calculate = _.compose(_.partial(sub_from, state.plastic.gatherer, 1), state.population.unemployed.calculate);

    state.plastic.gatherer.max.calculate = _.partial(value, state.population.unemployed);
    state.plastic.gatherer.max.calculate = _.compose(_.partial(add_to, state.plastic.gatherer, 1), state.plastic.gatherer.max.calculate);

    state.plastic.nearby.calculate = old;
    state.plastic.nearby.calculate = _.compose(_.partial(sub_from, state.plastic.rate, 1), state.plastic.nearby.calculate);

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

        // fill in new variables that were not present in loaded data
        var defaultData = getDefaultData();
        recursiveDefaults(state, defaultData);
    }


    return defineNonData(state);
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
    setFloat("waterRate",getValue(state.water.rate));
}
function displayPlastic() {
    setInt("plastic",getValue(state.plastic));
    setFloat("plasticRate",getValue(state.plastic.rate));
    setInt("plasticNearby",getValue(state.plastic.nearby));
}
function displayResources() {
    displayPlastic();
}
function displayWaterSupplies() {
    setInt("waterSupplies", getValue(state.water.supplies));
    setInt("waterSuppliesEffect", getValue(state.water.supplies.effect));
    setCost("waterSuppliesCost", state.water.supplies.build, state.water.supplies);
}
function displayWaterReservoirs() {
    setInt("waterReservoirs", getValue(state.water.reservoirs));
    setInt("waterReservoirsEffect", getValue(state.water.reservoirs.effect));
    setCost("waterReservoirsCost", state.water.reservoirs.build, state.water.reservoirs);
}
function displayBuildings() {
    displayWaterSupplies();
    displayWaterReservoirs();
}
function displayPopulation() {
    setInt("population",getValue(state.population));
    setInt("populationMax",getValue(state.population.max));
}
function displayJobs() {
    setInt("unemployed",getValue(state.population.unemployed));
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

function build(recipe, n) {
    var applicable = true;
    for (var i = recipe.length - 1; i >= 0; i--) {
        console.log(recipe[i]);
        if (recipe[i].variable.current+recipe[i].amount<0){
            applicable = false;
            break;
        }
    }
    if(applicable) {
        for (var i = recipe.length - 1; i >= 0; i--) {
            increment(recipe[i].variable,recipe[i].amount);
        }
    }
}

function swim() {
    log("Swimming to another area..");
    log("Found new resources");
    apply_calculate_suffix(state.plastic.nearby,"swim");

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
}
function resetGame() {
    resetGameNoLog();
    log("Resetting game");
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
    apply_calculate(state.plastic.rate);
    apply_calculate(state.plastic.nearby);
    apply_calculate(state.plastic);
    apply_calculate(state.population.unemployed);
    apply_calculate(state.plastic.gatherer.max);

    // Display
    displayAll();
}

resetGameNoLog();
load();
displayAll();

loop_interval = window.setInterval(loop, 1000);