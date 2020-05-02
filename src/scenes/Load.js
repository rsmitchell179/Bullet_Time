class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // Load player atlas
        this.load.path = "./assets/sprites/";
        this.load.atlas('player_atlas', 'player.png', 'player.json');
        // Load other assets 
        this.load.image('menuBackground', 'menubackground.png');
        this.load.image('citybackground4', 'background4.png');
        this.load.image('starsandsun', 'sunandstars.png');
        this.load.image('closebuildings', 'darkGreyBuildings.png');
        this.load.image('farbuildings', 'lightGreyBuildings.png');
        this.load.image('clouds', 'clouds.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('bulletIcon', 'bulleticon.png');
        this.load.image('building1', 'building.png');
        this.load.image('building2', 'building1.png');
        this.load.image('sunglasses', 'sunglasses.png');
        this.load.image('binarynumbers', 'binaryNumbers.png');
        this.load.image('stopwatch', 'stopWatch.png');
        this.load.image('sunglassesIcon', 'sunglassesicon.png');
        this.load.image('stopwatchIcon', 'stopWatchIcon.png');
        // Load Audio
        this.load.path = "./assets/audio/";
        this.load.audio('bullet_sound', 'Bullet_Shot.wav');
        this.load.audio('jump_sound', 'Jump.wav');
        this.load.audio('menu_select_sound', 'Menu_Select.wav');
        this.load.audio('powerup_sound', 'Powerup.wav');
        // Load font 
        this.load.path = "./assets/font/";
        this.load.bitmapFont('myFont', 'font.png', 'font.fnt');
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