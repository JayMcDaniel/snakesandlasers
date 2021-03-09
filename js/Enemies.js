// ENEMIES //

class SnakeEnemy extends Snake {
    constructor(o = {}) {
        o.fill = o.fill || "rgb(99, 0, 0)";
        o.stroke = o.stroke || "rgba(201, 0, 0, 0.5)";
        super(o);
        this.x = o.x || random(-5000, 5000),
        this.y = o.y || random(-5000, 5000),
        this.tail_length = o.tail_length ||  Math.floor(random(4, 60)),
        this.fill = o.fill || helpers.getRandomColor(), //"rgb(99, 0, 0)",
        this.dir_x = -10; //negative is left
        this.dir_y = 0;
        this.attention_range = 300;
        this.chase_speed = 5;
        this.enemy_index = o.enemy_index || 0;

        this.head.updateLocation = this.eyes.updateLocation = function (self) {

            if (this.constructor.name === "Eyes") {

                this.x = self.head.x;
                this.y = self.head.y;

            } else {

                //bounce off boundries
                if (this.x - 300 < -backdrop.max_width || this.x + 300 > backdrop.max_width) {
                    self.dir_x = -self.dir_x;

                }
                if (this.y - 300 < -backdrop.max_width || this.y + 300 > backdrop.max_width) {
                    self.dir_y = -self.dir_y;
                }

                //head toward player if player is close
                if (dist(snake.x, snake.y, this.real_x, this.real_y) < self.attention_range) {

                    self.dir_y = snake.y - this.real_y <= 0 ? -self.chase_speed : self.chase_speed;
                    self.dir_x = snake.x - this.real_x <= 0 ? -self.chase_speed : self.chase_speed;

                    if(Math.abs(snake.y - this.real_y) < 20 && Math.abs(snake.x - this.real_x) > 20 ){
                        self.dir_y = 0;
                    }

                    if(Math.abs(snake.x - this.real_x) < 20 && Math.abs(snake.y - this.real_y) > 20 ){
                        self.dir_x = 0;
                    }
                   
                }

                this.x += self.dir_x;
                this.y += self.dir_y;

            }

        }
    }


    changeDirection() {
        this.dir_x = random(-6, 6);
        this.dir_y = random(-6, 6);
    }


    draw() {

        this.shift(); //move back tailbit to front


        // change directions
        if (frameCount % (30 + this.enemy_index) === 0) {
            this.changeDirection();
        }

        let enemy = this;
        this.tail.forEach(function (tailbit) {

            tailbit.updateLocation(enemy.dir_x, enemy.dir_y, {
                is_reversed: true
            });

            tailbit.draw(snake.dir_x, snake.dir_y);

        });

        this.head.updateLocation(this);
        this.eyes.updateLocation(this);

        this.head.draw(snake.dir_x, snake.dir_y);
        this.eyes.draw(this.dir_x, this.dir_y, snake.dir_x, snake.dir_y);


    }


}