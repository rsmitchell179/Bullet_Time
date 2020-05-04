// Collaborator Names:
// Binaisha Dastoor
// Joshua Jung 
// Ryan Mitchell
// Game Title: Bullet Time 
// Date Completed 5/3/20
// Creative tilt justifications: We are proud of how we implemented the powerup logics. We used a combination of collisions, booleans
//                               and variables to implement them. For example the invincibility detects if they have the the powerup
//                               then destroys any bullets that they run into while also tracking how long they have left with that powerup
//                               (Josh: "This took me so long to realize I could use overlap instead of collision, which kept pushing the player"). 
//                               We also implemented a bitmapFont to our menu which is something technically new and not shown by Nathan.
//                               We are also proud of our art assets. All of the sprites were made by the team. Ryan is proud of how the
//                               player sprite turned out (Ryan: "I suck at art but it turned out great :)") and Naisha is proud of how the 
//                               background looks. 

let config = {
    type: Phaser.AUTO,
    width: 840,
    height: 525,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Menu, Credits, Play],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            },
        },
    },
};

// Define Game 
let game = new Phaser.Game(config);

// Define Variables
let cursors;
const SCALE = 0.5;
const tileSize = 88;
let bulletMinHeight = 431;
let bulletMaxHeight = 325;
let centerX = game.config.width/2;
let centerY = game.config.height/2; 
let textSpace = 64;
let keyS;
let keyF;
let keyM;
let keyC;
let keyUP;
let player = null;
let level;
let highScore;
let newHighScore = false;
