// FOOD (powerups) classes and functions 

class Food {

    constructor(o = {}) {

        //     console.log("backdrop.rel_x", backdrop.rel_x);

        this.d = o.d || Math.floor(random(7, 80));
        this.r = this.d / 2;
        this.fill = o.fill || helpers.getRandomColor({
            alpha: true
        });

        let rand_x = Math.floor(random(-backdrop.max_width, backdrop.max_width));
        let rand_y = Math.floor(random(-backdrop.max_width, backdrop.max_width));
        this.x = o.x || rand_x + backdrop.rel_x + (rand_x < 0 ? this.d : -this.d);
        this.y = o.y || rand_y + backdrop.rel_y + (rand_y < 0 ? this.d : -this.d);
        this.is_eaten = false;


    }

    draw(dir_x, dir_y) {
        fill(this.fill);
        noStroke();
        this.updateLocation(dir_x, dir_y);

        if (helpers.isOnScreen(this.x, this.y, this.r) && !this.is_eaten) {
            circle(this.x, this.y, this.d);
        }
    }

    updateLocation(dir_x, dir_y) {
        this.x += dir_x;
        this.y += dir_y;

        if (this.x > 4000 || this.x < -4000) {
            this.x = Math.floor(random(-3000, 3000));
        }

        if (this.y > 4000 || this.y < -4000) {
            this.y = Math.floor(random(-3000, 3000));
        }

    }

    eatenBy(snake_head) {

        if (helpers.isOnScreen(this.x, this.y, this.r)) {
            if (Math.abs(snake_head.x - this.x) < this.r + snake_head.r && Math.abs(snake_head.y - this.y) < this.r + snake_head.r) {
                helpers.playSound(crunch_sound);
                return true;
            }
        }

    }

}