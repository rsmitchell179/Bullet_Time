class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Variables and settings 
        this.MAX_VELOCITY = 700;
        this.physics.world.gravity.y = 2000;

        this.bulletSpeed = -450;

        // set bg color
        this.cameras.main.setBackgroundColor("#CCC");
        
        // create ground tiles
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'sidewalk').setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        //temp sprite to see gameplay until we get the atlas to work
        //this.player = this.physics.add.sprite(centerX, centerY, 'player');
        this.player = this.physics.add.sprite(centerX/3, centerY, 'player_atlas', 'Run1');
        this.player.body.setSize(44, 100);
        this.player.setCollideWorldBounds(true);
        this.player.destroyed = false;

        this.bulletGroup = this.add.group({
            runChildUpdate: true
        });
        this.addBullet();

        // this.bullet = this.physics.add.sprite(game.config.width, bulletMaxHeight, 'bullet');
        // this.bullet.body.immovable = true;
        // this.bullet.body.setAllowGravity(false).setVelocityX(-250);

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

        // add physics collider
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.bullet);
    }

    addBullet() {
        let bullet = new Bullet(this, this.bulletSpeed);
        this.bulletGroup.add(bullet);
    }

    update() {
        //this is a broken animation for now. DO NOT UNCOMMENT UNTIL FIXED
        //this.player.anims.play('Run', true);
        if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.setVelocityY(-this.MAX_VELOCITY);
        }

        //temp bullet wrap
        //this.physics.world.wrap(this.bullet, this.bullet.width/2);
    }

}