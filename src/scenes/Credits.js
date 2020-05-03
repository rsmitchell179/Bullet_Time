class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene');
    }
    
    create() {
        this.add.bitmapText(centerX - 215, centerY - 255, 'myFont', 'Credit Time', 100, 2);
        this.add.bitmapText(centerX - 120, centerY - 150, 'myFont', 'Team Members', 42);
        this.add.bitmapText(centerX - 200, centerY - 100, 'myFont', 'Binaisha Dastoor - Art Design', 35);
        this.add.bitmapText(centerX - 225, centerY - 55, 'myFont', 'Joshua Jung - Logic Programmer', 35);
        this.add.bitmapText(centerX - 270, centerY - 10, 'myFont', 'Ryan Mitchell - Programmer, Art Design', 35);
        this.add.bitmapText(centerX - 150, centerY + 35, 'myFont', 'Additional Sources', 42);
        this.add.bitmapText(centerX - 150, centerY + 80, 'myFont', 'Coding - Nathax Altice', 35);
        this.add.bitmapText(centerX - 370, centerY + 120, 'myFont', 'Music - LittleRobotSoundFactory from freesound.org', 35);
        this.add.bitmapText(centerX - 360, centerY + 160, 'myFont', 'Bullet Sound - Anuj-shreshtha1 from freesound.org', 35);
        this.add.bitmapText(centerX - 380, centerY + 200, 'myFont', 'Font Guy - http://bit.ly/WatchDogsFont by David Libeau ', 35);
        this.add.bitmapText(5, 5, 'myFont', 'M - To Menu', 25);
        keyM =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('menu_select_sound');
            this.scene.start('menuScene');
        }
    }
}