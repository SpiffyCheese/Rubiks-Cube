
//Code Start v

loadCode();

//Code Start ^

//Functions vvv

//Loads and initializes variables.
function loadCode () {

    reset();
    addButtons();

}

function reloadCSVariables() {

    cls = 48+16*css;
    cs = 3*cls;

    lineWidth=cls/(8+(3-ls)*2);

    BR0 = 3*cls/7;
    BR1 = 3*cls/8;

    TDWl = cs*sqrt3/6;
    TDW = 3*TDWl;

}

function renderGraphics() {

    console.log('test');
    reloadCSVariables();
    c.clearRect(0, 0, width, height);
    renderCube();
    renderButtons();
    renderCubeStatus();
    if (opened && !closing) renderSettingsMenu();
    if (cubeMapEnabled) renderCubeMap();

}

//Resets cube to solved state.
function reset() {

    for (var c=0;c<54;c++) if (c<9*(Math.floor(c/9)+1)) color[c]=colorO[Math.floor(c/9)];
    renderCube();
    renderCubeStatus();
    if (cubeMapEnabled) renderCubeMap();

}

//Animates the solving process.
function solve() {



}

//Scrambles the cube.
function scramble() {

    for (var i=0;i<18;i++) randomInteger[i]=Math.floor(Math.random()*18);
    for (var i=0;i<20;i++) {

        TBn=randomInteger[i];
        executeTurn();

    }

    renderCube();
    renderCubeStatus();
    if (cubeMapEnabled) renderCubeMap();

}

//Calculates Distance

function dist(x0, y0, x1, y1) {

    var d;
    d=Math.sqrt(Math.pow(x1-x0, 2)+Math.pow(y1-y0, 2));
    return d;

}

function roundRect(x, y, width, height, radius, fill, stroke) {

    if (typeof stroke == "undefined") stroke = true;
    if (typeof radius == "undefined") radius = 5;
    if (typeof radius == "number") radius = {tl: radius, tr: radius, br: radius, bl: radius};
    else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }

    c.beginPath();
    c.moveTo(x+radius.tl, y);
    c.lineTo(x+width-radius.tr, y);
    c.quadraticCurveTo(x+width, y, x+width, y+radius.tr);
    c.lineTo(x+width, y+height-radius.br);
    c.quadraticCurveTo(x+width, y+height, x+width-radius.br, y+height);
    c.lineTo(x+radius.bl, y+height);
    c.quadraticCurveTo(x, y+height, x, y+height-radius.bl);
    c.lineTo(x, y+radius.tl);
    c.quadraticCurveTo(x, y, x+radius.tl, y);
    c.closePath();
    if (fill) c.fill();
    if (stroke) c.stroke();

}

//Renders the Rubik's Cube.
function renderCube() {

    renderStickers();
    renderFrame();

}

//Sticker Implementation v

function getStickerCoords(x) {

    if (x/9<1) {

        coordA = 2-x%3;
        coordB = Math.floor(x/3);
        coordC = 0;

    } else if (x/9<2) {

        coordA = 2-x%3;
        coordB = 0;
        coordC = 2-Math.floor((x-9)/3);

    } else {

        coordA = 0;
        coordB = x%3;
        coordC = 2-Math.floor((x-18)/3);

    }

}

function determineStickerColor(color) {

    switch(color) {

        case "W": return "white"; break;
        case "G": return "green"; break;
        case "R": return "red"; break;
        case "B": return "blue"; break;
        case "O": return "orange"; break;
        case "Y": return "yellow"; break;
        default : return "black"; break;

    }

}

