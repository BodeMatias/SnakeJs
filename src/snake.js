var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.addEventListener('keydown', direct);

var enabled = true;
var posX = canvas.width / 2;
var posY = canvas.height / 2;
var xdir = 0;
var ydir = 0;
var sqH = 20;
var sqW = 20;
var puntos = 0;
var aux = 0;
var prev_move = 0;
var foodX = Math.floor(Math.random() * (460 - 20) + 20);
var foodY = Math.floor(Math.random() * (460 - 20) + 20);
var tail = [
    {x: posX, y: posY}
]
    
; //cargar kbeza

var key = {
    enter: 13,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    p: 80
}

function move(){
    var head = {
        x: tail[0].x + xdir,
        y: tail[0].y + ydir
    };
    head.x = head.x % 480;
    head.y = head.y % 480;
    if(head.x < 0) head.x = 480; 
    if(head.y < 0) head.y = 480; 
    tail.unshift(head);
    tail.pop();
}

function direct(event){
    switch(event.keyCode) {
        case key.left:
            if(prev_move != key.right){
                xdir = -23;
                ydir = 0;
                prev_move = key.left;
            }
        break;
        case key.up:
            if(prev_move != key.down){
                xdir = 0;
                ydir = -23;
                prev_move = key.up;
            }
        break;
        case key.right:
            if(prev_move != key.left){
                xdir = 23;
                ydir = 0;
                prev_move = key.right;
            }
        break;
        case key.down:
            if(prev_move != key.up){
                xdir = 0;
                ydir = 23;
                prev_move = key.down;
            }
        break;
        case key.p:
            pauseGame();
            break;
    }
}

function drawFood(x, y){
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, sqH, sqW);
}

function drawRect(){
    ctx.fillStyle = "#FF0000";
    for(let i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x, tail[i].y, sqH, sqW);
    }
}

function eat(){
    var x_point = Math.abs(tail[0].x - foodX);
    var y_point = Math.abs(tail[0].y - foodY);

    if(Math.hypot(x_point, y_point) < sqW){
        puntos++;
        tail.push([tail[puntos-1].x, tail[puntos-1].y]);
        foodX = Math.floor(Math.random() * (460 - 20) + 20);
        foodY = Math.floor(Math.random() * (460 - 20) + 20);
    }
    
}

function info(){
    ctx.fillStyle = "black";
    ctx.font = "20px Consolas";
    ctx.fillText(`Score: ${puntos}`, 370, 470);
    ctx.fillText(`Press 'p' to pause.`, 10, 470);
}

function pauseGame(){
    /*if (!enabled) {
          var game = clearTimeout(game);
          enabled = true;
    } else if (enabled) {
          var game = setTimeout(loop, );
          enabled = false;
    }*/
}

function loop(){
    console.log(`snake: X = ${tail[0].x} Y = ${tail[0].y}`);
    console.log(`comida: X = ${foodX} Y = ${foodY}`);
    console.log(prev_move);
    ctx.clearRect(0,0,480,480);
    drawFood(foodX,foodY,sqH,sqW);
    drawRect();
    eat();
    move();
    setTimeout (
        function() { 
            window.requestAnimationFrame(loop);
        }, 85
    );
    info();
}

window.requestAnimationFrame(loop);
