
 //criar elemento que irá rodar o jogo
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
var scoreds = document.getElementById('score');
let box = 32;
// velocidade em que a cobrinha anda
let speed = 250;
//criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
let snake = [];

snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function creatBackground(){
    context.fillStyle = "darkgray";
    //desenha o retângulo usando x e y e a largura e altura setadas
    context.fillRect(0, 0, 16 * box, 16 * box); 
}

function creatSnake (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function scored() {
    scoreds.innerHTML = (snake.length);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame(){    

    if (snake[0].x > 15 * box && direction == 'right' ||
        snake[0].x > 15 * box && direction == 'up' || 
        snake[0].x > 15 * box && direction == 'down') {

        snake[0].x = 0;
    }  

    if (snake[0].x < 0 && direction == 'left' || 
        snake[0].x < 0 && direction == 'up' || 
        snake[0].x < 0  && direction == 'down' ) {

        snake[0].x = 15 * box;
    }

    if (snake[0].y > 15 * box && direction == 'down' ||
        snake[0].y > 15 * box && direction == 'right' ||
        snake[0].y > 15 * box && direction == 'left') {

        snake[0].y = 0;
    }

    if (snake[0].y < 0 && direction == 'up' ||
        snake[0].y < 0 && direction == 'right' ||
        snake[0].y < 0 && direction == 'left') {

        snake[0].y = 15 * box
    }

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Fim do Jogo! Você obteve ' + (snake.length) + ' pontos! Até a próxima!');
            document.location.reload();
        }
    }

    creatBackground();
    creatSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        scored();
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }
    //método unshift adiciona como primeiro quadradinho da cobrinha
    snake.unshift(newHead); 
}

let jogo = setInterval(startGame, speed);
