
/*

 File Organization Layout:

 Line:   Structure Type:

 []      *File Organization Layout
 []      #initializeColors
 []          intializeTempColors
 []      #Turn & Color Shift Math
 []          #Layer Turns
 []              _/OutsideTurns
 []                  F   R   U   L   B   D
 []                  Fp  Ro  Up  Lp  Bp  Dp
 []              _/InsideTurns
 []                  M   E   S
 []                  Mp  Ep  Sp
 []          #Directional Rotation Turns
 []              X   Y   Z
 []              Xp  Yp  Zp
 []          #Orientation Rotation Turns
 []              RTT
 []              RTTp

*/

//initializeColors v

var color = new Array(54);
var tempColor = new Array(54);

function initializeTempColors() {

    for (var i=0; i<=53; i++) tempColor[i]=color[i];

}

//initializeColors ^

//Turn & Rotation Color Shift Math vv

//Layer Turns v

//Outside Turns

function F() {

    initializeTempColors();
    color[24]=tempColor[0];
    color[21]=tempColor[1];
    color[18]=tempColor[2];
    color[9+6]=tempColor[9];
    color[10+2]=tempColor[10];
    color[11-2]=tempColor[11];
    color[12+4]=tempColor[12];
    color[14-4]=tempColor[14];
    color[15+2]=tempColor[15];
    color[16-2]=tempColor[16];
    color[17-6]=tempColor[17];
    color[51]=tempColor[18];
    color[52]=tempColor[21];
    color[53]=tempColor[24];
    color[0]=tempColor[38];
    color[1]=tempColor[41];
    color[2]=tempColor[44];
    color[44]=tempColor[51];
    color[41]=tempColor[52];
    color[38]=tempColor[53];
}

function Fp() {

    for (var c=0;c<3;c++) F();

}

function R() {

    initializeTempColors();
    color[33]=tempColor[2];
    color[30]=tempColor[5];
    color[27]=tempColor[8];
    color[8]=tempColor[17];
    color[5]=tempColor[14];
    color[2]=tempColor[11];
    color[18+6]=tempColor[18];
    color[19+2]=tempColor[19];
    color[20-2]=tempColor[20];
    color[21+4]=tempColor[21];
    color[23-4]=tempColor[23];
    color[24+2]=tempColor[24];
    color[25-2]=tempColor[25];
    color[26-6]=tempColor[26];
    color[53]=tempColor[27];
    color[50]=tempColor[30];
    color[47]=tempColor[33];
    color[11]=tempColor[47];
    color[14]=tempColor[50];
    color[17]=tempColor[53];

}

function Rp() {

    for (var c=0;c<3;c++) R();

}

function U() {

    initializeTempColors();
    color[0+6]=tempColor[0];
    color[1+2]=tempColor[1];
    color[2-2]=tempColor[2];
    color[3+4]=tempColor[3];
    color[5-4]=tempColor[5];
    color[6+2]=tempColor[6];
    color[7-2]=tempColor[7];
    color[8-6]=tempColor[8];
    color[42]=tempColor[15];
    color[43]=tempColor[16];
    color[44]=tempColor[17];
    color[15]=tempColor[24];
    color[16]=tempColor[25];
    color[17]=tempColor[26];
    color[24]=tempColor[33];
    color[25]=tempColor[34];
    color[26]=tempColor[35];
    color[33]=tempColor[42];
    color[34]=tempColor[43];
    color[35]=tempColor[44];

}

function Up() {

    for (var c=0;c<3;c++) U();

}

function L() {

    initializeTempColors();
    color[9]=tempColor[0];
    color[12]=tempColor[3];
    color[15]=tempColor[6];
    color[45]=tempColor[9];
    color[48]=tempColor[12];
    color[51]=tempColor[15];
    color[6]=tempColor[29];
    color[3]=tempColor[32];
    color[0]=tempColor[35];
    color[36+6]=tempColor[36];
    color[37+2]=tempColor[37];
    color[38-2]=tempColor[38];
    color[39+4]=tempColor[39];
    color[41-4]=tempColor[41];
    color[42+2]=tempColor[42];
    color[43-2]=tempColor[43];
    color[44-6]=tempColor[44];
    color[35]=tempColor[45];
    color[32]=tempColor[48];
    color[29]=tempColor[51];

}

