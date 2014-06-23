
function setInnerHTML(id,html) {
    document.getElementById(id).innerHTML = html;
}
function setFloat(id,flt) {
    setInnerHTML(id,sprintf("%.2f",flt));
}

state = {};
state.water = {};
state.water.current = 100;
state.water.max = 100;

function updateWater() {
    setFloat("water",state.water.current);
    setFloat("waterMax",state.water.max);
}

function updateAll() {
    updateWater();
}

function loop() {
    state.water.current -= 0.1;
    updateAll();
}

updateAll();
loop_interval = window.setInterval(loop, 1000);