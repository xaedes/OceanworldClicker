
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
    var s = _.map(
        _.filter(
            build, 
            function (a) { return a.variable !== ignore; }),
        function(a) {return sprintf("%d %s",-a.amount,a.variable.name);})
        .join(", ");
    setInnerHTML(id,s);
}

old = function(val) {return val;};
zero = function(val) {return 0;};
add_to = function(add_variable,add_weight,val) {return val+getValue(add_variable)*getValue(add_weight)};

state = {};
state.population = {};
state.population.current = 1;
state.population.waterConsumation = -0.1;

state.plastic = {};
state.plastic.name = "plastic";
state.plastic.current = 0;
state.plastic.nearby = 10;
state.water = {};
state.water.current = 1;
state.water.calculate = old;
state.water.max = {};
state.water.max.current = 10;
state.water.max.calculate = zero; // begin with zero (omit old value)

state.water.rate = {};
state.water.rate.current = 0;
state.water.rate.calculate = zero; // begin with zero (omit old value)

state.water.supplies = {};
state.water.supplies.current = 1;
state.water.supplies.name = "supplies";
state.water.supplies.effect = 1;
state.water.supplies.build = [{'variable':state.water.supplies,'amount':1},{'variable':state.plastic,'amount':-10}];


state.water.reservoirs = {};
state.water.reservoirs.name = "Water reservoir";
state.water.reservoirs.current = 1;
state.water.reservoirs.effect = 10;
state.water.reservoirs.build = [{'variable':state.water.reservoirs,'amount':1},{'variable':state.plastic,'amount':-10}];

// define calculations 
state.water.rate.calculate = _.compose(_.partial(add_to, state.population, state.population.waterConsumation), state.water.rate.calculate);
state.water.rate.calculate = _.compose(_.partial(add_to, state.water.supplies, state.water.supplies.effect), state.water.rate.calculate);

state.water.max.calculate = _.compose(_.partial(add_to, state.water.reservoirs, state.water.reservoirs.effect), state.water.max.calculate);

state.water.calculate = _.compose(_.partial(add_to, state.water.rate, 1), state.water.calculate);

state.log = []
// For the time now
// http://stackoverflow.com/a/10211214/798588
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function log(msg) {
    state.log.push(msg);
    console.log(msg);
    date = new Date().timeNow()
    document.getElementById("log").innerHTML = "<div>" + date + " " + msg + "</div>" + document.getElementById("log").innerHTML;
}

function displayWater() {
    setFloat("water",state.water.current);
    setFloat("waterMax",state.water.max.current);
    setInt("waterSupplies",state.water.supplies.current);
    setFloat("waterRate",state.water.rate.current);
}
function displayPlastic() {
    setInt("plastic",state.plastic.current);
    setInt("plasticNearby",state.plastic.nearby);
}
function displayResources() {
    displayPlastic();
}
function displayWaterSupplies() {
    setInt("waterSupplies", state.water.supplies.current);
    setInt("waterSuppliesEffect", state.water.supplies.effect);
    setCost("waterSuppliesCost", state.water.supplies.build, state.water.supplies);
}
function displayWaterReservoirs() {
    setInt("waterReservoirs", state.water.reservoirs.current);
    setInt("waterReservoirsEffect", state.water.reservoirs.effect);
    setCost("waterReservoirsCost", state.water.reservoirs.build, state.water.reservoirs);
}
function displayBuildings() {
    displayWaterSupplies();
    displayWaterReservoirs();
}

function displayAll() {
    displayWater();
    displayResources();
    displayBuildings();
    // displayLog();
}
function copy(variable) {

}
function getValue(variable) {
    if(typeof variable == 'number') {
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
            variable.current = Math.min(variable.current, variable.max.current);
        }    
    }
    return variable;
}
function increment(variable, incr) {
    if(!isNaN(incr)){
        if(variable.hasOwnProperty("nearby") && (incr > 0)) {
            incr = Math.min(incr,variable.nearby);
            variable.nearby -= incr;
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
function random(min,max) {
    return Math.random() * (max-min) + min;
}
function swim() {
    log("Found new resources");
    state.plastic.nearby = random(10-5,10+5);
}

function apply_calculate(variable) {
    if(variable.hasOwnProperty("calculate")){
        setValue(variable, variable.calculate(getValue(variable)));
    }
}

function loop() {
    apply_calculate(state.water.max);
    apply_calculate(state.water.rate);
    apply_calculate(state.water);

    displayAll();
}

displayAll();
loop_interval = window.setInterval(loop, 1000);