function Lp() {

    for (var c=0;c<3;c++) L();

}

function B() {

    initializeTempColors();
    color[36]=tempColor[6];
    color[39]=tempColor[7];
    color[42]=tempColor[8];
    color[8]=tempColor[20];
    color[7]=tempColor[23];
    color[6]=tempColor[26];
    color[27+6]=tempColor[27];
    color[28+2]=tempColor[28];
    color[29-2]=tempColor[29];
    color[30+4]=tempColor[30];
    color[32-4]=tempColor[32];
    color[33+2]=tempColor[33];
    color[34-2]=tempColor[34];
    color[35-6]=tempColor[35];
    color[47]=tempColor[36];
    color[46]=tempColor[39];
    color[45]=tempColor[42];
    color[20]=tempColor[45];
    color[23]=tempColor[46];
    color[26]=tempColor[47];

}

function Bp() {

    for (var c=0;c<3;c++) B();

}

function D() {

    initializeTempColors();
    color[18]=tempColor[9];
    color[19]=tempColor[10];
    color[20]=tempColor[11];
    color[27]=tempColor[18];
    color[28]=tempColor[19];
    color[29]=tempColor[20];
    color[36]=tempColor[27];
    color[37]=tempColor[28];
    color[38]=tempColor[29];
    color[9]=tempColor[36];
    color[10]=tempColor[37];
    color[11]=tempColor[38];
    color[45+6]=tempColor[45];
    color[46+2]=tempColor[46];
    color[47-2]=tempColor[47];
    color[48+4]=tempColor[48];
    color[50-4]=tempColor[50];
    color[51+2]=tempColor[51];
    color[52-2]=tempColor[52];
    color[53-6]=tempColor[53];

}

function Dp() {

    for (var c=0;c<3;c++) D();

}

//Inside Turns

function M() {

    initializeTempColors();
    color[10]=tempColor[1];
    color[13]=tempColor[4];
    color[16]=tempColor[7];
    color[46]=tempColor[10];
    color[49]=tempColor[13];
    color[52]=tempColor[16];
    color[7]=tempColor[28];
    color[4]=tempColor[31];
    color[1]=tempColor[34];
    color[28]=tempColor[52];
    color[31]=tempColor[49];
    color[34]=tempColor[46];

}

function Mp() {

 for (var c=0;c<3;c++) M();

}

function E() {

    initializeTempColors();
    for (var c=0;c<3;c++) color[12+c]=tempColor[39+c];
    for (var c=0;c<9;c++) color[12+c%3+9*(Math.floor(c/3)+1)]=tempColor[12+c%3+9*Math.floor(c/3)];
}

function Ep() {

    for (var c=0;c<3;c++) E();

}

function S() {

    initializeTempColors();
    color[25]=tempColor[3];
    color[22]=tempColor[4];
    color[19]=tempColor[5];
    color[50]=tempColor[25];
    color[49]=tempColor[22];
    color[48]=tempColor[19];
    color[5]=tempColor[43];
    color[4]=tempColor[40];
    color[3]=tempColor[37];
    color[43]=tempColor[48];
    color[40]=tempColor[49];
    color[37]=tempColor[50];

}

function Sp() {

    for (var c=0;c<3;c++) S();

}

//Layer Turns ^

//Directional Rotation Turns v

function X() {

    R();
    Mp();
    Lp();

}

function Xp() {

    Rp();
    M();
    L();

}

function Y() {

    U();
    Ep();
    Dp();

}

function Yp() {

    Up();
    E();
    D();

}

function Z() {

    F();
    S();
    Bp();

}

function Zp() {

    Fp();
    Sp();
    B();

}

//Directional Rotation Turns ^

//Orientation Rotation Turns v

//Rotate Cube One Third of Tau Radians
function RTT() {

    X();
    Y();

}

function RTTp() {

    Yp();
    Xp();

}

//Orientation Rotation Turns ^

//Turn & Rotation Color Shift Math ^^
