// Collaborator Names:
// Binaisha Dastoor
// Joshua Jung 
// Ryan Mitchell
// Game Title: Matrix Runner 
// Date Completed 5/3/20
// Creative tilt justifications: 

let config = {
    type: Phaser.AUTO,
    width: 840,
    height: 525,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
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
let keyLEFT;
let player = null;
let level;
let highscore;
let newHighScore = false;

