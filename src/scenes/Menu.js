class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Load Player Atlas
        this.load.path = "./assets/sprites/";
        this.load.atlas('player_atlas', 'player.png', 'player.json');
        // Load Audio
        this.load.path = "./assets/audio/"
        this.load.audio('bullet_sound', 'Bullet_Shot.wav');
        this.load.audio('jump_sound', 'Jump.wav');
        this.load.audio('menu_select_sound', 'Menu_Select.wav');
        this.load.audio('powerup_sound', 'Powerup.wav');
        this.load.audio('score_sound', 'Scored.wav');
    }

    create() {
        //this.scene.start("playScene");
        // Menu display 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '82px',
            color: '#008F11',
            align: 'middle',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }
        // Add Matrix Runner Title to top of menu 
        this.add.text(centerX, centerY - textSpace*3, 'Matrix Runner', menuConfig).setOrigin(SCALE);
        
        
        keyLEFT =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('menu_select_sound');
            this.scene.start('playScene');
        }
    }

}