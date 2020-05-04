class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    create() {
        // Variables and settings 
        this.MAX_VELOCITY = 760;
        this.physics.world.gravity.y = 2000;
        this.bulletSpeed = -570;
        this.buildingSpeed = -455;
        level = 0;
        this.jumperTime = 0;
        //Variable Values for powerups
        this.doubleJump = false;
        this.jumpTime = 10;
        this.invincible = false;
        this.invincibleTime = 10;
        this.timeSlow = false;
        this.slowTime = 10;
        this.jumps = 0;

        // set background
        this.starsandsun = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starsandsun').setOrigin(0);
        this.farbuildings = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'farbuildings').setOrigin(0);
        this.closebuildings = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'closebuildings').setOrigin(0);
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0);
        //create background music
        this.backgroundMusic = this.sound.add('background_music',{
            mute: false,
            volume: 0.4,
            rate: 1,
            loop: true 
        });
        this.backgroundMusic.play();
        //create player
        this.player = this.physics.add.sprite(centerX/3, centerY - 80, 'player_atlas', 'Run1');
        this.player.body.setSize(44, 95);
        this.player.body.setFriction(0);
        //this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(true);
        this.player.destroyed = false;

        //initial platform spawn
        this.building = this.physics.add.sprite(centerX, game.config.height - 80, 'building');
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

        // Add BinaryNumbers group
        this.binaryNumbersGroup = this.add.group({
            runChildUpdate: true
        });

        // Add StopWatch Group
        this.stopWatchGroup = this.add.group({
            runChildUpdate: true
        });

        // Run Animation
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

        // Run animation with slowMo activated 
        this.anims.create({ 
            key: 'SlowRun', 
            frames: this.anims.generateFrameNames('player_atlas', {      
                prefix: 'Run',
                start: 1,
                end: 10,
                suffix: '', 
            }), 
            frameRate: 4,
            repeat: -1 
        });

        // Jump animation
        this.anims.create({ 
            key: 'Jump', 
            frames: this.anims.generateFrameNames('player_atlas', {      
                prefix: 'Jump',
                start: 1,
                end: 5,
                suffix: '', 
                
            }), 
            frameRate: 5,
            repeat: 0,
        });

        // Jump animation with slowMo activated 
        this.anims.create({ 
            key: 'SlowJump', 
            frames: this.anims.generateFrameNames('player_atlas', {      
                prefix: 'Jump',
                start: 1,
                end: 5,
                suffix: '', 
                
            }), 
            frameRate: 2,
            repeat: 0,
        });

        // set up key input
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

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
        // Timer and Powerup UI
        this.timeText = this.add.text(game.config.width - 134, 11, `Time: ${level}`, { fontFamily: 'Helvetica', fontSize: '30px', color: '#008F11' , stroke: '#000000', strokeThickness: 3});
        this.PowerUpText = this.add.text(5, 11, `Powerups:`, { fontFamily: 'Helvetica', fontSize: '30px', color: '#008F11' , stroke: '#000000', strokeThickness: 3});
        this.sunGlassesIcon = this.add.sprite(centerX - 238, 31, 'sunglassesIcon');
        this.sunGlassesIcon.tint = 0x000000;
        this.glassesTime = this.add.text(centerX - 243, 55, '', { fontFamily: 'Helvetica', fontSize: '20px', color: '#008F11' , stroke: '#000000', strokeThickness: 3}); 
        this.binaryNumbersIcon = this.add.sprite(centerX - 175, 32, 'binarynumbers');
        this.binaryNumbersIcon.tint = 0x000000;
        this.binaryTime = this.add.text(centerX - 185, 55, '', { fontFamily: 'Helvetica', fontSize: '20px', color: '#008F11' , stroke: '#000000', strokeThickness: 3});
        this.stopWatchIcon = this.add.sprite(centerX - 120, 32, 'stopwatchIcon');
        this.stopWatchIcon.tint = 0x000000;
        this.stopWatchTime = this.add.text(centerX - 133, 55, '', { fontFamily: 'Helvetica', fontSize: '20px', color: '#008F11' , stroke: '#000000', strokeThickness: 3});
    }

    // Creates bullets in the bullet group
    addBullet() {
        let bullet = new Bullet(this, this.bulletSpeed);
        this.sound.play('bullet_sound');
        this.bulletGroup.add(bullet);
    }

    // Creates buildings in the building group
    addBuilding() {
        let building = new Building(this, this.buildingSpeed);
        this.buildingGroup.add(building);
    }

    // Creates sunglasses in the sunglasses group
    addSunGlasses() {
        let sunGlasses = new SunGlasses(this, this.buildingSpeed);
        this.sunGlassesGroup.add(sunGlasses);
    }
    
    // Creates binayNumbers in the binaryNumbers group
    addBinaryNumbers() {
        let binaryNumbers = new BinaryNumbers(this, this.buildingSpeed);
        this.binaryNumbersGroup.add(binaryNumbers);
    }

    // Creates stopWatch in the stopWatch group
    addStopWatch() {
        let stopWatch = new StopWatch(this, this.buildingSpeed);
        this.stopWatchGroup.add(stopWatch);
    }

    update() {
        // Scrolling Background
        this.farbuildings.tilePositionX += .4;
        this.closebuildings.tilePositionX += .7;
        this.clouds.tilePositionX += .4;
        // Check if player does not exist
        if(!this.player.destroyed) {
            
            // Check if player is on building play run/slowMo run animation
            if(this.player.body.touching.down && this.timeSlow) {
                this.player.anims.play('SlowRun', true);
            } else if (this.player.body.touching.down) {
                this.player.anims.play('Run', true);
            }
            
            // Jump animation
            if(!this.player.body.touching.down && this.timeSlow) {
                this.player.anims.play('SlowJump', true);
            } else if (!this.player.body.touching.down){
                this.player.anims.play('Jump', true);
            }

            // Jump logic
            // Variable Jump
            if(keyUP.isDown && !this.timeSlow){
                if(this.player.body.touching.down && this.jumperTime == 0) {
                    this.jumperTime = 1;
                    this.player.body.velocity.y = -400 + (this.jumperTime * 5);
                    this.sound.play("jump_sound", { volume: 0.1 });
                } else if (this.jumperTime > 0 && this.jumperTime < 31) {
                    this.jumperTime++;
                    this.player.body.velocity.y = -400 + (this.jumperTime * 5);
                }
            } else if (!keyUP.isDown) {
                this.jumperTime = 0;
            }
            
            if(keyUP.isDown && this.timeSlow){
                if(this.player.body.touching.down && this.jumperTime == 0) {
                    this.jumperTime = 1;
                    this.player.body.velocity.y = -550 + (this.jumperTime * 5);
                    this.sound.play("jump_sound", { volume: 0.1 });
                } else if (this.jumperTime > 0 && this.jumperTime < 31) {
                    this.jumperTime++;
                    console.log(this.jumperTime);
                    this.player.body.velocity.y = -550 + (this.jumperTime * 5);
                }
            } else if (!keyUP.isDown) {
                this.jumperTime = 0;
                
            }
            
            // Double jump logic, allows for a second jump if boolean value is true
            if(this.doubleJump && this.jumps < 1 && Phaser.Input.Keyboard.JustDown(cursors.up) ) {
                this.player.setVelocityY(-this.MAX_VELOCITY);
                this.player.anims.play('SlowJump', true);
                this.sound.play("jump_sound", { volume: 0.1 });
                this.jumps++;
                //console.log(this.jumps);
            } 
            // Failed variable doublejump logic
            // if(keyUP.isDown && this.doubleJump) { 
            //     console.log(this.jumperTime);
            //     if(this.jumps < 1 && this.jumperTime == 0) {
            //         this.jumperTime = 1;
            //         this.player.body.velocity.y = -400 + (this.jumperTime * 5);
            //         this.sound.play("jump_sound", { volume: 0.1 });
            //     } else if (this.jumperTime > 0 && this.jumperTime < 31) {
            //         this.jumperTime++;
            //         this.jumps++;
            //         this.player.body.velocity.y = -400 + (this.jumperTime * 5);
            //     }
            // } else if (!keyUP.isDown && this.doubleJump) {
            //     this.jumperTime = 0;    
            // }

            // Reset Jumps
            if(this.jumps == 1 && this.player.body.touching.down) {
                this.jumps = 0;
                //console.log(this.jumps);
            }
            
            // Collision logics
            // Checks building collisions
            if(this.player.body.touching.right){
                if(this.physics.collide(this.player, this.buildingGroup)) {
                    this.buildingCollision();
                }
            }

            if(this.player.x == game.config.height) {   
                this.buildingCollision();
            }
            // Thanks to Grenager on https://www.html5gamedevs.com/topic/41338-prevent-pushing-other-object/ for the collision sollution 
            // because we were using collide instead and it messed it up *hairpull*
            // Checks bullet collisons
            if(this.physics.overlap(this.player, this.bulletGroup)) {
                //Checks for invincibility
                if(this.invincible){
                    this.bullet = this.bulletGroup.getFirst(true);
                    this.bullet.destroy();
                    this.addBullet();
                }
                else{
                    this.bulletCollision();
                }
            }

            // -------- POWERUP CHECKER --------------
            // The doubleJump checker
            if(this.physics.overlap(this.player, this.sunGlassesGroup)) {
                this.sound.play("powerup_sound", { volume: 0.1 });
                this.doubleJump = true;
                this.jumpTime = 20;
                this.glassesTime.setText(this.jumpTime);
                this.sunGlasses = this.sunGlassesGroup.getFirst(true);
                this.sunGlassesIcon.clearTint();
                this.sunGlasses.destroy();
            }

            // The invincible checker
            if(this.physics.overlap(this.player, this.binaryNumbersGroup)) {
                this.sound.play("powerup_sound", { volume: 0.1 });
                this.invincible = true;
                this.invincibleTime = 10;
                this.binaryTime.setText(this.invincibleTime);
                this.binaryNumbersIcon.clearTint();
                this.binaryNumbers = this.binaryNumbersGroup.getFirst(true);
                this.binaryNumbers.destroy(); 
                //console.log(this.invincible);
            }
            
            // The SloMo checker
            if(this.physics.overlap(this.player, this.stopWatchGroup)) {
                this.sound.play("powerup_sound", { volume: 0.1 });
                this.timeSlow = true;
                this.slowTime = 10;
                this.stopWatchTime.setText(this.slowTime);
                this.stopWatchIcon.clearTint();
                //console.log(this.timeSlow);
                this.stopWatch = this.stopWatchGroup.getFirst(true);
                this.stopWatch.destroy();
            }

            // SloMo logic
            //https://phaser.discourse.group/t/how-to-add-time-scale-that-affects-tweens-animations-and-so-on-solved/1357
            if(this.timeSlow) {
                this.bulletGroup.timeScale = 2;
                this.buildingGroup.timeScale = 2;
                this.sunGlassesGroup.timeScale = 2;
                this.binaryNumbersGroup.timeScale = 2;
                this.stopWatchGroup.timeScale = 2;
                this.backgroundMusic.setRate(0.5);
                this.physics.world.timeScale = 2; // physics
                this.time.timeScale = 0.5; // time events (they said to make it 2 to slow down but that was a lie)
            }
        } 
        else if (this.player.destroyed && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.level);
        } 
        else if(this.player.destroyed && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
    }

    // Nathans PaddleParkourP3 code as templete
    levelBump() {
        // increment level (aka score)
        level++;
        this.timeText.setText('Time: ' + level);
        if(level % 5 == 0) {
            // RANDOM numbers
            this.chanceToSpawnGlasses = Phaser.Math.Between(1, 3);
            this.chanceToSpawnBinaryNumbers = Phaser.Math.Between(1, 2);
            this.chanceToSpawnStopWatch = Phaser.Math.Between(1, 3);
            // console.log(this.chanceToSpawnGlasses);
            // console.log(this.chanceToSpawnBinaryNumbers);
            // console.log(this.chanceToSpawnStopWatch);
        }
        
        // -------TIME RELATED SPAWNING---------------
        //Spawns bullets after 9 seconds
        if(level == 9) {
            this.addBullet();
        }

        // Spawns Glasses after 12 seconds with a 1/3 chance to actually spawn
        if(level % 12 == 0 && this.chanceToSpawnGlasses) {
            //console.log(this.jumpTime);
            this.addSunGlasses();
        }
        
        // Spawns Binary Numbers after 29 seconds with a 1/2 chance to actually spawn
        if(level % 29 == 0 && this.chanceToSpawnBinaryNumbers == 2) {
            //console.log(this.invincibleTime);
            this.addBinaryNumbers();
        }
        
        // Spawns Stopwatch after 31 seconds with a 1/3 chance to actually spawn
        if(level % 31 == 0 && this.chanceToSpawnStopWatch == 3){
            this.addStopWatch();
        }

        // ------POWERUP TIME CHECK----------
        // Decreases time with the double jump power
        if(this.doubleJump && this.jumpTime >= 0){
            this.jumpTime--;
            this.glassesTime.setText(this.jumpTime);
        }
        
        // Resets to default when DoubleJump powerup stops 
        if(this.doubleJump && this.jumpTime == 0){
            this.doubleJump = false;
            this.sunGlassesIcon.tint = 0x000000;
            this.jumpTime = 20;
            this.glassesTime.setText('');
        }

        // Decreases time with Invincibility power
        if(this.invincible && this.invincibleTime >= 0)
        {
            this.invincibleTime--;
            this.binaryTime.setText(this.invincibleTime);
        }
        
        // Resets to default when Invincibility powerup stops
        if(this.invincible && this.invincibleTime == 0)
        {
            this.invincible = false;
            this.binaryNumbersIcon.tint = 0x000000;
            //console.log(this.invincible);
            this.invincibleTime = 10;
            this.binaryTime.setText('');
        }

        // Decreases time with the SloMo
        if(this.timeSlow && this.slowTime >= 0)
        {
            this.slowTime--;
            this.stopWatchTime.setText(this.slowTime);
        }

        // Resets to default when SloMo powerup stops
        if(this.timeSlow && this.slowTime == 0)
        {
            this.timeSlow = false;
            this.stopWatchIcon.tint = 0x000000;
            //console.log(this.timeSlow)
            this.bulletGroup.timeScale = 1;
                this.buildingGroup.timeScale = 1;
                this.sunGlassesGroup.timeScale = 1;
                this.binaryNumbersGroup.timeScale = 1;
                this.stopWatchGroup.timeScale = 1;
                this.backgroundMusic.setRate(1);
                this.physics.world.timeScale = 1; // physics
                this.time.timeScale = 1; // time events 
            this.slowTime = 10;
            this.stopWatchTime.setText('');
        }

    }

    // Collided with building and kills player
    buildingCollision(){
        this.sound.play("deathsound", { volume: 1});
        this.player.destroyed = true; 
        this.difficultyTimer.destroy();
        
        //console.log("You Fell");
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
    // Collided with bullet and kills player
    bulletCollision() {
        this.sound.play("deathsound", { volume: 1});
        this.player.destroyed = true; 
        this.difficultyTimer.destroy();
        //console.log("You got Shot");

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
        
        // Emit the particles on player coords on death
        this.particles.emitParticleAt(this.player.x, this.player.y, 300);
        this.player.destroy();
        this.GameOverMan();
    }

    // On death
    GameOverMan() {
        //fades out background music
        this.tweens.add({
            targets: this.backgroundMusic,
            volume: 0,
            ease: 'Linear',
            duration: 800,
        });
        this.bulletGroup.clear();
        this.buildingGroup.clear();
        this.sunGlassesGroup.clear();
        this.PowerUpText.destroy();
        this.binaryNumbersIcon.destroy();
        this.glassesTime.destroy();
        this.stopWatchIcon.destroy();
        this.stopWatchTime.destroy();
        this.sunGlassesIcon.destroy();
        this.binaryTime.destroy();
        this.timeText.destroy();

        // Convert score to seconds and minutes 
        let minutes = Math.floor(level/60);
        let seconds = Math.floor(level%60);
        
        // ------------- NATHAN'S HIGHSCORE LOGIC ------------------
        // check for high score in local storage
        // uncomment console.log statements if you need to debug local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            // console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(level > storedScore) {
                //console.log(`New high score: ${level}`);
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            //console.log('No high score stored. Creating new.');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        // Prints out New Hi-Score!! when you acheive a new high score
        if(newHighScore) {
            this.add.text(centerX, centerY + 10, `New Hi-Score!!` , { fontFamily: 'Helvetica', fontSize: '50px', color: '#008F11' , stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        }

        // Converts highScore to minutes and seconds
        let highMinutes = Math.floor(highScore/60);
        let highSeconds = Math.floor(highScore%60);
        
        // Displays current score and the browsers high score as well as menu options to quit or restart
        this.add.text(centerX, centerY - 160, `Whoa man you ran for: ${minutes}m and ${seconds}s` , { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' , stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5);
        this.add.text(centerX, centerY - 120, `Hi-Score: ${highMinutes}m and ${highSeconds}s`, { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' , stroke: '#000000', strokeThickness: 3}).setOrigin(0.5);
        this.clock = this.time.delayedCall(1000, () => { 
            this.add.text(centerX, centerY - 80, `Press F to pay respects and restart`, { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' , stroke: '#000000', strokeThickness: 3}).setOrigin(0.5);
            this.add.text(centerX, centerY - 40, `Press M to go back to main menu`, { fontFamily: 'Helvetica', fontSize: '34px', color: '#008F11' , stroke: '#000000', strokeThickness: 3}).setOrigin(0.5);
        }, null, this);
        
        
    }
}