var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.addEventListener('keydown', direct);

var lost = false;
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
]; 

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
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, sqH, sqW);
}

function drawRect(){
    ctx.fillStyle = "green";
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

function selfCollision(){
    for(let i = 1; i < tail.length; i++) {
        if(tail[i].x == tail[0].x && tail[i].y == tail[0].y){
            lost = true;
        }
    }
}

function info(){
    ctx.fillStyle = "black";
    ctx.font = "20px Consolas";
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${puntos}`, 240, 470);
}

function reload(){
    window.location.reload(false);
}

function loop(){
    console.log(`snake: X = ${tail[0].x} Y = ${tail[0].y}`);
    console.log(`comida: X = ${foodX} Y = ${foodY}`);
    console.log(prev_move);
    if(xdir == 0 && ydir == 0){
        ctx.clearRect(0,0,480,480);
        ctx.fillStyle = "black";
        ctx.font = "50px Consolas";
        ctx.textAlign = 'center';
        ctx.fillText(`Move to start`, 240, 100);
    } else {
        ctx.clearRect(0,0,480,480);
    }
    drawFood(foodX,foodY,sqH,sqW);
    drawRect();
    eat();
    move();
    selfCollision();
    setTimeout (
        function() {
            if(!lost){
                window.requestAnimationFrame(loop);
            } else {
                ctx.clearRect(0, 0, canvas.height, canvas.width);
                ctx.fillStyle = "black";
                ctx.font = "50px Consolas";
                ctx.textAlign = 'center';
                ctx.fillText(`Game Over`, 240, 240);
                setTimeout(reload, 3000);
            }
        }, 85
    );
    info();
}

window.requestAnimationFrame(loop);
