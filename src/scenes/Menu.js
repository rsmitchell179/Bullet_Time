class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create() {
        this.menuMusic = this.sound.add('menu_music',{
            mute: false,
            volume: 0.4,
            loop: true 
        });
        // Add background to menu
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0,0);
        // Add Matrix Runner Title to top of menu 
        // Font Credit: http://bit.ly/WatchDogsFont by David Libeau
        this.menuText = this.add.bitmapText(centerX - 215, centerY - 255, 'myFont', 'Bullet Time', 100, 2);
        this.underline = this.add.rectangle(centerX, centerY - 167, 580, 5, 0xFFFFFF);
        this.underline.setStrokeStyle(2.5, 0x000000, 1);

        this.menuText2 = this.add.bitmapText(centerX - 300, centerY - 140, 'myFont', 'S - Start Game', 42);
        this.menuText3 = this.add.bitmapText(centerX + 100, centerY - 140, 'myFont', 'C - Credits', 42);
        
        this.menuText4 = this.add.bitmapText(centerX - 120, centerY - 80, 'myFont', 'Instructions', 42);
        this.underline2 = this.add.rectangle(centerX, centerY -35, 580, 5, 0xFFFFFF);
        this.underline2.setStrokeStyle(2.5, 0x000000, 1);

        // Up icon
        this.whiteBox = this.add.rectangle(centerX - 265, centerY, 34, 34, 0xFFFFFF);
        this.whiteBox.setStrokeStyle(2.5, 0x000000, 1);
        this.arrowSprite = this.add.sprite(centerX - 265, centerY, 'up_Key');

        this.menuText5 = this.add.bitmapText(centerX - 245, centerY -20, 'myFont', '- To Jump', 42);
        this.menuText6 = this.add.bitmapText(centerX + 100, centerY -20, 'myFont', '- Kill you', 42);
        this.bulletIcon = this.add.sprite(centerX + 70, centerY + 3, 'bulletIcon');
        this.menuText7 = this.add.bitmapText(centerX - 100, centerY + 40, 'myFont', 'Powerups', 42);
        this.underline3 = this.add.rectangle(centerX, centerY + 165, 630, 150, 0x606060);
        this.underline3.setStrokeStyle(2.5, 0x000000, 1);

        this.menuText8 = this.add.bitmapText(centerX - 200, centerY + 100, 'myFont', '- gives you double jump for 20 seconds', 25);

        this.sunGlassesIcon = this.add.sprite(centerX - 238, centerY + 115, 'sunglassesIcon');
        this.sunGlassesIcon.tint = 0x000000;

        this.menuText9 = this.add.bitmapText(centerX - 200, centerY + 150, 'myFont', '- gives you invincibility for 10 seconds', 25);
        this.binaryNumbersIcon = this.add.sprite(centerX - 238, centerY + 157, 'binarynumbers');

        this.menuText10 = this.add.bitmapText(centerX - 200, centerY + 200, 'myFont', '- slows time for 10 seconds', 25);
        this.stopWatchIcon = this.add.sprite(centerX - 230, centerY + 210, 'stopwatchIcon');
        this.menuMusic.play();
        keyS =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyC =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        this.menuBackground.tilePositionY -= 5;
        this.menuBackground.tilePositionX += .2;
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.fadeMusic();
            this.sound.play('menu_select_sound');
            this.underline.destroy();
            this.underline2.destroy();
            this.underline3.destroy();
            this.sunGlassesIcon.destroy();
            this.binaryNumbersIcon.destroy();
            this.arrowSprite.destroy();
            this.bulletIcon.destroy();
            this.stopWatchIcon.destroy();
            this.whiteBox.destroy();
            this.menuText.destroy();
            this.menuText2.destroy();
            this.menuText3.destroy();
            this.menuText4.destroy();
            this.menuText5.destroy();
            this.menuText6.destroy();
            this.menuText7.destroy();
            this.menuText8.destroy();
            this.menuText9.destroy();
            this.menuText10.destroy();
            this.clock = this.time.delayedCall(600, () => { 
                this.scene.start('playScene');
            }, null, this);
            
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.fadeMusic();
            this.underline.destroy();
            this.underline2.destroy();
            this.underline3.destroy();
            this.sunGlassesIcon.destroy();
            this.binaryNumbersIcon.destroy();
            this.arrowSprite.destroy();
            this.bulletIcon.destroy();
            this.stopWatchIcon.destroy();
            this.whiteBox.destroy();
            this.menuText.destroy();
            this.menuText2.destroy();
            this.menuText3.destroy();
            this.menuText4.destroy();
            this.menuText5.destroy();
            this.menuText6.destroy();
            this.menuText7.destroy();
            this.menuText8.destroy();
            this.menuText9.destroy();
            this.menuText10.destroy();
            this.sound.play('menu_select_sound');
            this.clock = this.time.delayedCall(600, () => { 
                this.scene.start('creditsScene');
            }, null, this);
        }
    }

    fadeMusic() {
        //fades out menu music
        this.tweens.add({
            targets: this.menuMusic,
            volume: 0,
            ease: 'Linear',
            duration: 500,
        }); 
    }

}