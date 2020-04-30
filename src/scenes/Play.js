class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Variables and settings 
        this.MAX_VELOCITY = 700;
        this.physics.world.gravity.y = 2000;
        this.bulletSpeed = -550;
        //this.bulletSpeedMax = -550;
        this.buildingSpeed = -455;
        //this.buildingSpeedMax = -500;
        level = 0;

        // set bg color
        this.cameras.main.setBackgroundColor("#CCC");

        //temp sprite to see gameplay until we get the atlas to work
        //this.player = this.physics.add.sprite(centerX, centerY, 'player');
        this.player = this.physics.add.sprite(centerX/3, centerY - 80, 'player_atlas', 'Run1');
        this.player.body.setSize(44, 95);
        this.player.body.setFriction(0);
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(true);
        this.player.destroyed = false;

        this.building = this.physics.add.sprite(centerX/5.5, game.config.height - 80, 'building2');
        this.building.scaleX = 2;
        this.building.body.immovable = true;
        this.building.body.setFriction(0);
        this.building.body.setAllowGravity(false);
        this.building.body.setVelocityX(-455);

        // Add bullet group
        this.bulletGroup = this.add.group({
            runChildUpdate: true
        });

        // Add building group
        this.buildingGroup = this.add.group({
            runChildUpdate: true
        });
        this.addBuilding();

        // Add SunglassesGroup group
        this.sunGlassesGroup = this.add.group({
            runChildUpdate: true
        });

        this.anims.create({ 
            key: 'Run', 
            frames: this.anims.generateFrameNames('player_atlas', {      
                prefix: 'Run',
                start: 1,
                end: 10,
                suffix: '', 
            }), 
            frameRate: 12,
            repeat: -1 
        });
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // add physics collider
        this.physics.add.collider(this.player, this.building);
        this.physics.add.collider(this.player, this.buildingGroup);

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });
    }
    //creates bullets in the bullet group
    addBullet() {
        let bullet = new Bullet(this, this.bulletSpeed);
        this.bulletGroup.add(bullet);
    }
    //creates buildings in the building group
    addBuilding() {
        let building = new Building(this, this.buildingSpeed);
        this.buildingGroup.add(building);
    }

    addSunGlasses() {
        let sunGlasses = new SunGlasses(this, this.buildingSpeed);
        this.sunGlassesGroup.add(sunGlasses);
    }

    update() {

        if(!this.player.destroyed) {
            this.player.anims.play('Run', true);
            if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
                this.player.setVelocityY(-this.MAX_VELOCITY);
                this.sound.play("jump_sound", { volume: 0.1 });
            } 
            if(this.player.body.touching.right){
                if(this.physics.collide(this.player, this.buildingGroup)) {
                    this.buildingCollision();
                }
            }
            if(this.physics.collide(this.player, this.bulletGroup)) {
                this.bulletCollision();
            }
            if(this.physics.overlap(this.player, this.sunGlassesGroup)) {

            }
        } else if (this.player.destroyed && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.level);
        } else if(this.player.destroyed && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
    }
    //Nathans PaddleParkourP3 code as templete
    levelBump() {
        // increment level (aka score)
        level++;

        if(level % 5 == 0) {
            // RANDOM numbers
            let chanceToSpawnGlasses = Phaser.Math.Between(1, 3);
            console.log(chanceToSpawnGlasses);
        }

        if(level == 15) {
            this.addBullet();
        }
        // if(level % 5 == 0 ) {
        //     console.log("here");
        //     this.addSunGlasses();
        // }
        // set EXTREME mode
        if(level == 75) {
            //paddle.scaleY = 0.5;
            this.extremeMODE = true;
        }
    }

    buildingCollision(){
        this.player.destroyed = true; 
        this.difficultyTimer.destroy();
        console.log("You Fell");
        // Death Particles and emiter
        this.particles = this.add.particles('The green box');
        this.emitter = this.particles.createEmitter({
            speed: 200,
            lifespan: 800,
            blendMode: 'Add',
            scale: {
                start: 1,
                end: 0,
            },
            on: false,
        });
        this.particles.emitParticleAt(this.player.x, this.player.y, 300);
        this.player.destroy();
        this.GameOverMan();
    }
    
    bulletCollision() {
        this.player.destroyed = true; 
        this.difficultyTimer.destroy();
        console.log("You got Shot");
        // Death Particles and emiter
        this.particles = this.add.particles('The green box');
        this.emitter = this.particles.createEmitter({
            speed: 200,
            lifespan: 800,
            blendMode: 'Add',
            scale: {
                start: 1,
                end: 0,
            },
            on: false,
        });
        this.particles.emitParticleAt(this.player.x, this.player.y, 300);
        this.player.destroy();
        this.GameOverMan();
    }

    GameOverMan() {
        this.bulletGroup.clear();
        this.buildingGroup.clear();
        this.sunGlassesGroup.clear();
        let minutes = Math.floor(level/60);
        let seconds = Math.floor(level%60);
        this.add.text(centerX, centerY - 200, `You avoided getting REKT for ${minutes}m and ${seconds}s` , { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' }).setOrigin(0.5);
        this.add.text(centerX, centerY - 160, `This browser's best: ${highScore}s`, { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' }).setOrigin(0.5);
        this.add.text(centerX, centerY - 120, `Press F to pay respects`, { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' }).setOrigin(0.5);
        this.add.text(centerX, centerY - 80, `Press M to go back to main menu`, { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' }).setOrigin(0.5);
    }
}