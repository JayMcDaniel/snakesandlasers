class HUD {
    constructor(o = {}) {

        this.score = 0;
        this.highscore = o.highscore || 0;
    }

    draw() {
        fill("rgb(44,82,54)");
        noStroke();
        textSize(32);
        text(`Score: ${this.score}`, 10, 30); 
        text(`High Score: ${this.highscore}`, 10, 70);  

    }
}