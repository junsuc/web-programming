var ctx = myCanvas.getContext("2d");

var character_x = 0; var character_y = 0;
var characterImg = new Image();
characterImg.src = "./images/character.png";
var characterlive = true;

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
var mob1live = true; var mob2live = true; var mob3live = true; var mob4live = true; var mob5live = true;
var moblv = 1;
var mob1_lv = 1; var mob2_lv = 1; var mob3_lv = 1; var mob4_lv = 1; var mob5_lv = 1;
var mob1_life = mob1_lv; var mob2_life = mob2_lv; var mob3_life = mob3_lv; var mob4_life = mob4_lv; var mob5_life = mob5_lv;
var mobspeed = 8;

var missile_x = 0; var missile_y = 0;
var missileImg = new Image();
missileImg.src = "./images/missilelv1.png";
var missilelv = 1;
var missilespeed = 80;

var score = 0;

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

    mobLv();
    
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

    if (ImagesTouching (missile_x, missile_y, missileImg, mob1_x, mob1_y, mob1Img)) {
        mob1_life -= 1;
        if (mob1_life <= 0) {
            if (mob1live == true) {
                score += mob1_lv;
                missileImg.src = "./images/missiledie.png";
            }
            mob1live = false;
            mobDie(1);
        }
    }
    if (ImagesTouching (missile_x, missile_y, missileImg, mob2_x, mob2_y, mob2Img)) {
        mob2_life -= 1;
        if (mob2_life <= 0) {
            if (mob2live == true) {
                score += mob2_lv;
                missileImg.src = "./images/missiledie.png";
            }
            mob2live = false;
            mobDie(2);
        }
    }
    if (ImagesTouching (missile_x, missile_y, missileImg, mob3_x, mob3_y, mob3Img)) {
        mob3_life -= 1;
        if (mob3_life <= 0) {
            if (mob3live == true) {
                score += mob3_lv;
                missileImg.src = "./images/missiledie.png";
            }
            mob3live = false;
            mobDie(3);
        }
    }
    if (ImagesTouching (missile_x, missile_y, missileImg, mob4_x, mob4_y, mob4Img)) {
        mob4_life -= 1;
        if (mob4_life <= 0) {
            if (mob4live == true) {
                score += mob4_lv;
                missileImg.src = "./images/missiledie.png";
            }
            mob4live = false;
            mobDie(4);
        }
    }
    if (ImagesTouching (missile_x, missile_y, missileImg, mob5_x, mob5_y, mob5Img)) {
        mob5_life -= 1;
        if (mob5_life <= 0) {
            if (mob5live == true) {
                score += mob5_lv;
                missileImg.src = "./images/missiledie.png";
            }
            mob5live = false;
            mobDie(5);
        }
    }
    
    if (ImagesTouching (character_x, character_y, characterImg, mob1_x, mob1_y, mob1Img)) {
        if (mob1live == true) {
            characterDie();
        }        
    }
    if (ImagesTouching (character_x, character_y, characterImg, mob2_x, mob2_y, mob2Img)) {
        if (mob2live == true) {
            characterDie();
        }        
    }
    if (ImagesTouching (character_x, character_y, characterImg, mob3_x, mob3_y, mob3Img)) {
        if (mob3live == true) {
            characterDie();
        }        
    }
    if (ImagesTouching (character_x, character_y, characterImg, mob4_x, mob4_y, mob4Img)) {
        if (mob4live == true) {
            characterDie();
        }        
    }
    if (ImagesTouching (character_x, character_y, characterImg, mob5_x, mob5_y, mob5Img)) {
        if (mob5live == true) {
            characterDie();
        }        
    }

    ctx.drawImage(characterImg, character_x, character_y);

    if (characterlive == true) {
        ctx.fillSytle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 0, 20);
    } else {
        ctx.fillSytle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Your Score: " + score, myCanvas.width / 2, myCanvas.height / 2);
    }
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
                mob1_lv = set_mobLv();
                mob1_life = mob1_lv * 2 - 1;
                mob1Img.src = "./images/moblv"+mob1_lv+".png";
                mob1live = true;
                mob1_y = - mob1Img.height * 2;
            }
            break;
        case 2: 
            mob2_x = 90;
            mob2_y += mobspeed;
            if (mob2_y > myCanvas.height) {
                mob2_lv = set_mobLv();
                mob2_life = mob2_lv * 2 - 1;
                mob2Img.src = "./images/moblv"+mob2_lv+".png";
                mob2live = true;
                mob2_y = - mob2Img.height * 2;
            }
            break;
        case 3: 
            mob3_x = 170;
            mob3_y += mobspeed;
            if (mob3_y > myCanvas.height) {
                mob3_lv = set_mobLv();
                mob3_life = mob3_lv * 2 - 1;
                mob3Img.src = "./images/moblv"+mob3_lv+".png";
                mob3live = true;
                mob3_y = - mob3Img.height * 2;
            }
            break;
        case 4:
            mob4_x = 250;
            mob4_y += mobspeed;
            if (mob4_y > myCanvas.height) {
                mob4_lv = set_mobLv();
                mob4_life = mob4_lv * 2 - 1;
                mob4Img.src = "./images/moblv"+mob4_lv+".png";
                mob4live = true;
                mob4_y = - mob4Img.height * 2;
            }
            break;
        case 5:
            mob5_x = 330;
            mob5_y += mobspeed;
            if (mob5_y > myCanvas.height) {
                mob5_lv = set_mobLv();
                mob5_life = mob5_lv * 2 - 1;
                mob5Img.src = "./images/moblv"+mob5_lv+".png";
                mob5live = true;
                mob5_y = - mob5Img.height * 2;
            }
            break;
    }    
}

