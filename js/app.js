//MOTION AND GAMEPLAY //

let backgroundColor = 'rgb(232, 240, 255)';
let snake;
let weapon = {};
let foods = [];
let enemies = [];
let enemies_count = 75;
let center_x;
let center_y;
let target;
let backdrop;
let hud;





//sounds
let laser_sound;
let sizzle_sound;
let short_sizzle_sound;
let ouch_sound;
let crunch_sound;


function getDirections() {

    if (frameCount < 10) { //start moving left
        return [10, 0];
    }

    let dir_x = map(center_x - mouseX, center_x - 0, center_x - width, 15, -15);
    let dir_y = map(center_y - mouseY, center_y - 0, center_y - height, 15, -15);
    return [dir_x, dir_y];
}




function preload() {

    laser_sound = loadSound('sounds/laser-shot-silenced.mp3');
    laser_sound.setVolume(0.8);
    sizzle_sound = loadSound('sounds/sizzle.wav');
    sizzle_sound.setVolume(0.8);
    short_sizzle_sound = loadSound('sounds/short-sizzle.wav');
    short_sizzle_sound.setVolume(0.8);
    ouch_sound = loadSound('sounds/ouch.wav');
    crunch_sound = loadSound('sounds/crunch.wav');
    crunch_sound.setVolume(0.7);

    laser_sound.is_playing = false;
    sizzle_sound.is_playing = false;
    short_sizzle_sound.is_playing = false;
    ouch_sound.is_playing = false;
    crunch_sound.is_playing = false;

}


function startNewGame() {

    foods = [];
    enemies = [];
    snake = null;
    backdrop = new Backdrop();

    background(backgroundColor);
    center_x = width / 2;
    center_y = height / 2;

    //Score display
    hud = new HUD({
        highscore: hud ? Math.max(hud.score, hud.highscore) : null
    });

    //make snake
    snake = new Snake();

    //make food
    for (let i = 0; i < 200; i++) {
        foods.push(new Food({
            d: Math.floor(random(10, 30))
        }));
    }
    for (let i = 0; i < 50; i++) {
        foods.push(new Food({
            d: Math.floor(random(40, 80))
        }));
    }

    //make enemies
    for (let i = 0; i < enemies_count; i++) {
        enemies.push(new SnakeEnemy({
            x: random(-backdrop.max_width + 500, backdrop.max_width - 500),
            y: random(-backdrop.max_width + 500, backdrop.max_width - 500),
            //  x: 500,
            // y: 500,
            tail_length: Math.floor(random(4, 60)),
            fill: helpers.getRandomColor(), //"rgb(99, 0, 0)",
            stroke: "rgba(217, 0, 32, 0.5)",
            enemy_index: i
        }));
    }


    canvas.mousePressed(snake.shoot);

}


function gameOver() {
    ouch_sound.play();
    startNewGame();
}


function setup() {

    console.log("new");
    canvas = createCanvas(1420, 800);
    frameRate(30);

    target = new Target();

    startNewGame();

}

function draw() {
    // draw() loops forever, until stopped
    background(backgroundColor);

    snake.dir_x = getDirections()[0];
    snake.dir_y = getDirections()[1];

    backdrop.draw(snake.dir_x, snake.dir_y);


    foods = foods.filter(food => !food.is_eaten);

    foods.forEach((food) => {
        food.draw(snake.dir_x, snake.dir_y);
        if (food.eatenBy(snake.head)) {

            snake.grow(food);
            food.is_eaten = true;
        }
    });


    snake.draw(snake.dir_x, snake.dir_y);


    enemies = enemies.filter(enemy => !enemy.is_dead);

    enemies.forEach(enemy => {
        enemy.draw();
    });

    snake.checkForCollision(enemies);

    if (weapon.is_firing) {
        weapon.draw();
    }

    target.draw();

     //show scores
     hud.draw();

}

    
function keyPressed() {
    if (keyCode === 32) { //spacebar
        snake.shoot();
    }
}