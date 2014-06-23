
function setInnerHTML(id,html) {
    document.getElementById(id).innerHTML = html;
}
function setFloat(id,value) {
    setInnerHTML(id,sprintf("%.2f",value));
}
function setInt(id,value) {
    setInnerHTML(id,sprintf("%d",value));
}

state = {};
state.water = {};
state.water.current = 1;
state.water.max = 10;
state.water.supplies = 1;
state.water.suppliesEffect = 1;
state.water.rate = 0;
state.plastic = {};
state.plastic.current = 0;
state.plastic.nearby = 10;
state.log = []

function log(msg) {
    state.log.push(msg);
    console.log(msg);
    document.getElementById("log").innerHTML += "<div>" + msg + "</div>";
}

function updateWater() {
    setFloat("water",state.water.current);
    setFloat("waterMax",state.water.max);
    setInt("waterSupplies",state.water.supplies);
    setFloat("waterRate",state.water.rate);
}
function updatePlastic() {
    setInt("plastic",state.plastic.current);
    setInt("plasticNearby",state.plastic.nearby);
}
function updateResources() {
    updatePlastic();
}

function updateAll() {
    updateWater();
    updatePlastic();
    updateLog();
}

function increment(variable, incr) {
    if(variable.hasOwnProperty("nearby")) {
        incr = Math.min(incr,variable.nearby);
        variable.nearby -= incr;
    }
    variable.current += incr;
    if(variable.hasOwnProperty("max")) {
        variable.current = Math.min(variable.current, variable.max);
    }
}
function decrement(variable, decr) {
    increment(variable, -decr);
}
function random(min,max) {
    return Math.random() * (max-min) + min;
}
function swim() {
    log("Found new resources");
    state.plastic.nearby = random(10-5,10+5);
}

function loop() {
    // calculate water rate
    state.water.rate = 0;
    state.water.rate -= 0.1;
    state.water.rate += 1 * state.water.suppliesEffect * state.water.supplies;
    // apply water rate
    increment(state.water, state.water.rate)
    updateAll();
}

updateAll();
loop_interval = window.setInterval(loop, 1000);