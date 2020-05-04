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
        this.load.image('building', 'building.png');
        this.load.image('sunglasses', 'sunglasses.png');
        this.load.image('binarynumbers', 'binaryNumbers.png');
        this.load.image('stopwatch', 'stopWatch.png');
        this.load.image('sunglassesIcon', 'sunglassesicon.png');
        this.load.image('stopwatchIcon', 'stopWatchIcon.png');
        //<div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        this.load.image('up_Key', 'arrow-up.png');
        // Load Audio
        this.load.path = "./assets/audio/";
        this.load.audio('bullet_sound', 'Bullet_Shot.wav');
        this.load.audio('jump_sound', 'Jump.wav');
        this.load.audio('menu_select_sound', 'Menu_Select.wav');
        this.load.audio('powerup_sound', 'Powerup.wav');
        this.load.audio('background_music', 'backgroundMusic.wav');
        this.load.audio('menu_music', 'menuMusic.wav');
        this.load.audio('deathsound', 'Die_Sound.mp3');
        // Load font 
        this.load.path = "./assets/font/";
        this.load.bitmapFont('myFont', 'font.png', 'font.fnt');
    }

    create() {
        this.add.bitmapText(centerX - 170, centerY - 80, 'myFont', 'Loading', 100);
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