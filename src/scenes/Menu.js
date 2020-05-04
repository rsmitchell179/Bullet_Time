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

        // Container 
        this.containerRight = this.add.container(0, 0);
        this.containerLeft = this.add.container(0, 0);
        this.containerDown = this.add.container(0, 0);
        // Add Matrix Runner Title to top of menu 
        // Font Credit: http://bit.ly/WatchDogsFont by David Libeau
        // Move left during transition
        this.menuText = this.add.bitmapText(centerX - 215, centerY - 255, 'myFont', 'Bullet Time', 100, 2);
        this.containerLeft.add(this.menuText);
        this.underline = this.add.rectangle(centerX, centerY - 167, 580, 5, 0xFFFFFF);
        this.underline.setStrokeStyle(2.5, 0x000000, 1);
        this.containerLeft.add(this.underline);
        this.menuText2 = this.add.bitmapText(centerX - 285, centerY - 140, 'myFont', 'S - Start Game', 32);
        this.containerLeft.add(this.menuText2);
        this.menuText3 = this.add.bitmapText(centerX + 100, centerY - 140, 'myFont', 'C - Credits', 32);
        this.containerLeft.add(this.menuText3);
        
        // Move this right during transition
        this.menuText4 = this.add.bitmapText(centerX - 120, centerY - 80, 'myFont', 'Instructions', 42);
        this.containerRight.add(this.menuText4);
        this.underline2 = this.add.rectangle(centerX, centerY -35, 580, 5, 0xFFFFFF);
        this.underline2.setStrokeStyle(2.5, 0x000000, 1);
        this.containerRight.add(this.underline2);

        // Up icon
        this.whiteBox = this.add.rectangle(centerX - 265, centerY -2 , 34, 34, 0xFFFFFF);
        this.whiteBox.setStrokeStyle(2.5, 0x000000, 1);
        this.containerRight.add(this.whiteBox);
        this.arrowSprite = this.add.sprite(centerX - 265, centerY -2 , 'up_Key');
        this.containerRight.add(this.arrowSprite);

        this.menuText5 = this.add.bitmapText(centerX - 243, centerY -20, 'myFont', '- Hold for jump', 32);
        this.containerRight.add(this.menuText5);
        this.menuText6 = this.add.bitmapText(centerX + 125, centerY -20, 'myFont', '- Kill you', 32);
        this.containerRight.add(this.menuText6);
        this.bulletIcon = this.add.sprite(centerX + 95, centerY - 1, 'bulletIcon');
        this.containerRight.add(this.bulletIcon);

        // Move this downward during transition
        this.menuText7 = this.add.bitmapText(centerX - 100, centerY + 40, 'myFont', 'Powerups', 42);
        this.containerDown.add(this.menuText7);
        this.underline3 = this.add.rectangle(centerX, centerY + 165, 630, 150, 0x606060);
        this.underline3.setStrokeStyle(2.5, 0x000000, 1);
        this.containerDown.add(this.underline3);

        this.menuText8 = this.add.bitmapText(centerX - 200, centerY + 100, 'myFont', '- gives you double jump for 20 seconds', 25);
        this.containerDown.add(this.menuText8);

        this.sunGlassesIcon = this.add.sprite(centerX - 238, centerY + 115, 'sunglassesIcon');
        this.sunGlassesIcon.tint = 0x000000;
        this.containerDown.add(this.sunGlassesIcon);

        this.menuText9 = this.add.bitmapText(centerX - 200, centerY + 150, 'myFont', '- gives you invincibility for 10 seconds', 25);
        this.containerDown.add(this.menuText9);
        this.binaryNumbersIcon = this.add.sprite(centerX - 238, centerY + 157, 'binarynumbers');
        this.containerDown.add(this.binaryNumbersIcon);

        this.menuText10 = this.add.bitmapText(centerX - 200, centerY + 200, 'myFont', '- slows time for 10 seconds', 25);
        this.containerDown.add(this.menuText10);
        this.stopWatchIcon = this.add.sprite(centerX - 230, centerY + 210, 'stopwatchIcon');
        this.containerDown.add(this.stopWatchIcon);
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
            // Move left
            this.moveLeft();

            // Move right
            this.moveRight();

            // Move downward
            this.moveDown();

            this.clock = this.time.delayedCall(1000, () => { 
                this.scene.start('playScene');
            }, null, this);
            
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)) {
            this.fadeMusic();
            this.sound.play('menu_select_sound');
            // Move left
            this.moveLeft();
            // Move right
            this.moveRight()

            // Move downward
            this.moveDown();
            
            this.clock = this.time.delayedCall(1000, () => { 
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

    moveLeft() {
        this.tweens.add({
            targets: this.containerLeft,
            x: -750,
            duration: 1000,
        });
    }

    moveRight() {
        this.tweens.add({
            targets: this.containerRight,
            x: +750,
            duration: 1000,
        });
    }

    moveDown() {
        this.tweens.add({
            targets: this.containerDown,
            y: +750,
            duration: 1000,
        });
    }

}