function renderStickers() {

    //Fix lineWidth Offset
    var loX, loY;

    for (var p=0;p<27;p++) {

        c.lineWidth = 3;
        c.fillStyle=c.strokeStyle=determineStickerColor(color[p]);
        c.beginPath();

        getStickerCoords(p);
        var xPos = xC+coordA*cls*Ca+coordB*cls*Cb;
        var yPos = yC-coordA*cls*Sa-coordB*cls*Sb+coordC*cls;
        var clsX = Ca*(cls-lineWidth);
        var clsY = Sa*(cls-lineWidth);

        if (p/9<1) {

            //Top Face
            loX = 0;
            loY = -lineWidth/2;
            c.moveTo(xPos+loX, yPos+loY);
            c.lineTo(xPos+loX+clsX, yPos+loY-clsY);
            c.lineTo(xPos+loX, yPos-loY-cls);
            c.lineTo(xPos+loX-clsX, yPos+loY-clsY);
            c.stroke();
            c.fill();

        } else if (p/9<2) {

            //Left Face
            loX = -lineWidth/2;
            loY = lineWidth/2-(cls/96)-2;
            c.moveTo(xPos+loX, yPos+loY);
            c.lineTo(xPos+loX+clsX, yPos+loY-clsY);
            c.lineTo(xPos+loX+clsX, yPos+loY+clsY);
            c.lineTo(xPos+loX, yPos-loY-6+cls);
            c.stroke();
            c.fill();

        } else {

            //Right Face
            loX = lineWidth/2;
            loY = lineWidth/2-(cls/96)-2;
            c.moveTo(xPos+loX, yPos+loY);
            c.lineTo(xPos+loX-clsX, yPos+loY-clsY);
            c.lineTo(xPos+loX-clsX, yPos+loY+clsY);
            c.lineTo(xPos+loX, yPos-loY-6+cls);
            c.stroke();
            c.fill();


        }

    }

}

//Sticker Implementation ^

//Cube Frame v

function renderFrame() {

    outerFrame();
    innerFrame();


}

function outerFrame() {

    c.beginPath();
    //Style
    c.strokeStyle = frameColor;
    c.lineWidth = lineWidth;
    //Lines to Center
    c.moveTo(xC-TDW, yC-cs/2);
    c.lineTo(xC, yC);
    c.lineTo(xC+TDW, yC-cs/2);
    c.moveTo(xC, yC);
    c.lineTo(xC, yC+cs);
    //Lines Around
    var d=1;
    for (var i=0;i<2;i++) {

        if (i==1) d=-1;
        c.lineTo(xC-d*TDW, yC+d*cs/2);
        c.lineTo(xC-d*TDW, yC-d*cs/2);
        c.lineTo(xC, yC-d*cs);

    }
    c.stroke();
    c.closePath();
    //Fix Sharp Edge
    c.beginPath();
    c.fillStyle=c.strokeStyle=BGC;
    c.lineWidth=1;
    c.moveTo(xC+lineWidth/2+1, yC-d*cs+lineWidth/4+1);
    c.lineTo(xC-lineWidth/2-1, yC-d*cs+lineWidth);
    c.lineTo(xC+lineWidth/2+1, yC-d*cs+lineWidth);
    c.stroke();
    c.fill();
    c.closePath();

}

function innerFrame() {

    c.beginPath();
    c.lineWidth=lineWidth;
    c.strokeStyle=frameColor;
    var d = 1;
    for (var i=0;i<2;i++) {

        if (i==1) d=-1;
        //Vertical
        c.moveTo(xC-d*TDWl, yC-cls/2);
        c.lineTo(xC-d*TDWl, yC+5*cls/2);
        c.moveTo(xC-d*2*TDWl, yC-cls);
        c.lineTo(xC-d*2*TDWl, yC+2*cls);
        //Horizontal
        c.moveTo(xC, yC+cls);
        c.lineTo(xC-d*TDW, yC-cls/2);
        c.moveTo(xC, yC+2*cls);
        c.lineTo(xC-d*TDW, yC+cls/2);

    }
    //Top Face
    for (var i=0;i<2;i++) {

        if (i==1) d=1;
        c.moveTo(xC+d*TDWl, yC-cls/2);
        c.lineTo(xC-d*2*TDWl, yC-2*cls);
        c.moveTo(xC+d*2*TDWl, yC-cls);
        c.lineTo(xC-d*TDWl, yC-5*cls/2);
        c.stroke();

    }
    c.closePath();

}

//Cube Frame ^

//Cube Buttons vv

function addButtons() {

    renderButtons();
    addButtonFunctionality();

}

//Render Buttons v

function renderButtons() {

    renderTurnButtons();
    renderRotationButtons();
    renderOrientationButtons();
    renderTaskButtons();
    renderSettingsButton();

}

