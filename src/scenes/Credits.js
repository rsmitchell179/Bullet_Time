class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene');
    }
    
    create() {
        this.menuMusic = this.sound.add('menu_music',{
            mute: false,
            volume: 0.4,
            loop: true 
        });
        this.count = 0;
        this.creditsText = this.add.bitmapText(centerX - 215, centerY - 255, 'myFont', 'Credit Time', 100, 2);
        this.creditunderline = this.add.rectangle(centerX, centerY -165, 580, 5, 0xFFFFFF);
        this.creditunderline.setStrokeStyle(2.5, 0x000000, 1);
        this.creditsText2 = this.add.bitmapText(centerX - 120, centerY - 150, 'myFont', 'Team Members', 42);
        this.creditsText3 = this.add.bitmapText(centerX - 200, centerY - 100, 'myFont', 'Binaisha Dastoor - Art Design', 35);
        this.creditsText4 = this.add.bitmapText(centerX - 225, centerY - 55, 'myFont', 'Joshua Jung - Logic Programmer', 35);
        this.creditsText5 = this.add.bitmapText(centerX - 270, centerY - 10, 'myFont', 'Ryan Mitchell - Programmer, Art Design', 35);
        this.creditsText6 = this.add.bitmapText(centerX - 150, centerY + 35, 'myFont', 'Additional Sources', 42);
        this.creditsText7 = this.add.bitmapText(centerX - 150, centerY + 80, 'myFont', 'Coding - Nathax Altice', 35);
        this.creditsText8 = this.add.bitmapText(centerX - 320, centerY + 120, 'myFont', 'Background Music - LittleRobotSoundFactory from freesound.org', 25);
        this.creditsText9 = this.add.bitmapText(centerX - 270, centerY + 150, 'myFont', 'Menu Music - orangefreesounds from freesound.org', 25);
        this.creditsText10 = this.add.bitmapText(centerX - 260, centerY + 180, 'myFont', 'Bullet Sound - Anuj-shreshtha1 from freesound.org', 25);
        this.creditsText11 = this.add.bitmapText(centerX - 277, centerY + 210, 'myFont', 'Font Guy - http://bit.ly/WatchDogsFont by David Libeau ', 25);
        this.creditsText12 = this.add.bitmapText(5, 5, 'myFont', 'M - To Menu', 25);
        this.menuMusic.play();
        keyM =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.fadeMusic();
            this.creditsText.destroy();
            this.creditunderline.destroy();
            this.creditsText2.destroy();
            this.creditsText3.destroy();
            this.creditsText4.destroy();
            this.creditsText5.destroy(); 
            this.creditsText6.destroy();
            this.creditsText7.destroy();
            this.creditsText8.destroy();
            this.creditsText9.destroy();
            this.creditsText10.destroy();
            this.creditsText11.destroy();
            this.creditsText12.destroy();
            this.sound.play('menu_select_sound');
            this.clock = this.time.delayedCall(600, () => { 
                this.scene.start('menuScene');
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
