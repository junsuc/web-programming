var canvas;
var canvas = [];
var ctx;
var W = 400, H = 600;
var width = 15, height = 20;
var BLOCK_W = W / width, BLOCK_H = H / height;
var interval;
var intervalRender;
var current; 
var currentX, currentY;
var freezed; 
var over;
var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];
var colors = [
    '#F3E2AC', '#EDAB89', '#FFCDC6', '#F97E91', '#B3629C', '#B3629C', '#B34C61'
];

function newBlock() {
    var id = Math.floor( Math.random() * shapes.length );
    var shape = shapes[ id ]; 

    current = [];
    for ( var y = 0; y < 4; ++y ) {
        current[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            var i = 4 * y + x;
            if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
                current[ y ][ x ] = id + 1;
            }
            else {
                current[ y ][ x ] = 0;
            }
        }
    }
    
    freezed = false;
    currentX = 4;
    currentY = 0;
}
// 보드 초기화
function init() {
    for ( var y = 0; y < height; ++y ) {
        canvas[ y ] = [];
        for ( var x = 0; x < width; ++x ) {
            canvas[ y ][ x ] = 0;
        }
    }
}

function tick() {
    if ( valid( 0, 1 ) ) {
        ++currentY;
    }
  
    else {
        freeze();
        valid(0, 1);
        clearLines();
        if (over) {
            clearAllIntervals();
            return false;
        }
        newBlock();
    }
}

function freeze() {
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                canvas[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }
    freezed = true;
}


function rotate( current ) {
    var newCurrent = [];
    for ( var y = 0; y < 4; ++y ) {
        newCurrent[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
        }
    }

    return newCurrent;
}


function clearLines() {
    for ( var y = height - 1; y >= 0; --y ) {
        var rowFilled = true;
        for ( var x = 0; x < width; ++x ) {
            if ( canvas[ y ][ x ] == 0 ) {
                rowFilled = false;
                break;
            }
        }
        if ( rowFilled ) {
            
            for ( var yy = y; yy > 0; --yy ) {
                for ( var x = 0; x < width; ++x ) {
                    canvas[ yy ][ x ] = canvas[ yy - 1 ][ x ];
                }
            }
            ++y;
        }
    }
}

function keyPress( key ) {
    switch ( key ) {
        case 'left':
            if ( valid( -1 ) ) {
                --currentX;
            }
            break;
        case 'right':
            if ( valid( 1 ) ) {
                ++currentX;
            }
            break;
        case 'down':
            if ( valid( 0, 1 ) ) {
                ++currentY;
            }
            break;
        case 'rotate':
            var rotated = rotate( current );
            if ( valid( 0, 0, rotated ) ) {
                current = rotated;
            }
            break;
       
    }
}


function valid( offsetX, offsetY, newCurrent ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;

    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( newCurrent[ y ][ x ] ) {
                if ( typeof canvas[ y + offsetY ] == 'undefined'
                  || typeof canvas[ y + offsetY ][ x + offsetX ] == 'undefined'
                  || canvas[ y + offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || y + offsetY >= height
                  || x + offsetX >= width ) {
                    if (offsetY == 1 && freezed) {
                        over = true; 
                        document.getElementById('playbutton').disabled = false;
                    } 
                    return false;
                }
            }
        }
    }
    return true;
}



function startGame() {
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
    newGame();
    document.getElementById("playbutton").disabled = true;
}

function newGame() {
    clearAllIntervals();
    intervalRender = setInterval( render, 35 );
    init();
    newBlock();
    over = false;
    interval = setInterval( tick, 400 );
}

function clearAllIntervals(){
    clearInterval( interval );
    clearInterval( intervalRender );
}

document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        render();
    }
};


function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

function render() {
    ctx.clearRect( 0, 0, W, H );

    ctx.strokeStyle = 'black';
    for ( var x = 0; x < width; ++x ) {
        for ( var y = 0; y < height; ++y ) {
            if ( canvas[ y ][ x ] ) {
                ctx.fillStyle = colors[ canvas[ y ][ x ] - 1 ];
                drawBlock( x, y );
            }
        }
    }

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                drawBlock( currentX + x, currentY + y );
            }
        }
    }
}

const btn = document.getElementById('playbutton');

playbutton.addEventListener('click', () => {
  playbutton.style.visibility = 'hidden';
});