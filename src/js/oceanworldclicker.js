
function setInnerHTML(id,html) {
    document.getElementById(id).innerHTML = html;
}
function setFloat(id,flt) {
    setInnerHTML(id,sprintf("%.2f",flt));
}

state = {};
state.water = {};
state.water.current = 1;
state.water.max = 10;
state.water.supplies = 1;
state.water.suppliesEffect = 1;
state.water.rate = 0;

function updateWater() {
    setFloat("water",state.water.current);
    setFloat("waterMax",state.water.max);
    setFloat("waterSupplies",state.water.supplies);
    setFloat("waterRate",state.water.rate);
}

function updateAll() {
    updateWater();
}

function loop() {
    // calculate water rate
    state.water.rate = 0;
    state.water.rate -= 0.1;
    state.water.rate += 1 * state.water.suppliesEffect * state.water.supplies;
    // apply water rate
    state.water.current += state.water.rate;
    state.water.current = Math.min(state.water.current, state.water.max);
    updateAll();
}

updateAll();
loop_interval = window.setInterval(loop, 1000);