function mobDie (mob_number) {
    switch (mob_number) {
        case 1:
            mob1Img.src = "./images/mobdie.png";
            break;
        case 2:
            mob2Img.src = "./images/mobdie.png";
            break;
        case 3: 
            mob3Img.src = "./images/mobdie.png";
            break;
        case 4:
            mob4Img.src = "./images/mobdie.png";
            break;
        case 5:
            mob5Img.src = "./images/mobdie.png";
            break;
    }    
}

function missileMove () {
    missile_y -= missilespeed;
}

function reMissile() {
    if (missile_y < - (myCanvas.height - character_y)) {
        missileImg.src = "./images/missilelv1.png";
        missile_x = character_x + characterImg.width / 2 - missileImg.width / 2;
        missile_y = character_y - missileImg.height;
    }
}

function ImagesTouching (x1, y1, img1, x2, y2, img2) {
    if (x1 >= x2 + img2.width || x1 + img1.width <= x2)
        return false;
    if (y1 >= y2 + img2.height || y1 + img1.height <= y2)
        return false;
    return true;
}

function characterDie () {
    characterlive = false;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    missile_y = myCanvas.height;
    missilespeed = 0;
    mob1_y = - mob1Img.height * 2;
    mob2_y = - mob2Img.height * 2;
    mob3_y = - mob3Img.height * 2;
    mob4_y = - mob4Img.height * 2;
    mob5_y = - mob5Img.height * 2;
    mobspeed = 0;
}

function mobLv() {
    moblv = Math.floor(score / 50) + 1;
    if (moblv >= 10) {
        moblv = 10;
    }
}

function set_mobLv() {
    var i;
    i = Math.floor(Math.random()*((moblv) - (moblv - 1) + 1)) + (moblv - 1); // 생성범위: moblv - 1부터 moblv 까지. lv1인 경우 1부터 1까지
    
    if (i <= 1) {
        return 1;
    } else {
        return i;
    }
}

function missileLv() {
    missilelv = Math.floor(score / 100) + 1;
    if (missilelv >= 5) {
        missilelv = 5;
    }
}

document.addEventListener("mousemove", mouseMoveHandler);

setInterval (Do_a_Frame, 25);