function renderTurnButtons() {

    //Direction
    var xD, yD;
    //Top & Bot
    for (var k=0;k<4;k++) {

        xD=Math.pow(-1, k);
        yD=Math.pow(-1, Math.floor(k/2));

        for (var i=0;i<3;i++) {

            BR = BR0;
            TBpX = xC+xD*(i*cls*Ca+3*cls*Cb);
            TBpY = yC+yD*(i*cls*Sa+2*sqrt3*cls*Sb+cls/2);
            c.beginPath();
            c.fillStyle=TBC_O;
            c.arc(TBpX, TBpY, BR, 0, 2*pi, false);
            c.fill();
            BR=BR1;
            c.closePath();
            c.beginPath();
            c.fillStyle=TBC_I;
            c.arc(TBpX, TBpY, BR, 0, 2*pi, false);
            c.fill();
            c.closePath();

            //Left & Right
            if (k<2) {

                BR = BR0;
                TBpX = xC+xD*(3.2*cls*Cb+BR);
                TBpY = yC+(2.8*cls*Sb-i*cls-BR);
                c.beginPath();
                c.fillStyle=TBC_O;
                c.arc(TBpX, TBpY, BR, 0, 2*pi, false);
                c.fill();
                c.closePath();
                BR=BR1;
                c.beginPath();
                c.fillStyle=TBC_I;
                c.arc(TBpX, TBpY, BR, 0, 2*pi, false);
                c.fill();
                c.closePath();

            }

        }

    }

}

function renderRotationButtons() {

    //Angel Radius
    var aR = 4.4*cls;
    //Angel Offset
    var AO;
    for (var i=0;i<6;i++) {

        if (i<2) AO = -pi/48;
        else if (i<4) AO = pi/48;
        else AO = pi/48*((i%2)*2-1);

        RBpX = xC+aR*Math.cos(i*pi/3+AO);
        RBpY = yC+aR*Math.sin(i*pi/3+AO);
        BR = BR0;
        c.beginPath();
        c.fillStyle=RBC_O;
        c.arc(RBpX, RBpY, BR, 0, 2*pi, false);
        c.fill();
        c.closePath();
        BR=BR1;
        c.beginPath();
        c.fillStyle=RBC_I;
        c.arc(RBpX, RBpY, BR, 0, 2*pi, false);
        c.fill();
        c.closePath();

    }

}

function renderOrientationButtons() {

    for (var i=0;i<2;i++) {

        var xD = (i%2)*2-1;

        OBpX = xC+(xD*1.35*Ca*cs);
        OBpY = yC-1.35*Sa*cs;
        c.beginPath();
        c.fillStyle=c.strokeStyle=OBC;
        c.lineWidth=1.6*lineWidth;
        c.arc(OBpX, OBpY, 1.4*BR0, 3*pi/2, pi/2+xD*pi/6, (i==0) ? false : true);
        c.stroke();
        c.closePath();
        c.beginPath();
        c.moveTo(OBpX, OBpY-1.4*BR0-BR0/2);
        c.lineTo(OBpX, OBpY-1.4*BR0+BR0/2);
        c.lineTo(OBpX+xD*BR0/2, OBpY-1.4*BR0);
        c.lineTo(OBpX, OBpY-1.4*BR0-BR0/2);
        c.lineTo(OBpX, OBpY-1.4*BR0+BR0/2);
        c.stroke();
        c.fill();
        c.closePath();

    }

}

function renderTaskButtons() {

    c.lineWidth=TBES;
    renderResetButton();
    renderSolveButton();
    renderScrambleButton();

}

function renderResetButton() {

    c.strokeStyle = taskButtonColor_O;
    c.fillStyle = taskButtonColor_I;
    roundRect(width-TBW-TBO, height-3*(TBH+TBO), TBW, TBH, 24, true, true);
    c.font = taskButtonFontSize.toString()+"px "+ taskButtonFont;
    c.fillStyle="#000000";
    c.fillText("Reset", width-TBW, height-5*TBH/2-3*TBO/2);

}

