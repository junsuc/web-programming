var ctx = myCanvas.getContext("2d");

var character_x = 0;
var character_y = 0;
var characterImg = new Image();
characterImg.src = "./images/character.png";

var mob1_x = 0; var mob1_y = 0;
var mob2_x = 0; var mob2_y = 0;
var mob3_x = 0; var mob3_y = 0;
var mob4_x = 0; var mob4_y = 0;
var mob5_x = 0; var mob5_y = 0;
var mob1Img = new Image();
mob1Img.src = "./images/moblv1.png";
var mob2Img = new Image();
mob2Img.src = "./images/moblv1.png";
var mob3Img = new Image();
mob3Img.src = "./images/moblv1.png";
var mob4Img = new Image();
mob4Img.src = "./images/moblv1.png";
var mob5Img = new Image();
mob5Img.src = "./images/moblv1.png";
var mobspeed = 8;

var missile_x = 0;
var missile_y = 0;
var missileImg = new Image();
missileImg.src = "./images/missilelv1.png";
var missilespeed = 50;

function First_Frame() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    character_x = myCanvas.width / 2 - characterImg.width / 2;
    character_y = myCanvas.height - characterImg.height * 2;
    ctx.drawImage(characterImg, character_x, character_y);

    for (var i = 1; i < 6; i++) {
        mob_First_y_pos(i);
    }
    ctx.drawImage(mob1Img, mob1_x, mob1_y);
    ctx.drawImage(mob2Img, mob2_x, mob2_y);
    ctx.drawImage(mob3Img, mob3_x, mob3_y);
    ctx.drawImage(mob4Img, mob4_x, mob4_y);
    ctx.drawImage(mob5Img, mob5_x, mob5_y);

    missile_x = character_x + characterImg.width / 2 - missileImg.width / 2;
    missile_y = character_y - missileImg.height;
    ctx.drawImage(missileImg, missile_x, missile_y);
}
First_Frame();

function Do_a_Frame() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.drawImage(characterImg, character_x, character_y);
    
    for (var i = 1; i < 6; i++) {
        mobMove(i);
    }
    ctx.drawImage(mob1Img, mob1_x, mob1_y);
    ctx.drawImage(mob2Img, mob2_x, mob2_y);
    ctx.drawImage(mob3Img, mob3_x, mob3_y);
    ctx.drawImage(mob4Img, mob4_x, mob4_y);
    ctx.drawImage(mob5Img, mob5_x, mob5_y);
    
    missileMove();
    reMissile();
    ctx.drawImage(missileImg, missile_x, missile_y);
}

function mouseMoveHandler (e) {
    character_x =  e.clientX - characterImg.width / 2;
    character_y = e.clientY - characterImg.height / 2;

    if (character_x < 10) {
        character_x = 10;
    }
    if (character_x + characterImg.width > myCanvas.width - 10) {
        character_x = myCanvas.width - characterImg.width - 10;
    }
    if (character_y < 100) {
        character_y = 100;
    }
    if (character_y + characterImg.height > myCanvas.height) {
        character_y = myCanvas.height - characterImg.height - 10;
    }
}

function mob_First_y_pos (mob_number) {
    switch (mob_number) {
        case 1: 
            mob1_y = - mob1Img.height * 2;
            break;
        case 2: 
            mob2_y = - mob1Img.height * 2;
            break;
        case 3: 
            mob3_y = - mob1Img.height * 2;
            break;
        case 4:
            mob4_y = - mob1Img.height * 2;
            break;
        case 5:
            mob5_y = - mob1Img.height * 2;
            break;
    }    
}

function mobMove (mob_number) {
    switch (mob_number) {
        case 1: 
            mob1_x = 10;
            mob1_y += mobspeed;
            if (mob1_y > myCanvas.height) {
                mob1_y = - mob1Img.height * 2;
            }
            break;
        case 2: 
            mob2_x = 90;
            mob2_y += mobspeed;
            if (mob2_y > myCanvas.height) {
                mob2_y = - mob2Img.height * 2;
            }
            break;
        case 3: 
            mob3_x = 170;
            mob3_y += mobspeed;
            if (mob3_y > myCanvas.height) {
                mob3_y = - mob3Img.height * 2;
            }
            break;
        case 4:
            mob4_x = 250;
            mob4_y += mobspeed;
            if (mob4_y > myCanvas.height) {
                mob4_y = - mob4Img.height * 2;
            }
            break;
        case 5:
            mob5_x = 330;
            mob5_y += mobspeed;
            if (mob5_y > myCanvas.height) {
                mob5_y = - mob5Img.height * 2;
            }
            break;
    }    
}

function missileMove () {
    missile_y -= missilespeed;
}

function reMissile() {
    if (missile_y < 0) {
        missile_x = character_x + characterImg.width / 2 - missileImg.width / 2;
        missile_y = character_y - missileImg.height;
    }
}

document.addEventListener("mousemove", mouseMoveHandler);

setInterval (Do_a_Frame, 25);