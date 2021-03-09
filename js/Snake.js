/* Snake classes and functions */


//maker functions
function getTail(o) {

    let tail = [];

    for (let i = 1; i <= o.tail_length; i++) {
        tail.push(new Tailbit({
            x: o.x - (i * 10),
            y: o.y,
            d: 37,
            fill: o.fill,
            stroke: o.stroke
        }));
    }

    return tail;
}


//SNAKE COMPONENTS //
class Head {
    constructor(o = {}) {

        this.x = o.x || center_x;
        this.y = o.y || center_y;
        this.mod_x = 0;
        this.mod_y = 0;
        this.real_x = this.x + this.mod_x;
        this.real_y = this.y + this.mod_y;
        this.d = o.d || 40;
        this.r = this.d / 2;
        this.fill = o.fill || 'rgb(44,82,54)';
        this.stroke = o.stroke || 'rgba(63, 99, 72, 0.5)';
        this.strokeWeight = o.strokeWeight || 2;
        this.is_hurt = false;


    }

    draw(dir_mod_x = 0, dir_mod_y = 0) {
        // console.log("new", dir_mod_x);

        this.mod_x += dir_mod_x;
        this.mod_y += dir_mod_y;

        this.real_x = this.x + this.mod_x;
        this.real_y = this.y + this.mod_y;


        fill(this.is_hurt ? "rgb(255, 0, 38)" : this.fill);
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);

        if (helpers.isOnScreen(this.real_x, this.real_y, this.d)) {
            circle(this.real_x, this.real_y, this.d);
        }
    }

    getsHurt(parent) {
        this.is_hurt = true;

        helpers.playSound(short_sizzle_sound);


        if (this.constructor.name === "Head") {
            parent.hp-=10;
        } else {
            parent.hp--;
        }

        if (parent.hp < 1) {
            parent.die();
        }
    }

}





class Tailbit extends Head {

    constructor(o = {}) {
        o.fill = o.fill || helpers.getRandomColor();
        super(o);

    }

    updateLocation(dir_x, dir_y, o = {}) {

        if (o.is_reversed) {
            this.x -= dir_x;
            this.y -= dir_y;
        } else {
            this.x += dir_x;
            this.y += dir_y;
        }
    
    }

    

}





class Eyes extends Head {

    constructor(o = {}) {
        super(o);
        this.d = 15;
        this.pupil_color = "rgb(0,0,0)";
        this.mod_x = 0;
        this.mod_y = 0;
        this.real_x = this.x + this.mod_x;
        this.real_y = this.y + this.mod_y;

        this.left_eye = {
            x: this.x - 4,
            y: this.y - 15
        }

        this.right_eye = {
            x: this.x + 10,
            y: this.y - 15
        }

    }

    draw(dir_x = 0, dir_y = 0, dir_mod_x = 0, dir_mod_y = 0) {

        this.mod_x += dir_mod_x;
        this.mod_y += dir_mod_y;

        this.real_x = this.x + this.mod_x;
        this.real_y = this.y + this.mod_y;

        this.left_eye = {
            x: this.real_x - 4,
            y: this.real_y - 15
        }

        this.right_eye = {
            x: this.real_x + 10,
            y: this.real_y - 15
        }



        fill("rgb(255, 87, 160)");
        circle(this.left_eye.x, this.left_eye.y, this.d);
        circle(this.right_eye.x, this.right_eye.y, this.d);

        //pupils
        fill(this.pupil_color);
        let eye_dir_x = map(dir_x, -20, 20, -6, 6);
        let eye_dir_y = map(dir_y, -20, 20, -6, 6);

        circle(this.left_eye.x - eye_dir_x, this.left_eye.y - eye_dir_y, 6);
        circle(this.right_eye.x - eye_dir_x, this.right_eye.y - eye_dir_y, 6);
    }


}


class Snake {
    constructor(o = {}) {
        this.head = o.head = o.head || new Head(o);
        this.eyes = o.eyes = o.eyes || new Eyes(o);
        this.x = o.x = o.x || center_x;
        this.y = o.y = o.y || center_y;
        this.dir_x = o.dir_x || 0;
        this.dir_y = o.dir_y || 0;
        this.tail_length = o.tail_length = o.tail_length || 4;
        this.tail = getTail(o);
        this.food_eaten = 0;
        this.hp = this.tail_length;
        this.is_dead = false;
        this.is_hurt = true;

    }


    shift() {

        this.tail[0].x = this.head.x;
        this.tail[0].y = this.head.y;

        var end_tail = this.tail.shift();
        this.tail.push(end_tail);
    }

    grow(food) {
        this.food_eaten += food.r;
        hud.score+=Math.ceil(food.r);
        
        if (this.food_eaten > 200) {
            this.hp+=1
            this.tail.unshift(new Tailbit());
            this.food_eaten = this.food_eaten - 200;
        }

    }

    draw(dir_x, dir_y) {

        this.dir_x = dir_x;
        this.dir_y = dir_y;

        this.shift();

        this.tail.forEach(function (tailbit) {
            tailbit.updateLocation(dir_x, dir_y);
            tailbit.draw();
        });

        this.head.draw();
        this.eyes.draw(this.dir_x, this.dir_y);

    }

    shoot(x, y) {

        weapon = new Laser({
            target_x: mouseX,
            target_y: mouseY
        });

        laser_sound.play();
        weapon.draw();

    }

    checkForCollision(){

        let snake = this;

        enemies.forEach(enemy =>{
            if (helpers.isOnScreen(enemy.head.real_x, enemy.head.real_y, enemy.head.d)) {

                if(dist(snake.head.real_x, snake.head.real_y, enemy.head.real_x, enemy.head.real_y) < enemy.head.r){
                   snake.head.is_hurt ? gameOver() :  snake.head.getsHurt(snake);
                }

                enemy.tail.forEach(tailbit =>{
                    if(dist(snake.head.real_x, snake.head.real_y, tailbit.real_x, tailbit.real_y) < tailbit.r){
                        snake.head.is_hurt ? gameOver() : snake.head.getsHurt(snake);
                    }
                });

            }
        });
    }

    die() {
        this.is_dead = true;
        hud.score+=this.tail.length * 2;

        helpers.playSound(sizzle_sound);

        this.tail.forEach(tailbit => {
            foods.push(new Food({
                x: tailbit.real_x,
                y: tailbit.real_y,
                d: random(10, 30)
            }))
        });

        enemies.push(new SnakeEnemy({
            x: random(-backdrop.max_width + 500, backdrop.max_width - 500),
            y: random(-backdrop.max_width + 500, backdrop.max_width - 500),
            tail_length: Math.floor(random(50, 90)),
            fill: helpers.getRandomColor(), //"rgb(99, 0, 0)",
        }));
    }

}