function renderSolveButton() {

    c.strokeStyle = taskButtonColor_O;
    c.fillStyle = taskButtonColor_I;
    roundRect(width-TBW-TBO, height-2*(TBH+TBO), TBW, TBH, 24, true, true);
    c.font = taskButtonFontSize.toString()+"px "+ taskButtonFont;
    c.fillStyle="#000000";
    c.fillText("Solve", width-TBW, height-3*TBH/2-2*TBO/3);

}

function renderScrambleButton() {

    c.strokeStyle = taskButtonColor_O;
    c.fillStyle = taskButtonColor_I;
    roundRect(width-SBW-TBO, height-TBH-TBO, SBW, TBH, 24, true, true);
    c.font = taskButtonFontSize.toString()+"px "+ taskButtonFont;
    c.fillStyle="#000000";
    c.fillText("Scramble", width-SBW, height-TBH/2+TBO/3);

}

function renderSettingsButton() {

    if (renderSB==true) {

        settingsButton = new Image();
        settingsButton.src ="images/gearIcon.png";
        settingsButton.onload = function() {c.drawImage(settingsButton, 0, height-128)}

    }
    renderSB=true;

}

//Render Buttons ^

//Button Functionality v

function addButtonFunctionality() {

        //Gets Click Position
        var MxPos = clickX; //e.clientX-WSOx/2;
        var MyPos = clickY; //e.clientY-WSOy/2;

        testClickOnButton(MxPos, MyPos);
        executeTurnOrRotation();

}

//Mouse/Button Position Testing

function testClickOnButton(MxPos, MyPos) {

    testTurnButtons(MxPos, MyPos);
    testRotationButtons(MxPos, MyPos);
    testOrientationButtons(MxPos, MyPos);
    testTaskButtons(MxPos, MyPos);

    opened = (timesOpenedOrClosed%2==1);
    if (!opened) testSettingsButton(MxPos, MyPos);
    else testSettingsButtons(MxPos, MyPos);

}

function testTurnButtons(MxPos, MyPos) {

    for (var k=0;k<6;k++) {

        xD=Math.pow(-1, k);
        yD=Math.pow(-1, Math.floor(k/2));

        for (var i=0;i<3;i++) {

            if (k<4) {

                //Top & Both
                TBpX = xC+xD*(i*cls*Ca+3*cls*Cb);
                TBpY = yC+yD*(i*cls*Sa+2*sqrt3*cls*Sb+cls/2);

            } else {

                TBpX = xC+xD*(3.2*cls*Cb+BR);
                TBpY = yC+(2.8*cls*Sb-i*cls-BR);

            }

            var dTB = dist(MxPos, MyPos, TBpX, TBpY);
            if (dTB<BR) {

                TBn=(3*k+i); break;

            }

        }

    }

}

function testRotationButtons(MxPos, MyPos) {

    //Angel Radius
    var aR = 4.4*cls;
    //Angel Offset
    var AO;
    for (var i=0;i<6;i++) {

        if (i<2) AO = -pi/48;
        else if (i<4) AO = pi/48;
        else AO = pi/48*((i%2)*2-1);

        RBpX = xC+aR*Math.cos(i*pi/3+AO);
        RBpY = yC+aR*Math.sin(i*pi/3+AO);

        var dRB = dist(MxPos, MyPos, RBpX, RBpY);
        if (dRB<BR) {

            RBn=i; break;

        }

    }

}

function testOrientationButtons(MxPos, MyPos) {

    var xD;
    for (var i=0;i<2;i++) {

        xD = (i%2)*2-1;
        OBpX = xC-xD*1.4*Ca*cs;
        OBpY = yC-1.4*Sa*cs;

        var dOB = dist(MxPos, MyPos, OBpX, OBpY);
        if (dOB<BR) {

            OBn=i; break;

        }

    }

}

function testTaskButtons(MxPos, MyPos) {

    opened=(timesOpenedOrClosed%2==1);
    if (!opened) {

        testResetButton(MxPos, MyPos);
        testSolveButton(MxPos, MyPos);
        testScrambleButton(MxPos, MyPos);

    }

}

function testResetButton(MxPos, MyPos) {

    if (((MxPos>(width-TBW-TBO/2)) && (MxPos<(width-TBO))) && ((MyPos>(height-3*TBH-5*TBO/2)) && (MyPos<(height-2*TBH-3*TBO)))) reset();

}

