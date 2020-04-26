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
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
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
let centerX = game.config.width/2;
let centerY = game.config.height/2; 
let textSpace = 64;
let keyLEFT;
