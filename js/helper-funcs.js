//Helper functions //

let helpers = {

    getRandomColor: function (o = {}) {

        let r = Math.floor(random(255)); // r is a random number between 0 - 255
        let g = Math.floor(random(50, 200)); // g is a random number betwen 100 - 200
        let b = Math.floor(random(50, 200)); // b is a random number between 0 - 100
        let a = random(0.3, 0.7); // a is a random number between 200 - 255


        if (o.alpha === true) {
            return (`rgba(${r},${g},${b},${a})`);
        } else {
            return (`rgb(${r},${g},${b})`);
        }

    },


    isOnScreen: function (x, y, r = 0) {

        return ((x + r > 0 && x - r < width) && (y + r > 0 && y - r < height));
    },

    playSound: function(sound) {

        if (!sound.is_playing) {
            sound.is_playing = true;
            sound.play();
            setTimeout(function () {
                sound.is_playing = false;
            }, 300);

        }

    }

}