function testSolveButton(MxPos, MyPos) {

    if (((MxPos>(width-TBW-TBO/2)) && (MxPos<(width-TBO))) && ((MyPos>(height-2*TBH-3*TBO/2)) && (MyPos<(height-TBH-2*TBO)))) solve();

}

function testScrambleButton(MxPos, MyPos) {

    if (((MxPos>(width-SBW-TBO/2)) && (MxPos<(width-TBO))) && ((MyPos>(height-1*TBH-TBO/2)) && (MyPos<(height-TBO)))) scramble();

}

function testSettingsButton(MxPos, MyPos) {

    if (dist(64, height-64, MxPos, MyPos)<36*Math.sqrt(2)) {

        renderSettingsMenu();
        timesOpenedOrClosed++;

    }

}

function testSettingsButtons(MxPos, MyPos) {

    testCloseMenuButton(MxPos, MyPos);
    testFrameWidthSettingButton(MxPos, MyPos);
    testCubeSizeSettingButton(MxPos, MyPos);
    testCubeMapToggle(MxPos, MyPos);
    testSoundToggle(MxPos, MyPos);

}

function testCloseMenuButton(MxPos, MyPos) {

    if (((MxPos>XBxP) && (MxPos<XBxP+XBS)) && ((MyPos>XByP) && (MyPos<XByP+XBS))) {

        timesOpenedOrClosed++;
        TBn = RBn = OBn = -1;
        closeMenu();

    }

}

function testFrameWidthSettingButton(MxPos, MyPos) {

    if (((MxPos>FWSBpX) && (MxPos<FWSBpX+2*settingsFontSize)) && ((MyPos>FWSBpY) && (MyPos<FWSBpY+settingsFontSize))) {

        if (MxPos<FWSBpX+settingsFontSize) {

            if (ls>0) ls--;

        } else {

            if (ls<4) ls++;

        }

        renderSB = false;
        reRenderObjects();

    }

}

function testCubeSizeSettingButton(MxPos, MyPos) {

    if (((MxPos>CSSBpX) && (MxPos<CSSBpX+2*settingsFontSize)) && ((MyPos>CSSBpY) && (MyPos<CSSBpY+settingsFontSize))) {

        if (MxPos<CSSBpX+settingsFontSize) {

            if (css>0) css--;

        } else {

            if (css<4) css++;

        }

        renderSB = false;
        reRenderObjects();

    }

}

function testCubeMapToggle(MxPos, MyPos) {

    if (TBr>dist(MxPos, MyPos, CMTBpX, CMTBpY)) {

        cubeMapEnabled = !cubeMapEnabled;
        renderSB = false;
        reRenderObjects();

    }

}

function testSoundToggle(MxPos, MyPos) {

    if (TBr>dist(MxPos, MyPos, STBpX, STBpY)) {

        soundEnabled = !soundEnabled;
        renderSB = false;
        reRenderObjects();

    }

}

//Execution

function executeTurnOrRotation() {

    opened=(timesOpenedOrClosed%2==1);
    if (opened) TBn = RBn = OBn = -1;
    else {

        reRenderCube = 0;

        executeTurn();
        executeRotation();
        executeOrientation();

        TBn=RBn=OBn=-1;

        if (reRenderCube!=3) {

            renderCube();
            renderCubeStatus();
            if (cubeMapEnabled) renderCubeMap();
            if (playSound && soundEnabled) turnSound.play();

        }

    }

}

function executeTurn() {

    switch (TBn) {

        case 0: Bp(); break;
        case 1: S(); break;
        case 2: F(); break;
        case 3: L(); break;
        case 4: M(); break;
        case 5: Rp(); break;
        case 6: R(); break;
        case 7: Mp(); break;
        case 8: Lp(); break;
        case 9: Fp(); break;
        case 10: Sp(); break;
        case 11: B(); break;
        case 12: D(); break;
        case 13: E(); break;
        case 14: Up(); break;
        case 15: Dp(); break;
        case 16: Ep(); break;
        case 17: U(); break;
        default: reRenderCube++; break;

    }

    if (reRenderCube>0) playSound=false; else playSound=true;

}

