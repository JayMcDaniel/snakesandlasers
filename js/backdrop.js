//BACKDROP //


class Backdrop {

    constructor(){
        this.rel_x = 0,
        this.rel_y = 0,
        this.max_width = 4000,
        this.initialized = false,
        this.border_width = 40
    }


    draw(dir_x, dir_y) {

        if(this.initialized){
            this.rel_x += center_x;
            this.rel_y += center_y;
            this.initialized = true
        }

        this.rel_x += dir_x;
        this.rel_y += dir_y;


        //left boundry
        if (this.rel_x - snake.x + this.border_width - this.max_width > 0){
            this.rel_x = snake.x - this.border_width + this.max_width;
            snake.dir_x = 0;
        }
        //right
        if (this.rel_x - snake.x - this.border_width < -this.max_width){
            this.rel_x = -this.max_width + snake.x + this.border_width;
            snake.dir_x = 0;
        }
        //top
        if (this.rel_y - snake.y + this.border_width > this.max_width){
            this.rel_y = this.max_width + snake.y - this.border_width;
            snake.dir_y = 0;
        }

        //bottom
        if (this.rel_y - snake.y - this.border_width < -this.max_width){
            this.rel_y = -this.max_width + snake.y + this.border_width;
            snake.dir_y = 0;
        }



        for (let i = -this.max_width; i <= this.max_width; i += 100) {
            stroke('rgba(189, 211, 255, 0.7)');
            strokeWeight(this.border_width);

            line(this.rel_x + i, 0, this.rel_x + i, height);
            line(0, this.rel_y + i, width, this.rel_y + i);
        }

        //boundry
        rectMode(CENTER);
        stroke('rgb(0,0,0)');
        noFill();
        strokeWeight(40);
        rect(this.rel_x, this.rel_y, this.max_width * 2 , this.max_width *2);
        

    }

}



