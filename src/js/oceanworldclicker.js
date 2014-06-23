
function setInnerHTML(id,html) {
    document.getElementById(id).innerHTML = html;
}

state = {};
state.water = 0;

setInnerHTML("water",state.water);