function executeRotation() {

    switch (RBn) {

        case 0: Yp(); break;
        case 1: Z(); break;
        case 2: Xp(); break;
        case 3: Y(); break;
        case 4: Zp(); break;
        case 5: X(); break;
        default: reRenderCube++; break;

    }

}

function executeOrientation() {

    switch (OBn) {

        case 0: RTT(); break;
        case 1: RTTp(); break;
        default: reRenderCube++; break;

    }

}

//Button Functionality ^

//Cube Buttons ^^

//Cube Map v

function renderCubeMap() {

    //Map Edge Color
    c.strokeStyle="#000000";
    //Map Edge Width
    c.lineWidth=cmLW;

    k=1/2;

    CMtopBotFaces();
    CMmiddleFaces();

}

function CMmiddleFaces() {

    for (var face=0;face<4;face++) {

        //Face Sticker Displacement
        fsd = 4*(face-1);

        for (var column=0;column<3;column++) {

            var cmSyP = column*(cmSS+cmLW*k);

            for (var row=0;row<3;row++) {

                cmSxP = (fsd+row)*cmSS + row*cmLW*k;
                c.beginPath();
                c.rect(cmPx+cmSxP, cmPy+cmSyP, cmSS, cmSS);
                c.fillStyle=determineStickerColor(color[9*((face+3)%4+1)+6-3*column+row]);
                c.stroke();
                c.fill();
                c.closePath();

            }

        }

    }

}

function CMtopBotFaces() {

    for (var face=0;face<2;face++) {

        //Face Sticker Displacement
        fsd = 4*(2*face-1);

        for (var column=0;column<3;column++) {

            var cmSyP = (column+fsd)*cmSS + column*cmLW*k;

            for (var row=0;row<3;row++) {

                cmSxP = (row)*(cmSS+cmLW*k);
                c.beginPath();
                c.fillStyle=determineStickerColor(color[((face==0) ? 0 : 45)+6-3*column+row]);
                c.rect(cmPx+cmSxP, cmPy+cmSyP, cmSS, cmSS);
                c.stroke();
                c.fill();
                c.closePath();

            }

        }

    }

}

//Cube Map ^

//Cube Status v

function checkSolved() {

    correctPos = 0;
    correctCubeOrientation(false);
    for (var c=0;c<54;c++) if ((c<9*(Math.floor(c/9)+1)) && (color[c]==colorO[Math.floor(c/9)])) correctPos++;
    correctCubeOrientation(true);
    if (correctPos==54) return true;
    else return false;

}

function renderCubeStatus() {

    c.clearRect(0, 0, cubeStatusFontSize*5.2, 3*cubeStatusFontSize/2+8);
    c.font = cubeStatusFontSize.toString()+"px "+cubeStatusFont;
    c.fillStyle="Black";
    if (checkSolved()) c.fillText("Solved", 12, cubeStatusFontSize);
    else c.fillText("Scrambled", 12, cubeStatusFontSize);
    c.font = (cubeStatusFontSize/2).toString()+"px "+cubeStatusFont;
    c.fillText("Stickers Solved: " + Math.round(correctPos/27*50) + "%", 12, 3*cubeStatusFontSize/2+6);

}

function locateWhiteCenter() {

    for (var c=0;c<6;c++) if (color[c*9+5]=="W") return c;

}

function locateGreenCenter() {

    for (var c=0;c<6;c++) if (color[c*9+5]=="G") return c;

}

function correctCubeOrientation(undo) {

    if (undo == false) {

        var startI = 0;
        var loops=1;

    } else {

        var startI = 1;
        var loops=12;

    }

    for (i=startI;i<loops;i++) {

        if (i==0) wFace = locateWhiteCenter();
        switch (wFace) {

            case 1: X(); break;
            case 2: Zp(); break;
            case 3: Xp(); break;
            case 4: Z(); break;
            case 5: X(); X(); break;

        }
        if (i==0) gFace = locateGreenCenter();
        switch (gFace) {

            case 2: Y(); break;
            case 3: Y(); Y(); break;
            case 4: Yp(); break;

        }

    }

}

//Cube Status ^

