// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
          // You should multiply any movement by the dt parameter
          // which will ensure the game runs at the same speed for
          // all computers.
        this.x += this.speed * dt;
        if (this.x > 510) {
            this.x = -50;
            this.speed = 100 + Math.floor(Math.random() * 190);
        }
        //check for collisions and reset player to default position.
        if (player.x < this.x + 80 && player.x + 80 > this.x &&
            player.y < this.y + 60 && player.y + 60 > this.y) {
            subtractScores();
            player.x = 202;
            player.y = 400;
        }
      
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// The player class
// This class has an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {}
    //draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //handling the keypresses such that the player does not go
    //off the screen
    handleInput(keyPress) {
        if (keyPress == "left" && this.x > 0) {
            this.x -= 102;
        }
        if (keyPress == "right" && this.x < 405) {
            this.x += 102;
        }
        if (keyPress == "up" && this.y > 0) {
            this.y -= 83;
        }
        if (keyPress == "down" && this.y < 405) {
            this.y += 43;
        }
        if (this.y < 0) {
            setTimeout(function () {
                player.x = 202;
                player.y = 400;
                updateScoresCrosses();
            }, 100);
        }
    }
}

let level = 1; // game level
let scores = 0; //variable to store the scores
let crosses = 0; // crosses made bt the player to reach the water
let divCrosses = document.getElementById("crosses");
let divScores = document.getElementById("scores");
let divLevel = document.getElementById("level");

divScores.innerHTML = `Scores : ${scores}`;
divCrosses.innerHTML = `Crosses : ${crosses}`;
divLevel.innerHTML = `Level : ${level}`;
// update the scores when the player reaches the waer.
// increment the scores
//call the function to change the level if criteria is met.
function updateScoresCrosses() {
    scores += 10;
    crosses += 1;
    divScores.innerHTML = `Scores : ${scores}`;
    divCrosses.innerHTML = `Crosses : ${crosses}`;
    changeLevel();
    divLevel.innerHTML = `Level : ${level}`;
}
//reduce the scores if they is a collision and update the scores.
function subtractScores() {
    if (scores >= 5) {
        scores -= 5;
    } else {
        scores = 0;
    }

    divScores.innerHTML = `Scores : ${scores}`;
}

//call this function to change the level to make it more challenging
function changeLevel() {
    if (scores >= 50 && level === 1) {
        level += 1;
        addMoreEnemies();
       // enemyLocation.push(150);
        //enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        //enemy = new Enemy(0, 150, 200);
       // allEnemies.push(enemy);

    } else if (scores >= 100 && level === 2){
        level += 1;
        addMoreEnemies(); 
    }
}
 //this function adds more enemies to the game. Keep on scoring
 //and the enemies increase
function addMoreEnemies(){
    let enemyPosition = Math.random() * 184 + 50;
    enemyLocation.push(enemyPosition);
    enemy = new Enemy(0, enemyPosition, Math.random() * 256);
    allEnemies.push(enemy);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyLocation = [63, 147, 230, 60];
enemyLocation.forEach(function (locationY) {
    let enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
})
let player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});