class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // Load Player Atlas
        this.load.path = "./assets/sprites/";
        this.load.atlas('player_atlas', 'player.png', 'player.json');
        this.load.image('menuBackground', 'matrix.jpg')
        this.load.image('bullet', 'bullet.png');
        this.load.image('building1', 'building.png');
        this.load.image('building2', 'building1.png');
        this.load.image('sunglasses', 'sunglasses.png');
        // Load Audio
        this.load.path = "./assets/audio/";
        this.load.audio('bullet_sound', 'Bullet_Shot.wav');
        this.load.audio('jump_sound', 'Jump.wav');
        this.load.audio('menu_select_sound', 'Menu_Select.wav');
        this.load.audio('powerup_sound', 'Powerup.wav');
        this.load.audio('score_sound', 'Scored.wav');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}