//Settings Menu v

function renderSettingsMenu() {

    renderMenuWindow();
    renderMenuCloseButton();
    renderSettings();

}

function renderMenuWindow() {

    c.strokeStyle=SMEC;
    c.fillStyle=SMWC;
    c.lineWidth=MEW;
    roundRect(TBO, height-SMH-TBO, SMW, SMH, 24, true, true);

}

function renderMenuCloseButton () {

    c.beginPath();
    c.lineWidth = XWidth;
    c.strokeStyle = "#000000";

    for (var i=0;i<2;i++) {

        c.moveTo(XBxP+i*XBS, XByP);
        c.lineTo(XBxP+((i+1)%2)*XBS, XByP+XBS);
        c.stroke();

    }

    c.closePath();

}

function renderSettings() {

    renderFrameWidthSetting();
    renderFrameWidthSettingButton();
    renderCubeSizeSetting();
    renderCubeSizeSettingButton();
    renderSoundToggle();
    renderCubeMapToggle();

}

function renderFrameWidthSetting() {

    c.beginPath();
    c.fillStyle = "#000000";
    c.font = settingsFontSize.toString()+"px "+ settingsFont;
    c.fillText("Frame Width: " + ls, FWsettingTextPx, FWsettingTextPy);
    c.closePath();

}

function renderFrameWidthSettingButton() {

    c.beginPath();
    c.lineWidth = settingsFontSize/6;
    c.strokeStyle = "#0c0c0c";
    c.fillStyle = SMWC;
    roundRect(FWSBpX, FWSBpY, 2*settingsFontSize, settingsFontSize, XBS/8, true, true);
    c.moveTo(FWSBpX+settingsFontSize, FWSBpY);
    c.lineTo(FWSBpX+settingsFontSize, FWSBpY+settingsFontSize);
    c.stroke();

    c.fillStyle = "#000000";
    c.fillText("-  +", 7.82*settingsFontSize+TBO+MEW, FWsettingTextPy);
    c.closePath();

}

function renderCubeSizeSetting() {

    c.beginPath();
    c.fillStyle = "#000000";
    c.font = settingsFontSize.toString()+"px "+ settingsFont;
    c.fillText("Cube Size: " + css, CSsettingTextPx, CSsettingTextPy);
    c.closePath();

}

function renderCubeSizeSettingButton() {

    c.beginPath();
    c.lineWidth = settingsFontSize/6;
    c.strokeStyle = "#0c0c0c";
    c.fillStyle = SMWC;
    roundRect(CSSBpX, CSSBpY, 2*settingsFontSize, settingsFontSize, XBS/8, true, true);
    c.moveTo(CSSBpX+settingsFontSize, CSSBpY);
    c.lineTo(CSSBpX+settingsFontSize, CSSBpY+settingsFontSize);
    c.stroke();

    c.fillStyle = "#000000";
    c.fillText("-  +", 7.82*settingsFontSize+TBO+MEW, CSsettingTextPy);
    c.closePath();

}

function renderCubeMapToggle() {

    c.beginPath();
    c.font = settingsFontSize.toString()+"px "+ settingsFont;
    c.fillStyle = "#000000";
    c.fillText("Cube Map: ", CMTBtextX, CMTBtextY);
    c.lineWidth=8;
    c.arc(CMTBpX, CMTBpY, TBr, 0, 2*pi);
    c.stroke();
    if (cubeMapEnabled) c.fillStyle = buttonColor0;
    else c.fillStyle = SMWC;
    c.fill();
    c.closePath();

}

function renderSoundToggle() {

    c.beginPath();
    c.font = settingsFontSize.toString()+"px "+ settingsFont;
    c.fillStyle = "#000000";
    c.fillText("Sound: ", STBtextX, STBtextY);
    c.lineWidth=8;
    c.arc(STBpX, STBpY, TBr, 0, 2*pi);
    c.stroke();
    if (soundEnabled) c.fillStyle = buttonColor0;
    else c.fillStyle = SMWC;
    c.fill();
    c.closePath();

}

function closeMenu() {

    closing=true;
    reRenderObjects();
    closing=false;

}

//Settings Menu ^

//Functions ^^^

