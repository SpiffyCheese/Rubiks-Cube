
//Functions

function onClick(e) {

    saveClick(e);
    clickTrigger();

}

function saveClick(e) {

    clickX=e.clientX;
    clickY=e.clientY;

}

function clickTrigger() {

    console.log(clickX, clickY);
    addButtonFunctionality();

}

function onKey(e) {

    saveKey(e);
    keyTrigger();

}

function saveKey(e) {

    key = e.keyCode;

}

function keyTrigger() {

    console.log("Do Something");

}

//Fullscreen

function fullscreenKeys(e) {

    if (e.key==="f") fullscreenToggled ? closeFullscreen() : openFullscreen();

}

function toggleFStoggle() {

    fullscreenToggled=!fullscreenToggled;

}

var elem = document.documentElement;

function openFullscreen() {

    if (elem.webkitRequestFullscreen) {

        elem.webkitRequestFullscreen();

    }

}

function closeFullscreen() {

    if (document.webkitExitFullscreen) {

        document.webkitExitFullscreen();

    }

}

//Listeners
window.addEventListener("resize", resizeWindow);
addEventListener("keydown", fullscreenKeys);
addEventListener("webkitfullscreenchange", toggleFStoggle);
addEventListener("mousedown", onClick);
addEventListener("keydown", onKey);
