//Canvas Setup v
var WSOx = 0;
var WSOy = 0;
var BGC = "#282c34";
var canvas = document.querySelector("canvas");
canvas.style.background = BGC;
var width = window.innerWidth - WSOx;
var height = window.innerHeight - WSOy;
canvas.width = width;
canvas.height = height;

var c = canvas.getContext("2d");

//Canvas Setup ^

//Constants
const sqrt3 = Math.sqrt(3);
const pi = Math.PI;

//Preferentials v

//Cube Center
var xC = width/2;
var yC = height/2;
console.log(xC, yC);

//Cube Size
var css = 3;
//Cubelet Size
var cls = 48+16*css;
//Cube Size
var cs = 3*cls;

//Line Size
var ls = 3;
var lineWidth=cls/(8+(3-ls)*2);

//cubeColorOrder
//WCA: WGRBOY
var colorO=["W","G","R","B","O","Y"];

//Cube Frame
var frameColor="#000000";

//Cube Buttons
var BpX, BpY, SBpX, SBpY, RBpX, RBpY, TBn, RBn, OBn;
var buttonColorB="#000000";
var buttonColor0="#202020";
var buttonColor1="#404040";
var buttonColor2="#402040";
var buttonColor3="#804080";
var taskButtonColor_O="#282828";
var taskButtonColor_I="#505050";
var TBC_O = buttonColor0;
var TBC_I = buttonColor1;
var RBC_O = buttonColor2;
var RBC_I = buttonColor3;
var OBC = buttonColorB;
var BR0 = 3*cls/7;
var BR1 = 3*cls/8;
var BR = BR0;
var SBW = 60*96/17;
var TBW = 12*96/5;
var TBH = SBW/4;
var TBO = 20;
var TBES = 10;

//Settings Menu
var SMEC = "#282828";
var SMWC = "#505050";
var SMW = 2*width/5;
var SMH = height/2;
var XBS = (SMW+SMH)/24;
var MEW = (SMW+SMH)/72;
var XWidth = XBS/6;
var settingsFontSize=SMH/10;
if (SMH>=height/2) settingsFontSize=height/22;

//Sounds
var soundEnabled = true;
var turnSound = new Audio("sounds/rubixturn.mp3");
var playSound = true;

//Fonts
var cubeStatusFont = "Arial";
var cubeStatusFontSize = 72;
var taskButtonFont = "Arial";
var taskButtonFontSize = 72;
var settingsFont = "Arial";

//Preferential Variables ^

//Two Demensional Cube/Cubelet Width
var TDWl = cs*sqrt3/6;
var TDW = 3*TDWl;

//Directional Angles
var a = 5*pi/6;
var b = pi/6;

var Ca = Math.cos(a);
var Cb = Math.cos(b);
var Sa = Math.sin(a);
var Sb = Math.sin(b);

//Sticker Coords
var coordA, coordB, coordC;

//2D Cube Map
var cubeMapEnabled = false;
var cmFs= 64;
var cmPx = width-5*cmFs;
var cmPy = height/6;
var cmSS = cmFs/3;
var cmSxP;
var cmSyP;
var cmLW = 2*cmSS/3;

//cubeStatus
var correctPos;

//cubeOrientationCorrection
var wFace, gFace;

//Scramble
var randomInteger = new Array(18);

//Settings Menu
var FWsettingTextPx, CSsettingTextPx, CMTBtextX, STBtextX;
FWsettingTextPx = CSsettingTextPx = CMTBtextX = STBtextX = TBO+MEW;

var renderSB = true;
var XBxP = SMW+TBO-MEW-XBS;
var XByP = height-SMH-TBO+MEW;
var FWsettingTextPy = TBO+4*MEW/3+height-SMH-4096/SMH;
var FWSBpX = FWsettingTextPx+7.5*settingsFontSize;
var FWSBpY = FWsettingTextPy-7*settingsFontSize/8;
var CSsettingTextPy = FWsettingTextPy+height/16;
var CSSBpX = CSsettingTextPx+7.5*settingsFontSize;
var CSSBpY = CSsettingTextPy-7*settingsFontSize/8;
var TBr = 16;
var CMTBtextY = CSsettingTextPy+height/16;
var CMTBpX = CMTBtextX+5.2*settingsFontSize+TBr;
var CMTBpY = CMTBtextY+settingsFontSize/12-TBr;
var STBtextY = CMTBtextY+height/16;
var STBpX = STBtextX+3.5*settingsFontSize+TBr;
var STBpY = STBtextY+settingsFontSize/12-TBr;
var timesOpenedOrClosed = 0;
var opened;
var closing;

//Memory Management
var reRenderCube;

//Global Variables ^^

//Graphics

//Canvas Setup v
var WSOx = 24;
var WSOy = 28;
var BGC = "#282c34";
var canvas = document.querySelector("canvas");
canvas.style.background = BGC;
var width = window.innerWidth - WSOx;
var height = window.innerHeight - WSOy;
canvas.width = width;
canvas.height = height;

var c = canvas.getContext("2d");

//Canvas Setup ^

//Input Utilization
var clickX, clickY, Key;
var fullscreenToggled = false;
