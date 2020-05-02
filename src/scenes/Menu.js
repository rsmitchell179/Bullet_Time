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
            strokeThickness: 5,
            align: 'middle',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }
        // Add Matrix Runner Title to top of menu 
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0,0);
        this.add.text(centerX, centerY - textSpace*3.4, 'Matrix Runner', menuConfig).setOrigin(SCALE);
        menuConfig.fontSize = '43px';
        menuConfig.strokeThickness = 2;
        this.add.text(centerX, centerY - textSpace, 'Press left key to start runnin\'', menuConfig).setOrigin(SCALE);
        keyS =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //this.add.text(centerX, centerY)
    }

    update() {
        this.menuBackground.tilePositionY -= 5;
        this.menuBackground.tilePositionX += .2;
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('menu_select_sound');
            this.scene.start('playScene');
        }
    }

}