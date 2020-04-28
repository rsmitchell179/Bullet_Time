class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //this.load.spritesheet('player','./assets/sprites/player.png', {frameWidth: 51, frameHeight:50, statFrame: 0, endFrame: 9});
    }

    create() {
        // Variables and settings 
        this.MAX_VELOCITY = 300;
        this.physics.world.gravity.y = 1000;

        //temp sprite to see gameplay until we get the atlas to work
        //this.player = this.physics.add.sprite(centerX, centerY, 'player');
        this.player = this.physics.add.sprite(centerX, centerY, 'player_atlas', 'Run1').setScale(SCALE);
        this.player.setCollideWorldBounds(true);

        // this.anims.create({
        //     key: 'run',
        //     frames: this.anims.generateFrameNumbers('player', {start: 0, end: 9, first: 0}),
        //     frameRate: 30,
        // });

        this.anims.create({ 
            key: 'Run', 
            frames: this.anims.generateFrameNames('player_atlas', {      
                prefix: 'Run',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 30,
            repeat: -1 
        });
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        //this is a broken animation for now. DO NOT UNCOMMENT UNTIL FIXED
        //this.player.anims.play('Run', true);
        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.setVelocityY(-this.MAX_VELOCITY);
        }
    }

}