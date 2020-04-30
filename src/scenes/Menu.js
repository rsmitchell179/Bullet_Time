class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        //this.scene.start("playScene");
        // Menu display 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '82px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'middle',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }
        // Add Matrix Runner Title to top of menu 
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0,0);
        this.add.text(centerX, centerY - textSpace*3, 'Matrix Runner', menuConfig).setOrigin(SCALE);
        menuConfig.fontSize = '40px';
        menuConfig.strokeThickness = .7;
        this.add.text(centerX, centerY - textSpace, 'Press left key to start runnin\'', menuConfig).setOrigin(SCALE);
        keyLEFT =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        this.menuBackground.tilePositionY -= 5;
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('menu_select_sound');
            this.scene.start('playScene');
        }
    }

}