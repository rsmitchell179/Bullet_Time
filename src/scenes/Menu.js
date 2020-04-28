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