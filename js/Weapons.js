//weapons classes and functions

class Weapon{

    constructor(o = {}) {

        this.origin_x = o.origin_x || snake.head.x;
        this.origin_y = o.origin_y || snake.head.y;
        this.target_x = o.target_x || width;
        this.target_y = o.target_y || 0;
        this.is_firing = false;

    }


}


class Laser extends Weapon{

    constructor(o = {}){
        super(o);
        this.stroke = o.stroke || 'rgb(179, 4, 4)';
        this.time_remaining = 10;
        this.is_firing = true;

        this.laser1 = {
            origin_x: snake.eyes.left_eye.x,
            origin_y: snake.eyes.left_eye.y
        }
        this.laser2 = {
            origin_x: snake.eyes.right_eye.x,
            origin_y: snake.eyes.right_eye.y
        }
        
    }



    checkForHits(enemies, laser){

        enemies.forEach( enemy =>{

            if (helpers.isOnScreen(enemy.head.real_x, enemy.head.real_y, enemy.head.d)) {
                if(dist(laser.target_x, laser.target_y, enemy.head.real_x, enemy.head.real_y) < enemy.head.r){
                    enemy.head.getsHurt(enemy);
                }

                enemy.tail.forEach(tailbit =>{
                    if(dist(laser.target_x, laser.target_y, tailbit.real_x, tailbit.real_y) < tailbit.r){
                        tailbit.getsHurt(enemy);
                    }
                });

            }

        })

    }


    draw(){

        snake.eyes.pupil_color = this.stroke;
      
        stroke(this.stroke);
        strokeWeight(2);

        line(this.laser1.origin_x, this.laser1.origin_y, this.target_x, this.target_y);
        line(this.laser2.origin_x, this.laser2.origin_y, this.target_x, this.target_y);
        
        this.checkForHits(enemies, this);

        this.time_remaining--;
        if(this.time_remaining === 0){
            this.is_firing = false;
            snake.eyes.pupil_color = "rgb(0,0,0)";
        }
    
    }
}


class Target {

    constructor(o = {}){

    }

    draw(){
     
        stroke("red");
        strokeWeight(2);
        noFill();
        circle(mouseX, mouseY, 2);
        circle(mouseX, mouseY, 20);
        line(mouseX - 20, mouseY, mouseX + 20, mouseY);
        line(mouseX, mouseY - 20, mouseX, mouseY + 20);

    }

}