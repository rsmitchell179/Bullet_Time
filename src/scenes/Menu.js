class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create() {
        // Add background to menu
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0,0);
        // Add Matrix Runner Title to top of menu 
        // Font Credit: http://bit.ly/WatchDogsFont by David Libeau
        this.add.bitmapText(centerX - 215, centerY - 255, 'myFont', 'Bullet Time', 100, 2);
        let underline = this.add.rectangle(centerX, centerY - 167, 580, 5, 0xFFFFFF);
        underline.setStrokeStyle(2.5, 0x000000, 1);

        this.add.bitmapText(centerX - 300, centerY - 140, 'myFont', 'S - Start Game', 42);

        this.add.bitmapText(centerX + 100, centerY - 140, 'myFont', 'C - Credits', 42);

        this.add.bitmapText(centerX - 120, centerY - 80, 'myFont', 'Instructions', 42);

        let underline2 = this.add.rectangle(centerX, centerY -35, 580, 5, 0xFFFFFF);
        underline2.setStrokeStyle(2.5, 0x000000, 1);


        let whiteBox = this.add.rectangle(centerX - 265, centerY, 34, 34, 0xFFFFFF);
        whiteBox.setStrokeStyle(2.5, 0x000000, 1);

        let arrowSprite = this.add.sprite(centerX - 265, centerY, 'up_Key');
        this.add.bitmapText(centerX - 245, centerY -20, 'myFont', '- To Jump', 42);

        this.add.bitmapText(centerX + 100, centerY -20, 'myFont', '- Kill you', 42);
        this.add.sprite(centerX + 70, centerY + 3, 'bulletIcon');

        this.add.bitmapText(centerX - 100, centerY + 40, 'myFont', 'Powerups', 42);

        let underline3 = this.add.rectangle(centerX, centerY + 165, 630, 150, 0x606060);
        underline3.setStrokeStyle(2.5, 0x000000, 1);

        this.add.bitmapText(centerX - 200, centerY + 100, 'myFont', '- gives you double jump for 20 seconds', 25);
        this.sunGlassesIcon = this.add.sprite(centerX - 238, centerY + 115, 'sunglassesIcon');
        this.sunGlassesIcon.tint = 0x000000;
        this.add.bitmapText(centerX - 200, centerY + 150, 'myFont', '- gives you invincibility for 10 seconds', 25);
        this.binaryNumbersIcon = this.add.sprite(centerX - 238, centerY + 157, 'binarynumbers');

        this.add.bitmapText(centerX - 200, centerY + 200, 'myFont', '- slows time for 10 seconds', 25);
        this.stopWatchIcon = this.add.sprite(centerX - 230, centerY + 210, 'stopwatchIcon');
        
        keyS =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyC =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        this.menuBackground.tilePositionY -= 5;
        this.menuBackground.tilePositionX += .2;
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.sound.play('menu_select_sound');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.sound.play('menu_select_sound');
            this.scene.start('creditsScene')
        }
    }

}