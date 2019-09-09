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
var foodX = Math.floor(Math.random() * 480);
var foodY = Math.floor(Math.random() * 480);
var tail = [[posX, posY]]; //cargar kbeza

var key = {
    enter: 13,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    p: 80
}

function move()
{
    for(let i = 1; i < tail.length; i++) {
        tail[i][0] = tail[i-1][0];
        tail[i][1] = tail[i-1][1];
    }
    
    tail[0][0] += xdir; //asignar direccion en x
    tail[0][1] += ydir; //asignar direccion en y
    tail[0][0] = tail[0][0] % 480; //control de limites
    tail[0][1] = tail[0][1] % 480; //control de limites
    if(tail[0][0] < 0) tail[0][0] = 480; //control de limites
    if(tail[0][1] < 0) tail[0][1] = 480; //control de limites   
}

function direct(event)
{
    switch(event.keyCode) {
        case key.left:
            xdir = -23;
            ydir = 0;
        break;
        case key.up:
            xdir = 0;
            ydir = -23;
        break;
        case key.right:
            xdir = 23;
            ydir = 0;
        break;
        case key.down:
            xdir = 0;
            ydir = 23;
        break;
        case key.enter:
            puntos++;
            eat();
        break;
        case key.p:
            pauseGame();
            break;
    }
}

function drawFood(x, y)
{
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, sqH, sqW);
}

function drawRect()
{
    ctx.fillStyle = "#FF0000";
    for(let i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i][0], tail[i][1], sqH, sqW);
    }
}

function eat()
{
    tail.push([posX,posY]);
}

function info()
{
    ctx.fillStyle = "black";
    ctx.font = "20px Consolas";
    ctx.fillText(`Score: ${puntos}`, 385, 470);
    ctx.fillText(`Press 'p' to pause.`, 10, 470);
}

function pauseGame()
{
    /*if (!enabled) {
          var game = clearTimeout(game);
          enabled = true;
    } else if (enabled) {
          var game = setTimeout(loop, );
          enabled = false;
    }*/
}

function loop()
{
    console.log(`snak47: X = ${tail[0][0]} Y = ${tail[0][1]}`);
    console.log(`comida: X = ${foodX} Y = ${foodY}`);
    console.log(puntos, tail);
    console.log(aux);
    ctx.clearRect(0,0,480,480);
    drawFood(foodX,foodY,sqH,sqW);
    drawRect();
    move();
    setTimeout (
        function() { 
            window.requestAnimationFrame(loop);
        }, 85
    );
    info();
}

window.requestAnimationFrame(loop);
