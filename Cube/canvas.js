var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

updateWindowDemensions();

function resizeWindow() {

    updateWindowDemensions();
    renderGraphics();

}

function updateWindowDemensions() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}
